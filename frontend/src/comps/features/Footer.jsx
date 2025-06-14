import { Link } from "react-router-dom";

export default function Footer(){

    return( 
        <footer className="
        text-sm
        text-slate-300 
        text-center 
        py-6 border-t">
            <p>© 2025 <Link className="hover:underline lg:hover:text-cyan-300" to="/" target="_blank">SpectroSim</Link> • Powered by <Link className="hover:underline lg:hover:text-cyan-300" to="https://pubchem.ncbi.nlm.nih.gov" target="_blank">PubChem</Link> • <Link className="hover:underline hover:text-cyan-300" to="https://github.com/michaelddeming/spectro-sim" target="_blank">GitHub</Link></p>
            
                
     
        
        </footer>);
}