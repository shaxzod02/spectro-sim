

function Card({children}){
    return(
        <div className="
        flex
        flex-row
        items-center
        justify-center
        gap-4
        w-fit
        h-fit
        rounded-lg
        p-6 
        bg-slate-800 
        transform
        lg:hover:scale-105
        duration-300
        shadow-[4px_4px_8px_rgba(0,0,0,.5)] 
        lg:hover:shadow-[6px_6px_10px_rgba(0,0,0,.7)] 
        transition-all
        lg:hover:ring-4
        lg:hover:ring-cyan-700
        ease-in-out
        group
        ">
           {children}
        </div>
    );
}

export default Card;