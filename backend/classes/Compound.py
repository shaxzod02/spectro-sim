import numpy as np
import matplotlib.pyplot as plt
import json


class Compound:

    def __init__(
        self,
        name: str,
        absorb_spectro_data: list,
        sigma: float,
        concentration: float = None,
        light_distance: float = None,
    ):
        self.name = name
        self.absorb_spectro_data = absorb_spectro_data
        self.sigma = sigma
        self.concentration = concentration
        self.light_distance = light_distance
        self.generated_absorption = []
        self.WAVE_LENGTHS = [val for val in range(1, 801, 1)]

    def gen_gaussian_distribution(self, wave_lengths: list):
        
        
        for wave_length in wave_lengths:
            wave_length_absorb = 0
            for data in self.absorb_spectro_data:


                absorbance = self.light_distance * self.concentration * data["epsilon_max"] * np.exp(
                    -((wave_length - data["lambda_max"]) ** 2) / ((2 * self.sigma) ** 2)
                )
                
                wave_length_absorb += absorbance
            self.generated_absorption.append(wave_length_absorb)



# TESTING
# ---------------------------

# compounds = []


# with open("cache/compound_cache.json", "r") as file:
#     file_content = json.load(file)


#     for key, value in file_content.items():
#         compound = Compound(name = value["name"],
#                             absorb_spectro_data= value["absorb_spectro_data"],
#                             sigma=value["sigma"],
#                             concentration=value["concentration"],
#                             light_distance=value["light_distance"],)
#         compounds.append(compound)

# print(compounds)

# test_comp = compounds[0]
# test_comp.concentration = 1e-5

# test_comp.gen_gaussian_distribution(test_comp.WAVE_LENGTHS)



# plt.plot(test_comp.WAVE_LENGTHS, test_comp.generated_absorption)
# plt.title(f"Absorption Spectroscopy of {(test_comp.name).title()}")
# plt.xlabel("Wavelength (nm)")
# plt.ylabel("A(λ)")
# plt.show()
