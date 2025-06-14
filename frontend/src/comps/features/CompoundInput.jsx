

export default function CompoundInput(props){

    return(
        <input name={props.name} type="text" placeholder="Compound Name" 
        className="
        bg-slate-200
        border
        text-black
        px-2
        rounded-lg 
        focus: outline-none 
        shadow-[4px_4px_8px_rgba(0,0,0,.5)] 
        hover:shadow-[6px_6px_10px_rgba(0,0,0,.7)] 
        transition-shadow 
        duration-500 
        ease-in-out 
        w-[250px] 
        lg:w-[350px] 
        h-[40px]"></input>
    );
}