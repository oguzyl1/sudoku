import { useState } from "react";

function StartScreen({onStart}){

    const[name,setName] = useState("");

    const handleStart = ()=>{
        if(name.trim()!==""){
            onStart(name.toUpperCase());
        }else{
            alert("lütfen geçerli bir kullanıcı adı girin!!!");
        }
    }
    return (
        <div className="start-screen">
          <h1 className="start-h1">Hoşgeldiniz!</h1>
          <input
            className="start-input"
            type="text"
            placeholder="Adınızı girin"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="start-btn" onClick={handleStart}>Başla</button>
        </div>
      );
    }
    
    export default StartScreen;
