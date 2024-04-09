import emoji from "../../../assets/emoji.svg";
import {useState} from 'react';

export default function Emojis({textarearef}){
    
    const [faceEmojis , setFaceEmojis] = useState([  "😀" , "😃" , "😄" , "😁" , "😆" , "😅", "😂" , "🤣" , "🥲", "🥹" , "☺️" , "😊" , "😇" , "🙂" , "🙃" , "😉" , "😌" , "😍" , "🥰" , "😘" ,"😗" ,"😙" , "😚" , "😋" , "😛", "😝" , "😜" , "🤪" , "🤨" , "🧐" , "🤓" , "😎" , "🥸" , "🤩" , "🥳" , "🙂‍↕️" , "😏" , "😒" , "🙂‍↔️" , "😞" , "😔" , "😟" ,"😕" , "🙁" , "☹️"  , "😣" ,  "😖" , "😫", "😩" , "🥺" , "😢" , "😭" , "😮‍💨" , "😤" , "😠" , "😡" , "🤬" , "🤯" , "😳" , "🥵" , "🥶" , "😱" , "😨" , "😰" , "😥" ,"😓" , "🫣" , "🤗" , "🫡", "🤔" , "🫢", "🤭" , "🤫" , "🤥" , "😶" , "😶‍🌫️" , "😐" , "😑" , "😬" , "🫨" , "🫠" , "🙄" , "😯", "😦" , "😧", "😮" , "😲" , "🥱" , "😴" , "🤤" , "😪" , "😵" , "😵‍💫" , "🫥" , "🤐" , "🥴" , "🤢" , "🤮" , "🤧" , "😷" , "🤒" , "🤕" , "🤑", "🤠" , "😈" , "👿", "👹" , "👺" ,"🤡" , "💩" , "👻" , "💀" ,"☠️" ,"👽" , "👾" , "🤖" ,"🎃" ,"😺" ,"😸", "😹" , "😻" , "😼" ,"😽" , "🙀" , "😿" , "😾"]);
    const [showEmojiBar , setShowEmojiBar] = useState(false);
    showEmojiBar ? console.log('show emojiiiiiiiiiiiiiiss' ) : null ;
    
    return (
        <>
            <section onClick={() => setShowEmojiBar((val) => val ? false : true )} className="ml-[15px] flex items-center justify-center pb-[9px] cursor-pointer ">
                    <section   className="min-h-[30px] min-w-[30px]"><img src={emoji} alt="" className="h-[30px] min-h-[30px] z-20"/></section>
                    
            </section>
            <section className="">
                {showEmojiBar ? 
                        <section className="scrollbar-style overflow-scroll overscroll-x-contain overflow-x-clip text-[100px] text-white absolute top-[-500px] right-[80px] h-[500px] w-[400px] flex flex-row flex-wrap " >
                        {faceEmojis.map((emoji) => {return <div className="text-[20px] p-[10px] hover:rounded hover:bg-[white] cursor-pointer" onClick={() => {console.log(  textarearef.current.value = (textarearef.current.value).slice(0 , textarearef.current.selectionStart ) + emoji + (textarearef.current.value).slice(textarearef.current.selectionStart , )) ; 
                         textarearef.current.setSelectionRange(textarearef.current.selectionStart , textarearef.current.selectionStart)
                        }}>{emoji}</div>})}
                        </section>  
                    : 
                    null
                    }
            </section>
        </>  
              
    )
}


