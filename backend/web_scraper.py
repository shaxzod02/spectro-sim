import requests
import json
import re


def get_cid(name: str) -> dict:
    """Given the name of a compound, search PubChem via PUG Rest API for the CID for the compound within the online database.

    PUG Rest API returns a response obj of minimal data related to a compound, like its CID.'

    Returns a dict containing the name, and CID of the compound name provided."""

    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{name}/cids/JSON"

    response = requests.get(url)

    try:
        compound_data = response.json()
        return {"name": name.title(), "cid": compound_data["IdentifierList"]["CID"][0]}
    except KeyError:
        raise ValueError(f"Error -> Compound Not Found/Invalid!")


def get_data_via_cid(compound_dict: dict) -> dict:
    """Given the dict returned by get_cid(), search PubChem via PUG_View Rest API for the compound data pertaining to the CID within the dict provided.

    Returns a dict for compound_name, compound_cid, compound_data_text."""

    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/{compound_dict['cid']}/JSON"

    try:
        response = requests.get(url)
    except TypeError:
        raise ValueError("Error 404, Invalid Search Response.")

    if response:
        compound_desc = get_description(response.json())
    
        compound_dict["compound_data_string"] = response.text
        compound_dict["description"] = compound_desc["description"]
        compound_dict["desc_ref"] = compound_desc["desc_ref"]
        return compound_dict


def extract_abs_spectro(compound_dict) -> dict:
    """Given the compound_dict returned by the get_data_via_cid(), search for a 'MAX ABSORPTION...' pattern within the compound_data_string within the compound_dict provided (compound_dict["compound_dict"]])."""

    # pattern = r"MAX ABSORPTION \((.+)\): (\d+) \w{2} \(LOG E= (.+?)\);"
    # group 1 -> Solvent (Alcohol)
    # group 2 -> lambda_max (NM)
    # group 3 -> epsilon
    found_match = {}
    match = re.search("MAX ABSORPTION", compound_dict["compound_data_string"])
    
    solvent_pattern = r"\(\w+\)"
    data_pattern = r" (\d+\.?\d+) \w{2} \(LOG E= (.+?)\)"

    if match:
        start_span, stop_span = match.span()
        
        new_match_string = ""
        for char in compound_dict["compound_data_string"][start_span:]:
            if char == "\"":
                break
            new_match_string += char


        
        solvent = re.search(solvent_pattern, new_match_string).group(0)[1:-1].title()
        data_matches = re.findall(data_pattern, new_match_string)
       
    
        max_epsilon = 0.0
        max_lambda = 0.0
        for i in range(len(data_matches)):
            lambda_max, epsilon_max = data_matches[i]
            lambda_max, epsilon_max = float(lambda_max), round(10 ** float(epsilon_max))
            if epsilon_max >= max_epsilon:
                max_epsilon = epsilon_max
                max_lambda = lambda_max



            
            data_matches[i] = {"lambda_max": lambda_max,
            "epsilon_max": epsilon_max}
        

        compound_dict["solvent"] = solvent
        compound_dict["epsilon_max"] = max_epsilon
        compound_dict["lambda_max"] = max_lambda
        compound_dict["absorb_spectro_data"] = data_matches



        del compound_dict["compound_data_string"]
        return compound_dict
    else:
        raise ValueError(f"Error -> No UV/Vis data found for {compound_dict['name']}!")


def write_data(data: json, indicator: int):

    with open(f"compound_data{indicator}.json", "w", newline="") as file:
        json.dump(data, file, indent=2)


def get_section(sections: list, Heading: str, key: str):

    if sections and isinstance(sections[0], dict):
        for section in sections:
            if section[key] == Heading:
                return section
        return None
    else:
        raise ValueError("No sections to parse.")


def get_description(data: json) -> str:

    temp = data["Record"]["Section"]

    sections = get_section(temp, "Names and Identifiers", "TOCHeading")

    if sections:
        sections = get_section(sections["Section"], "Record Description", "TOCHeading")

    info = sections.get("Information", None)

    if info:
        ref = info[0].get("Reference", None)
        desc = info[0].get("Value", None)
    if desc:
        desc = desc.get("StringWithMarkup", None)
    if desc:
        desc = desc[0].get("String")
    if ref:
        ref = ref[0]
    
    return {"description": desc, "desc_ref": ref}
    


# cid = get_cid("Quinine")
# data_dict = get_data_via_cid(cid)
# extract_abs_spectro(data_dict)