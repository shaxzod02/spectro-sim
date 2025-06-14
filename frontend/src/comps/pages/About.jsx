import Nav from "../features/Nav";
import Footer from "../features/Footer";

export default function About(){
    return(
        <>
            <div className="flex flex-col min-h-screen">
            
                <Nav></Nav>

                {/* ABOUT PAGE CONTENT */}
                <main className="flex-grow flex flex-col items-center pt-12 mb-8">
                    
                    {/* ABOUT PAGE TITLE */}
                    <div className="mb-4">
                        <p className="text-xl">What is <b className="underline">spectroscopy</b>?</p>
                    </div>
                    
                    {/* ABOUT PAGE DESC */}
                    <div className="px-6 max-w-4xl text-justify space-y-6">
                        <p className="indent-8 text-lg leading-relaxed">Spectroscopy is a scientific technique used to study the interaction between matter and electromagnetic radiation. Spectroscopy involves measuring how light of different wavelengths is absorbed, emitted, or scattered by a substance. This interaction reveals critical information about the substance's molecular structure, composition, and physical properties.</p>

                        <p className="indent-8 text-lg leading-relaxed">Modern spectroscopy encompasses a wide range of techniques, including UV-Vis spectroscopy for studying electronic transitions, infrared (IR) spectroscopy for identifying functional groups, nuclear magnetic resonance (NMR) for structural elucidation, and mass spectrometry for determining molecular masses and fragmentation patterns. By analyzing spectral data, scientists can determine everything from the concentration of a compound in solution to the detailed architecture of complex biomolecules.</p>
                    </div>

                </main>
                    
                {/* FOOTER SECTION */}
                <div className="w-full">
                    <Footer></Footer>
                </div>

            </div>
            

        

        </>
    );
 
}