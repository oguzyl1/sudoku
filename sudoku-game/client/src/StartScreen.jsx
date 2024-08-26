// StartScreen.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (name.trim() !== "" && password.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            username: name.toUpperCase(),
            password: password,
          }
        );
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userId", decodedToken._id);
        onStart(name.toUpperCase());
        navigate("/");
      } catch (error) {
        setMessage(
          "Giriş hatası: " +
            (error.response?.data || "Bilinmeyen bir hata oluştu")
        );
      }
    } else {
      alert("Lütfen geçerli bir kullanıcı adı ve şifre girin!");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="start-screen">
      <input
        className="start-user-name start-input"
        type="text"
        placeholder="Kullanıcı adınızı girin"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifrenizi girin"
        className="start-password start-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="start-btn" onClick={handleStart}>
        Başla
      </button>
      {message && <p>{message}</p>}
      <button className="start-btn" onClick={handleRegisterRedirect}>
        Kayıt Ol
      </button>
    </div>
  );
}

export default StartScreen;
