
import pandas as pd
from surprise import SVD, Dataset, Reader, accuracy
from surprise.model_selection import train_test_split
import pickle
import os

# Correct paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TRAIN_CSV = os.path.join(BASE_DIR, "..", "data", "processed", "train.csv")

print("📥 Loading training data:", TRAIN_CSV)
df = pd.read_csv(TRAIN_CSV)
print("Loaded:", df.shape)

reader = Reader(rating_scale=(0.5, 5.0))
data = Dataset.load_from_df(df[['userId', 'movieId', 'rating']], reader)

trainset, testset = train_test_split(data, test_size=0.2)

print("⚙️ Training SVD model...")
model = SVD(n_factors=100, n_epochs=20, verbose=True)
model.fit(trainset)

# Evaluate model
preds = model.test(testset)
rmse = accuracy.rmse(preds)
print(f"📊 RMSE: {rmse:.4f}")

# Save model
MODEL_PATH = os.path.join(BASE_DIR, "svd_model.pkl")
with open(MODEL_PATH, "wb") as f:
    
    pickle.dump(model, f)

print("💾 Model saved to:", MODEL_PATH)
