import { useEffect } from "react";
import "../styles/main.css";

function Landing() {
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

  // Redirect functions
  const goToLogin = () => {
    window.location.href = "/Login";
  };

  const goToSignup = () => {
    window.location.href = "/Signup";
  };

  const goToApp = () => {
    window.location.href = "http://localhost:5000/index";
  };

  return (
    <div className="landing">
      <nav className="navbar">
        <h2 className="logo">ABSOLUTE CINEMA</h2>

        <div className="nav-buttons">
          <button className="login" onClick={goToLogin}>
            Login
          </button>
          <button className="signup" onClick={goToSignup}>
            Sign Up
          </button>
        </div>
      </nav>

      <div className="hero">
        <h1>ABSOLUTE CINEMA</h1>
        <p>Just tell us what you wanna watch 😎</p>
      </div>

      <div className="poster-grid">
        {posters.map((id, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${id}`}
            alt="movie"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x450";
            }}
          />
        ))}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <h2>ABSOLUTE CINEMA</h2>
          <p>Your AI-powered movie discovery platform 🎬</p>
          <p className="copyright">💻🧑‍💻 Developed By Anand, Sumit & Satyam</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
