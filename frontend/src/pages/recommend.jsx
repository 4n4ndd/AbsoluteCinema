import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../styles/index.css";

function Recommend() {
  const navigate = useNavigate();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const genres = [
    { name: "Action", emoji: "🔥" },
    { name: "Comedy", emoji: "😂" },
    { name: "Drama", emoji: "🎭" },
    { name: "Romance", emoji: "❤️" },
    { name: "Horror", emoji: "👻" },
    { name: "Thriller", emoji: "🔪" },
    { name: "Sci-Fi", emoji: "🚀" },
    { name: "Adventure", emoji: "🗺️" },
    { name: "Fantasy", emoji: "🧙" },
    { name: "Crime", emoji: "🕵️" },
    { name: "Mystery", emoji: "❓" },
    { name: "Animation", emoji: "🎨" },
    { name: "Family", emoji: "👨‍👩‍👧" },
    { name: "War", emoji: "⚔️" },
    { name: "History", emoji: "📜" },
    { name: "Music", emoji: "🎵" },
    { name: "Documentary", emoji: "🎥" },
    { name: "Biography", emoji: "📖" },
    { name: "Sport", emoji: "🏆" },
    { name: "Western", emoji: "🤠" },
  ];

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

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (selectedGenres.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8082/api/recommendationHistory/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: Number(userId),
            genre: selectedGenres.join(" "),
          }),
        },
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
      alert("Something went wrong");
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
            <div className="genre-grid">
              {genres.map((g, index) => (
                <label
                  key={index}
                  className={`genre-pill ${
                    selectedGenres.includes(g.name) ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(g.name)}
                    onChange={() => toggleGenre(g.name)}
                  />

                  <span className="genre-content">
                    <span className="genre-emoji">{g.emoji}</span>
                    <span className="genre-name">{g.name}</span>
                  </span>
                </label>
              ))}
            </div>

            <button type="submit" className="recommend-btn">
              Get Recommendations 🎬
            </button>
          </form>
        </div>

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
