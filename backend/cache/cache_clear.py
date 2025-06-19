import json


def cache_clear(file_path, final_search):
    try:
        with open(file_path, "r") as file:
            cache = json.load(file)
    except (FileNotFoundError):
        print("Error: Cache not found, cache_clear unsuccessful.")
        return None
    except json.JSONDecodeError:
        print("Error: Cache empty, cache_clear unsuccessful.")
        return None

    to_be_deleted = set()

    for compound_name, compound_data in cache.items():

        if compound_name == "total_search_count":
            cache[compound_name] = 0
            continue
        # clears out all Compounds with no UV/Vis data.
        if compound_data is None or compound_data["search_count"] <= 10:
            to_be_deleted.add(compound_name)
            continue
        if compound_name == final_search:
            compound_data["search_count"] = 0
        else:
            compound_data["search_count"] = 1

        
    print(to_be_deleted)
    for compound_name in to_be_deleted:
        del cache[compound_name]


    # write updated cache back to compound_cache.json
    with open(file_path, "w") as file:
        json.dump(cache, file, indent=2)
    
    return cache
        
if __name__ == "__main__":
    cache_clear()
