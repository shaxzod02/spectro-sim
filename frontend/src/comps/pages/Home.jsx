import Nav from "../features/Nav";
import LogoImage from "../features/LogoImage";
import ComingSoonLogoImage from "../features/ComingSoonLogoImage";
import Footer from "../features/Footer.jsx";

function Home() {

    return(
        <>
        <div className="flex flex-col min-h-screen">
        
        <Nav></Nav>
    
        <main className="flex-grow flex flex-col items-center pt-12">
             
             {/* PAGE TITLE */}
            <div className="p-4">
                <p className="text-xl">Spectroscopy <i>simplified...</i></p>
            </div>

            {/* SIMULATOR LOGO SELECTION AREA */}
            <div className="flex flex-row w-[85%] lg:w-[65%] flex-wrap gap-12 justify-evenly p-10">
                    
                <LogoImage
                img_src="/absorbsim_logo.jpg"
                path="/absorbsim"
                label="AbsorbSim"></LogoImage>
                <ComingSoonLogoImage
                label="Coming Soon..."></ComingSoonLogoImage>
            </div>
            </main>
            
            {/* FOOTER SECTION */}
            <div className="w-full">
                <Footer></Footer>
            </div>

        </div>
        

        

        </>
    );
};

export default Home;

