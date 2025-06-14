
import { Link } from "react-router-dom";

import Card from "./Card";


function LogoImage(props) {
    return(
        <>
        <Link to="/absorbsim">
        <Card>
            <div className="flex flex-col justify-center items-center gap-4 group-hover:cursor-pointer">
                <div className="
                w-[170px]
                h-[170px]
                overflow-hidden
                rounded-[50%]
                transform
                lg:group-hover:scale-105
                duration-300
                shadow-[4px_4px_8px_rgba(0,0,0,.5)] 
                lg:group-hover:shadow-[6px_6px_10px_rgba(0,0,0,.7)] 
                transition-all
                lg:grayscale
                lg:group-hover:grayscale-0
                lg:group-hover:ring-2
                ring-2
                lg:group-hover:ring-cyan-700
                ring-cyan-700
                ease-in-out">
                <img className="w-full h-full object-cover" src={props.img_src}></img>
            </div>
            <div className="
            transform
            lg:group-hover:scale-105
            duration-300
            transition-all
            lg:text-slate-400
            lg:group-hover:text-slate-200
            ease-in-out">
                <h1 className="text-xl">{props.label}</h1>
            </div>
            </div>
        </Card>
        </Link>
        
            
            
        
        
        </>
        
 
        
        
    );
}

export default LogoImage;