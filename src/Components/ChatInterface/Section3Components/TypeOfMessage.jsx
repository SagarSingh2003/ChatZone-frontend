export default function TypeOfMessage({scrollIntoView}){
    return(
        <section className="pr-[30px] flex flex-row text-white ">
            <button title="scroll down" onClick={scrollIntoView} className="transition-color-custom flex items-center justify-center h-[50px] w-[50px] font-bold border  bg-[black] text-[white] hover:bg-[white] hover:text-black box-border hover:rounded rounded-full cursor-pointer mr-[10px] ">
                v
            </button>
            <span  className="flex transition-color-custom items-center justify-center h-[50px] w-[50px] font-bold border border-[white] bg-[black] text-[white] box-border hover:rounded rounded-full hover:bg-[white] hover:text-black cursor-pointer " >
                +
            </span>
        </section>
    )
}