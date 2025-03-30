import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { SketchPicker } from 'react-color';
import "./App.css";


function App() {
  const [color, setColor] = useState("#f2f999f");
  const [isOpen, setIsOpen] = useState(false);
  const [gradient, setGradient] = useState([]);



  return (
  
     
      <>
          <>
            <SketchPicker
            color={color}
            onChange={(color,event)=>{
            setColor(color);
            console.log(color.rgb)
            invoke("generate_gradient",color.rgb).then((grad)=>{
              console.log(grad);
              setGradient(grad);
            });
           }}
          />
          </>
        
          {gradient.map((color) => (
            
            <div
            style={{
              padding:"1.2em",
               backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            }}
            >
            rgb({color[0]}, {color[1]}, {color[2]})
            </div>  
           
          ))}
       
      </>
     
   
  );
}

export default App;
