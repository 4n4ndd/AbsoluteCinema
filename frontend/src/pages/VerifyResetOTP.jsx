import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function VerifyResetOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const [otp, setOtp] = useState("");

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

  const handleVerify = async () => {
    try {
      const res = await fetch(
        `http://localhost:8082/api/auth/verify-reset-otp?email=${email}&otp=${otp}`,
        { method: "POST" },
      );

      const message = await res.text();
      alert(message);

      if (message === "OTP verified successfully") {
        navigate("/reset-password", {
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
          <p>Verify Reset OTP 🔐</p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="auth-btn" onClick={handleVerify}>
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyResetOTP;
