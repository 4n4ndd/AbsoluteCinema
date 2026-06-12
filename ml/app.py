from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model", "svd_model.pkl")
MOVIES_PATH = os.path.join(BASE_DIR, "data", "processed", "movies_meta.csv")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

movies = pd.read_csv(MOVIES_PATH)

@app.route("/")
def home():
    return jsonify({
        "service": "Absolute Cinema ML Service",
        "status": "running"
    })

#@app.route("/recommend", methods=["POST"])
@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()

        user_id = data.get("userId", 1)
        genre = data.get("genre")

        predictions = []

        for movie_id in movies["movieId"]:
            pred = model.predict(user_id, movie_id)

            predictions.append({
                "movieId": movie_id,
                "pred_rating": pred.est
            })

        pred_df = pd.DataFrame(predictions)

        merged = pred_df.merge(movies, on="movieId")

        # Multi-genre filtering
        if genre:
            genre_list = genre.lower().split()

            filtered = merged[
                merged["genres"].apply(
                    lambda movie_genres:
                    all(
                        g in movie_genres.lower()
                        for g in genre_list
                    )
                )
            ]
        else:
            filtered = merged

        if filtered.empty:
            filtered = merged

        top_movies = filtered.sort_values(
            by="pred_rating",
            ascending=False
        ).head(5)

        recommendations = []

        for _, row in top_movies.iterrows():
            recommendations.append({
                "movieId": int(row["movieId"]),
                "title": row["title"],
                "genre": row["genres"],
                "rating": round(float(row["pred_rating"]), 2)
            })

        return jsonify({
            "success": True,
            "recs": recommendations
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
