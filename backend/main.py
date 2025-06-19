import json

import os

from .classes.Compound import Compound

from .web_scraper import *

from .cache.cache_clear import cache_clear

from fastapi import FastAPI, HTTPException

from fastapi.middleware.cors import CORSMiddleware

base = os.path.dirname(os.path.abspath(__file__))
cache_file = os.path.join(base, "cache", "compound_cache.json")


app = FastAPI()
origins = ["http://localhost:5173", "https://www.spectrosim.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"Test": "Test"}


@app.get("/absorbsim-compound")
def get_compound(name: str = None):
    if not name:
        raise HTTPException(status_code=404, detail="Missing compound name.")

    # keys (compound names) forced to lower
    name = name.lower()

    try:
        with open(cache_file, "r") as file:
            content = json.load(file)
            if content["total_search_count"] >= 500:
                content = cache_clear(cache_file, name)
    except FileNotFoundError:
        content = {}

    # Search Cache for Compound name
    if name in content:
        found_compound_data = content.get(name)

        # update the total search count
        content["total_search_count"] = content.get("total_search_count", 0) + 1
        
        if not found_compound_data:
            with open(cache_file, "w") as file:
                json.dump(content, file, indent=2)
            raise HTTPException(status_code=404, detail=str(f"Error -> No UV/Vis data found for {name.title()}!"))
        # update the search count of compound
        found_compound_data["search_count"] = found_compound_data.get("search_count", 0) + 1


        with open(cache_file, "w") as file:
            json.dump(content, file, indent=2)
            
        return {found_compound_data["name"]: found_compound_data}
        
        
    # Search PubChem for Compound name
    try:
        # Web Scrape Functions
        compound_dict = get_cid(name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    compound_dict = get_data_via_cid(compound_dict)
    try:
        compound_dict = extract_abs_spectro(compound_dict)
    except (ValueError) as e:

        
        del compound_dict["compound_data_string"]
        del compound_dict["cid"]
        del compound_dict["description"]
        del compound_dict["desc_ref"]

        # update the total search count
        content["total_search_count"] = content.get("total_search_count", 0) + 1
        
        content[compound_dict["name"].lower()] = None
        
      

        with open(cache_file, "w") as file:
            json.dump(content, file, indent=2)

        raise HTTPException(status_code=404, detail=str(e))

    # create a Compound class to access methods

    compound = Compound(
        name=compound_dict["name"],
        absorb_spectro_data=compound_dict["absorb_spectro_data"],
        light_distance=1.0,
        sigma=1,
        concentration=1e-3,
    )

    # Add gaus dist. and abs value arrays for a compound.
    compound.gen_gaussian_distribution(compound.WAVE_LENGTHS)

    # overwrite the partial compound dict from webscrape with gaus. and abs. info.
    compound_dict |= compound.__dict__

    del compound_dict["sigma"]
    del compound_dict["concentration"]
    del compound_dict["light_distance"]
    del compound_dict["WAVE_LENGTHS"]

    # update the search count 
    compound_dict["search_count"] = compound_dict.get("search_count", 0) + 1

    # update the total search count
    content["total_search_count"] = content.get("total_search_count", 0) + 1


    content[compound_dict["name"].lower()] = compound_dict

    with open(cache_file, "w") as file:

        json.dump(content, file, indent=2)

    return {compound_dict["name"]: compound_dict}



