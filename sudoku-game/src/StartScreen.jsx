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
          <input
            className="start-user-name start-input"
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="password" placeholder="Şifrenizi girin" className="start-password start-input"  />
          <button className="start-btn" onClick={handleStart}>Başla</button>
        </div>
      );
    }
    
    export default StartScreen;
