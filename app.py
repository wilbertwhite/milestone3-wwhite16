import os
import tmdb
import wiki
import random
from flask import (
    Flask,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    Blueprint,
    jsonify,
)
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask_login import (
    UserMixin,
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

load_dotenv(find_dotenv())

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
if app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    comment = db.Column(db.String(120))
    rating = db.Column(db.String(20))
    movie = db.Column(db.String(20))


db.create_all()

login_manager = LoginManager()
login_manager.login_view = "handle_login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
def login():
    return render_template("login.html")


@app.route("/handle_login", methods=["POST"])
def handle_login():
    data = request.form
    username = data["username"]
    user = User.query.filter_by(username=username).first()

    if not user:
        flash("Incorrect username... >:(", category="error")
        return redirect(url_for("login"))
    else:
        login_user(user)
        return redirect(url_for("home"))


@app.route("/signup")
def signup():
    return render_template("signup.html")


@app.route("/handle_signup", methods=["POST"])
def handle_signup():
    data = request.form
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if len(username) < 6:
        flash(
            "Username must be at least 6 characters in length... >:(", category="error"
        )
        return redirect(url_for("signup"))
    elif user:
        flash("Username already in use... >:(", category="error")
        return redirect(url_for("signup"))
    else:
        new_user = User(username=username)
        db.session.add(new_user)
        db.session.commit()
        flash("Successfully registered! :)", category="success")
        return redirect(url_for("login"))


@app.route("/home")
@login_required
def home():
    r = random.randrange(0, 3, 1)
    movies = ["508442", "680", "68718"]
    movieNames = ["Soul_(2020_film)", "Pulp_Fiction", "Django_Unchained"]

    url = wiki.getUrl(movieNames[r])
    movieInfo = tmdb.getMovieInfo(movies[r])

    reviews = Review.query.filter_by(movie=movieInfo["title"]).all()

    return render_template(
        "home.html",
        reviews=reviews,
        len_reviews=len(reviews),
        len=len(movieInfo["genres"]),
        username=current_user.username,
        title=movieInfo["title"],
        genres=movieInfo["genres"],
        tagline=movieInfo["tagline"],
        poster=movieInfo["poster"],
        url=url,
    )


@app.route("/handle_review", methods=["POST"])
@login_required
def handle_review():
    data = request.form
    comment = data["comment"]
    rating = data["rating"]
    movie = data["movie"]
    username = current_user.username

    if not comment and not rating:
        flash("Review can't be empty... >:(", category="error")
        return redirect(url_for("home"))

    if rating:
        if int(rating) < 0 | int(rating) > 10:
            flash("Rating must be a number from 0 to 10... >:(", category="error")
            return redirect(url_for("home"))

    new_review = Review(username=username, comment=comment, rating=rating, movie=movie)
    db.session.add(new_review)
    db.session.commit()
    flash("Review posted successfully! :)", category="success")
    return redirect(url_for("home"))


@app.route("/user_reviews")
@login_required
def user_reviews():
    username = current_user.username
    reviewQuery = Review.query.filter_by(username=username).all()
    reviews = []
    for review in reviewQuery:
        reviews.append(
            {
                "id": review.id,
                "rating": review.rating,
                "comment": review.comment,
                "movie": review.movie,
            }
        )
    return jsonify(reviews)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash("Successfully logged out! :)", category="success")
    return redirect(url_for("login"))


# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/literallyinsane")
def index():
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return render_template("index.html")


@bp.route("/handle_user_reviews", methods=["GET", "POST"])
@login_required
def handle_user_reviews():
    data = request.get_json()
    return ""


app.register_blueprint(bp)


app.run(
    debug=True,
    host="0.0.0.0",
    port=int(os.getenv("PORT", 8080)),
)
