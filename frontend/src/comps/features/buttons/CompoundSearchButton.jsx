import { FiSearch } from "react-icons/fi";




export default function CompoundSearchButton(props){
    return(
        <>

        <button className="
        bg-cyan-700
        text-cyan-200
        px-4
        py-1
        rounded-xl
        cursor-pointer 
        hover:bg-cyan-500
        hover:text-slate-100
        duration-500 
        shadow-[4px_4px_8px_rgba(0,0,0,.5)] 
        hover:shadow-[6px_6px_10px_rgba(0,0,0,.7)] 
        transition-shadow 
        ease-in-out 
        h-[40px]" 
        onClick={props.onClick}>
            <FiSearch 
            className="
            size-6
            "></FiSearch>
            </button>

        </>
    );

};