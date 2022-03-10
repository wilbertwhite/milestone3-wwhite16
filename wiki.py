import requests

S = requests.Session()


def getUrl(moviesQuery):

    BASE_URL = "https://en.wikipedia.org/w/api.php"

    params = {
        "action": "query",
        "format": "json",
        "titles": moviesQuery,
        "prop": "info",
        "inprop": "url",
    }

    response = S.get(url=BASE_URL, params=params)
    DATA = response.json()
    PAGES = DATA["query"]["pages"]

    for k, v in PAGES.items():
        url = v["fullurl"]
    return url
