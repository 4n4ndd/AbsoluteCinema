import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const posters = [
    "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
    "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    "/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
    "/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg",
    "/w7PJ7fBEYOuaAMKfYa4zmw45v3N.jpg",
    "/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg",
    "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
  ];

  const handleForgotPassword = async () => {
    try {
      const res = await fetch(
        `http://localhost:8082/api/auth/forgot-password?email=${email}`,
        { method: "POST" },
      );

      const message = await res.text();
      alert(message);

      if (message === "Password reset OTP sent") {
        navigate("/verify-reset-otp", {
          state: { email },
        });
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-poster-grid">
        {posters.map((id, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${id}`}
            alt="movie"
          />
        ))}
      </div>

      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-box">
          <h1>ABSOLUTE CINEMA</h1>
          <p>Forgot Password 🔑</p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="auth-btn" onClick={handleForgotPassword}>
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
