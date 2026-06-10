import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import "../styles/index.css";
import "../styles/profile.css";
function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);

  const userId = localStorage.getItem("userId");

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

  useEffect(() => {
    loadProfile();
    loadHistory();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetch(`http://localhost:8082/api/users/${userId}`);

      const user = await res.json();

      setName(user.name);
      setEmail(user.email);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await fetch(
        `http://localhost:8082/api/recommendationHistory/user/${userId}`,
      );

      const data = await res.json();

      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      await fetch(`http://localhost:8082/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      alert("Profile Updated");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
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

      <button className="back-btn" onClick={() => navigate("/recommend")}>
        ← Back
      </button>

      <div className="auth-container">
        <div className="auth-box">
          <h1>ABSOLUTE CINEMA</h1>
          <p>My Profile 👤</p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />

          <button className="auth-btn" onClick={updateProfile}>
            Update Profile
          </button>

          <button className="auth-btn logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="history-section">
        <h2>Recommendation History</h2>

        <div className="history-grid">
          {history.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-card-top">
                <div className="card-icon">🎬</div>
                <span className="card-badge">
                  {new Date(item.recommendedAt).toLocaleDateString()}
                </span>
              </div>
              <h3>{item.movieTitle}</h3>
              <div className="card-tags">
                {item.genres.split("|").map((g, i) => (
                  <span className="tag" key={i}>
                    {g}
                  </span>
                ))}
              </div>
              <div className="card-divider"></div>
              <div className="history-card-bottom">
                <span className="history-time">
                  🕐{" "}
                  {new Date(item.recommendedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
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

export default Profile;
