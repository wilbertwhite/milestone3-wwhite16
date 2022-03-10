import os
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your API keys from .env

BASE_MOVIE_URL = "https://api.themoviedb.org/3/movie/"


def getMovieInfo(movie_id):

    movie_url = BASE_MOVIE_URL + movie_id

    movieParams = {
        "api_key": os.getenv("TMDB_KEY"),
    }

    movieResponse = requests.get(movie_url, params=movieParams).json()

    title = movieResponse["title"]

    genres = []
    for i in range(0, len(movieResponse["genres"])):
        genres.append(movieResponse["genres"][i]["name"])

    tagline = movieResponse["tagline"]

    CONFIG_URL = "https://api.themoviedb.org/3/configuration"
    configParams = {
        "api_key": os.getenv("TMDB_KEY"),
    }
    configResponse = requests.get(CONFIG_URL, params=configParams).json()["images"]
    base_url = configResponse["base_url"]
    size = configResponse["poster_sizes"][3]
    file_path = movieResponse["poster_path"]

    poster = base_url + size + file_path

    movieInfo = {
        "title": title,
        "genres": genres,
        "tagline": tagline,
        "poster": poster,
    }

    return movieInfo
