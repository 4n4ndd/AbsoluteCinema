import pickle
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "model", "svd_model.pkl")
)

MOVIES_PATH = os.path.abspath(
    os.path.join(BASE_DIR, "..", "data", "processed", "movies_meta.csv")
)

print("MODEL:", MODEL_PATH)
print("MOVIES:", MOVIES_PATH)

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

movies = pd.read_csv(MOVIES_PATH)

print(movies.head())