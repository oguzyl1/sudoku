// RegisterScreen.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username: username.toUpperCase(),
          password: password
        });
        setMessage("Kayıt başarılı! Giriş yapabilirsiniz.");
        navigate("/login");  // Kayıt işleminden sonra giriş sayfasına yönlendirme
      } catch (error) {
        setMessage("Kayıt hatası: " + error.response.data);
        console.log("Kayıt hatası:", error);
      }
    } else {
      alert("Lütfen geçerli bir kullanıcı adı ve şifre girin!");
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={handleRegister}>
        <input
          className="register-input"
          type="text"
          placeholder="Kullanıcı adınızı girin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> <br />
        <input
          className="register-input"
          type="password"
          placeholder="Şifrenizi girin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> <br />
        <button className="register-btn" type="submit">Kayıt Ol</button> <br />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default RegisterScreen;
