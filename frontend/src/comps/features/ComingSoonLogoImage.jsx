
import Card from "./Card";

function ComingSoonLogoImage(props) {
    return(
        <Card>
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="
                flex
                justify-center
                items-center
                w-[170px]
                h-[170px]
                overflow-hidden
                bg-white
                rounded-[50%]
                shadow-[4px_4px_8px_rgba(0,0,0,.5)] 
                grayscale">
                    <p className="text-black">{props.label}</p>
                
            </div>
            <div className="
            text-slate-400">
                <h1 className="text-xl">{props.label}</h1>
            </div>
            </div>
        </Card>


        
    );
}

export default ComingSoonLogoImage;