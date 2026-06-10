import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../styles/index.css";

function Recommend() {
  const navigate = useNavigate();

  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);

  const userId = localStorage.getItem("userId");
  //const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }

    try {
      const response = await fetch(
        `http://localhost:8082/api/recommendationHistory/recommend?userId=${userId}&genre=${genre}`,
      );

      if (!response.ok) {
        alert("Failed to fetch recommendations");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setMovies(data.recs);
      } else {
        alert("No recommendations found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch recommendations");
    }
  };

  return (
    <div className="recommend-page">
      <div className="profile-circle" onClick={() => navigate("/profile")}>
        <FaUser />
      </div>

      <div className="recommend-poster-grid">
        {posters.map((id, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${id}`}
            alt="movie"
          />
        ))}
      </div>

      <div className="recommend-overlay"></div>

      <div className="main-container">
        <div className="hero">
          <h1>ABSOLUTE CINEMA</h1>
          <p>AI-powered movie recommendations 🎬</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value="">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Adventure">Adventure</option>
            </select>

            <button type="submit">Get Recommendations</button>
          </form>
        </div>

        {movies.length > 0 && (
          <div className="results">
            <h2>TOP 5 RECOMMENDATIONS</h2>

            {movies.length > 0 && (
              <div className="results">
                <h2>Top Picks For You 🔥</h2>

                {movies.map((m, index) => (
                  <div className="movie-card" key={index}>
                    <div className="card-top">
                      <div className="card-icon">🎬</div>
                      <span className="card-badge">⭐ {m.rating}</span>
                    </div>

                    <h3>{m.title}</h3>

                    <div className="card-tags">
                      {m.genre.split("|").map((g, i) => (
                        <span className="tag" key={i}>
                          {g}
                        </span>
                      ))}
                    </div>

                    <div className="card-divider"></div>

                    <div className="card-bottom">
                      <span className="rating">⭐ {m.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <footer className="footer">
          <div className="footer-content">
            <h2>ABSOLUTE CINEMA</h2>
            <p>Your AI-powered movie discovery platform 🎬</p>
            <p className="copyright">💻🧑‍💻 Developed By Anand, Sumit & Satyam</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Recommend;
