import React from "react";
import { nanoid } from "nanoid";

export default function Body({hex}){

    const[notificationClass, setNotificationClass] = React.useState("notification")

    function handleClick(x){
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = x;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        setNotificationClass("notification notification-clicked")
        setTimeout(() => {
            setNotificationClass("notification")
        }, 1500)
    }
    
    return (
        <div className="color-scheme">
            {hex.map((item)=>{
                
                return (
                    <div
                    className="color-scheme-item" 
                    key={nanoid()}  
                    >
                        <div      
                        style={item}
                        onClick = {()=>handleClick(item.backgroundColor)} 
                        ></div>
                        
                        <div 
                        onClick = {()=>handleClick(item.backgroundColor)} 
                        >{item.backgroundColor}</div>

                        <div 
                        className={notificationClass}
                        >Copied to Clipboard!</div>
                    </div>
                )
            })}
        </div>
    )
}
    

