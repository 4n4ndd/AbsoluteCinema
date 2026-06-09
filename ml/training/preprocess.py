import pandas as pd
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


RAW_DIR = os.path.join(BASE_DIR, "..", "data", "raw", "ml-32m", "ml-32m")

PROCESSED_DIR = os.path.join(BASE_DIR, "..", "data", "processed")
os.makedirs(PROCESSED_DIR, exist_ok=True)

MOVIES_RAW = os.path.join(RAW_DIR, "movies.csv")
RATINGS_RAW = os.path.join(RAW_DIR, "ratings.csv")

SAMPLE_SIZE = 2_000_000   

print("📥 Starting preprocessing...")
print("Movies file:", MOVIES_RAW)
print("Ratings file:", RATINGS_RAW)

movies = pd.read_csv(MOVIES_RAW)
print("Movies loaded:", movies.shape)


chunks = []
collected = 0

print("Sampling 2,000,000 rows...")
for chunk in pd.read_csv(RATINGS_RAW, chunksize=500_000):
    need = SAMPLE_SIZE - collected
    if need <= 0:
        break
    take = min(need, len(chunk))
    chunks.append(chunk.sample(take, random_state=42))
    collected += take

ratings = pd.concat(chunks, ignore_index=True)
print("Ratings loaded:", ratings.shape)


ratings = ratings[["userId", "movieId", "rating"]]


merged = ratings.merge(movies[["movieId", "title", "genres"]], on="movieId", how="left")


train_csv = os.path.join(PROCESSED_DIR, "train.csv")
merged.to_csv(train_csv, index=False)
print("Saved training:", train_csv)


meta_csv = os.path.join(PROCESSED_DIR, "movies_meta.csv")
movies[["movieId", "title", "genres"]].to_csv(meta_csv, index=False)
print("Saved metadata:", meta_csv)

print("\n🎉 Preprocessing Complete!")
print("Total rows:", merged.shape[0])
print("Users:", merged['userId'].nunique())
print("Movies:", merged['movieId'].nunique())
