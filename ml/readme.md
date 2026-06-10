Absolute Cinema ML

Machine Learning module used in the Absolute Cinema project.

The model recommends movies based on the genre selected by the user. It uses movie data preprocessing and similarity-based recommendation techniques to generate personalized suggestions.

Features
Genre Based Recommendations
Movie Dataset Processing
Recommendation Generation
REST API Integration with Spring Boot Backend
Technologies Used
Python
Pandas
NumPy
Scikit-learn
Flask
Running the Project

Install required packages:

pip install -r requirements.txt

Start the server:

python app.py

The API will start on:

http://localhost:5000
API Endpoint

Get movie recommendations:

GET /recommend?genre=Action

Example Response:

[
  {
    "title": "The Dark Knight",
    "rating": 9.0,
    "genre": "Action|Crime|Drama"
  }
]
Dataset

The recommendation system uses a movie dataset containing movie titles, genres and ratings.
