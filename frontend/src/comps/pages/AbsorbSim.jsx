import CompoundSearchButton from "../features/buttons/CompoundSearchButton";
import CompoundInput from "../features/CompoundInput";
import Nav from "../features/Nav";
import GeneratePlotButton from "../features/buttons/GeneratePlotButton";
import AbsorbSimPlot from "../features/AbsorbSimPlot";
import Footer from "../features/Footer";


import { useState } from "react";

import Plotly from 'plotly.js-basic-dist';

export default function AbsorbSim(props) {
  
  // DEFAULT VAR VALUES
  const defaultValue = "N/A"
  
  const [compound, setCompound] = useState(null);
  const [comp_name, setCompName] = useState(defaultValue);
  const [comp_desc, setCompDesc] = useState(defaultValue);
  const [comp_id, setCompId] = useState(defaultValue);
  const [comp_wavelength, setCompWavelength] = useState(defaultValue);
  const [comp_epsilon, setCompEpsilon] = useState(defaultValue);
  const [comp_x_data, setCompXdata] = useState([0]);
  const [comp_y_data, setCompYdata] = useState([0]);
  const [search_status, setSearchStatus] = useState(defaultValue);

  const getStatusClass = () => {
    if (search_status.startsWith("Success")) return "text-green-300";
    if (search_status.startsWith("Error")) return "text-red-300";
    if (search_status.startsWith("Searching")) return "text-yellow-300";
    return "text-cyan-400";
  }

  const [content_section_style, setContentSectionStyle] = useState("opacity-0 flex flex-wrap w-full lg:p-10 justify-center gap-8 transition transition-discrete duration-0");

  const [left_section_style, setLeftSectionStyle] = useState("w-full lg:w-[48%]");

  const [right_section_style, setRightSectionStyle] = useState("flex justify-center items-center w-full lg:w-[48%] opacity-0 transition transition-discrete duration-500");

  const handlePlotGeneration = (event) => {

    // click event
    
    setLeftSectionStyle("w-full lg:w-[48%]")
    // access the plot with the content section and make visible from hidden
    setRightSectionStyle("flex justify-center items-center w-full lg:w-[48%] opacity-100 transition transition-discrete duration-500");

    // access the overall content section and set back to flex-row lg:flex-nowrap
    setContentSectionStyle("opacity-100 flex flex-row lg:flex-nowrap flex-wrap w-full lg:p-10 justify-center gap-8 transition transition-discrete duration-500");
  }
 


  const handleCompoundSearch = async (event) => {
    event.preventDefault();
    const name = event.target.elements.compoundName.value.trim()
    if (!name) return;
    
    try {
      setSearchStatus("Searching Database...")
      const response = await fetch(`https://spectro-sim-backend.onrender.com/absorbsim-compound?name=${name}`, {
      method:"GET",
    });
    
    const data = await response.json()

    if (response.ok){
    setSearchStatus("Success!")

    const compoundKey = Object.keys(data)[0];
  
    const compoundData = data[compoundKey]; 
    console.log(compoundData)  
    setCompound(compoundData);
    setCompName(compoundData.name);
    setCompDesc(compoundData.description);
    setCompId(compoundData.cid)
    setCompWavelength(compoundData.lambda_max)
    setCompEpsilon(compoundData.epsilon_max)
    setCompXdata(compoundData.WAVE_LENGTHS)
    setCompYdata(compoundData.generated_absorption)
    
    setContentSectionStyle("opacity-0 flex flex-col flex-wrap w-full lg:p-10 justify-center items-center gap-8 transition transition-discrete duration-0")

    setLeftSectionStyle("w-full lg:w-[60%]")

    setRightSectionStyle("flex justify-center items-center w-full lg:w-[48%] opacity-0 transition transition-discrete duration-0")

    setTimeout(() => {
    setContentSectionStyle("opacity-100 flex flex-col flex-wrap w-full lg:p-10 justify-center items-center gap-8 transition transition-discrete duration-500")
    },50);
    

    
    }
    else {
    setCompound(null);
    setCompName(defaultValue)
    setCompDesc(defaultValue)
    setSearchStatus(data.detail)
    setCompId(defaultValue)
    setCompWavelength(defaultValue)
    setCompEpsilon(defaultValue)
    setContentSectionStyle("opacity-0 flex flex-col flex-wrap w-full lg:p-10 justify-center items-center gap-8 transition transition-discrete duration-0")
    }
    
  } catch (error) {
    console.log(error);
  }}

  const [plot_ref, setPlotRef] = useState(null);

  const handleDownloadPlot = async (event) => {
    console.log(plot_ref)
    if (plot_ref) {
      Plotly.downloadImage(plot_ref, {
        format: "png",
        filename: `${comp_id}_${comp_name}_absorption_spectroscopy`,
        width: 800,
        height: 600,
        });
    };


  };
  
  
  
  return (
    <>
    <div className="flex flex-col min-h-screen">
    
      <Nav></Nav>
      
      <main className="flex flex-col flex-grow items-center pt-12 gap-4">
        
        
        {/* ------------- COMPOUND SEARCH SECTION -------------*/}
        <div className="flex flex-col items-center gap-4">
          
          <h1 className="text-4xl underline decoration-2 underline-offset-4">Compound Search</h1>
          
          <form className="flex flex-row gap-2 w-fit" onSubmit={handleCompoundSearch}>
          <CompoundInput name="compoundName"
          ></CompoundInput>
          <CompoundSearchButton text="SEARCH" type="submit"></CompoundSearchButton>
          </form>

          {/* --------- PUBCHEM REFERENCE ------------ */}
          <div className="text-cyan-100 text-[12px]">
             <p>
            Spectral data sourced from the{" "}
              <a
                href="https://pubchem.ncbi.nlm.nih.gov"
                target="_blank"
                className="underline hover:text-cyan-300">
                PubChem
              </a>{" "}
            database.
            </p>
          </div>

          {/* -------------- SEARCH STATUS INDICATOR ---------------*/}
          <div className="flex flex-row flex-wrap text-baseline justify-center gap-2 text-[16px]">
            <h2>Search Status:</h2>
            <p className={`${getStatusClass()}`}>{search_status}</p>
            
          </div>
            
          
          
          </div>
         

          

        {/* COMPOUND SEARCH PLOT GENERATION */}
        <div className={content_section_style}>
          {/* LEFT SECTION */}
          <div className={left_section_style}>
            {/* COMPOUND TITLE and GENERATE BUTTON */}
            <div className="flex flex-wrap items-center mb-2 gap-x-2 pr-2 w-full">
              <h1 className="text-[30px] font-bold">{comp_name}</h1>
              <GeneratePlotButton onClick={handlePlotGeneration}text="Generate AbsorbSim"></GeneratePlotButton>
            </div>

            <hr></hr>

            {/* COMPOUND DATA INFO */}
            <div className="w-full">
              {/* COMPOUND DESC */}
              <div className="mt-4 flex flex-col gap-1">
                <h2 className="underline font-bold">Description:</h2>
                <p className="text-pretty">{comp_desc}</p>
              </div>

              {/* COMPOUND TABLE DATA */}
              <div className="mt-4">
                <h2 className="font-bold underline">Spectral Data:</h2>
                <div className="overflow-x-auto rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,.5)] hover:shadow-[6px_6px_10px_rgba(0,0,0,.7)] transition-shadow duration-500 ease-in-out mt-2">
                  <table className="min-w-full text-left bg-slate-600 border-collapse">
                    <thead className="bg-slate-800 text-cyan-500">
                      <tr>
                        <th className="px-4 py-2 border border-slate-700">
                          CID#
                        </th>
                        <th className="px-4 py-2 border border-slate-700">
                          Compound
                        </th>
                        <th className="px-4 py-2 border border-slate-700">
                          λmax (nm)
                        </th>
                        <th className="px-4 py-2 border border-slate-700">
                          εmax (M⁻¹cm⁻¹)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:text-slate-800">
                        <td className="hover:bg-slate-500 hover:text-slate-200 px-4 py-2 border border-slate-700">
                          {comp_id}
                        </td>
                        <td className="hover:bg-slate-500 hover:text-slate-200 px-4 py-2 border border-slate-700">
                          {comp_name}
                        </td>
                        <td className="hover:bg-slate-500 hover:text-slate-200 px-4 py-2 border border-slate-700">
                          {comp_wavelength}
                        </td>
                        <td className="hover:bg-slate-500 hover:text-slate-200 px-4 py-2 border border-slate-700">
                          {comp_epsilon}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className={right_section_style}>
            {/* PLOT & DOWNLOAD BTN */}

              <div className="flex flex-col w-full max-w-[750px] gap-2 items-start mb-4">
                <div className='w-full aspect-[4/3] rounded-lg overflow-clip bg-slate-800 border border-slate-700 shadow-[4px_4px_8px_rgba(0,0,0,.5)] hover:shadow-[6px_6px_10px_rgba(0,0,0,.7)] transition-shadow duration-500 ease-in-out'>
                  <AbsorbSimPlot 
                  y_data={comp_y_data} 
                  x_data={comp_x_data}
                  title={comp_name}
                  setPlotRef={setPlotRef}>
                  </AbsorbSimPlot>
                </div>
                
                
                <div className="">
                  <GeneratePlotButton onClick={handleDownloadPlot} text="Download AborbSim"></GeneratePlotButton>
                </div>
                
              </div>
            </div>
          </div>
      </main>
      
    <Footer></Footer>
    </div>
      
      
    </>
  );
};