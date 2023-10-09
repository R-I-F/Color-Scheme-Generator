import React from "react";
import Body from "./Body";
import {nanoid} from "nanoid"

export default function Container (){
    const [formData, setFormData] = React.useState({
        colorInput: "#000000", 
        schemeMode: "Monochrome",
    })

    const[colorScheme, setColorScheme]= React.useState([])

    function handleChange(e){
        setFormData(prev=>{return{
            ...prev,
            [e.target.name]:e.target.value
        }})
    }
    function handleSubmit(e){
        e.preventDefault()        
        fetch(`https://www.thecolorapi.com/scheme?hex=${formData.colorInput.replace(/#/g, "")}&mode=${formData.schemeMode.toLowerCase()}`)        
        .then(res=>res.json())
        .then(data=>{
            setColorScheme(data.colors)
        })
    }
    
    const colorSchemeHex = colorScheme?.map((item)=>{
        return {backgroundColor:item.hex.value}
    })

    return(
        <div>
            <form>
                <input 
                type="color" 
                name="colorInput"
                onChange={handleChange}
                value={formData.colorInput === "" ? "#000000" : formData.colorInput}
                />
                <select 
                name="schemeMode"
                onChange={handleChange}
                value={formData.schemeMode === "" ? "Monochrome" : formData.schemeMode}
                >
                    <option>Monochrome</option>
                    <option>Monochrome-Dark</option>
                    <option>Monochrome-Light</option>
                    <option>Analogic</option>
                    <option>Complement</option>
                    <option>Analogic-Complement</option>
                    <option>Triad</option>
                    <option>Quad</option>
                </select>
                <button
                onClick={handleSubmit}
                >Get color scheme</button>
            </form>
            {colorSchemeHex.length? 
            <Body
            hex = {colorSchemeHex}
            />:null
            }
        </div>

    )
}

