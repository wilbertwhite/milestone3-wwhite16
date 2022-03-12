# Technologies Used
  * os

   Used to utilize the dotenv module  
  * flask

   A microframework used to develop on the web
  * random

   Used to randomlly pick what is displayed
  * dotenv

   Used to allow for hidden files that contain sensitive info
  * MediaWiki Action API

   Used to dynamically create a link to wikipedia
  * TMDB API

   Used to dynamically pull movie information and posters
  * requests
  
   Used to make calls to APIs
  * flask_sqlalchemy

   Used to allow database functionality
  * flask_login

   Allows for authentication and tracks user sessions
  * react/node

   A JavaScript library for creating complex UI

# Getting set up on a fork

## Install Requirements
# If any of the below don't work, you can try
- adding "sudo" in front of the command
- switching "pip" for "pip3"

# WSL

## Python
```
sudo apt-get update  # update your installer so the Pip installation works
sudo apt install python3-pip  # install pip, which manages python packages
pip3 install flask
pip3 install requests
pip3 install python-dotenv
```

## Heroku
`sudo curl https://cli-assets.heroku.com/install.sh | sh   # install Heroku`

Create a free account on Heroku: https://signup.heroku.com/login

## PostgreSQL setup
```
sudo apt install postgresql
sudo service postgresql start
sudo -u postgres psql  # just testing that psql is installed. You should get an interactive prompt. Quit by entering "\q"
pip3 install psycopg2-binary
pip3 install Flask-SQLAlchemy==2.1
```

## React/Node
```
sudo apt update
sudo apt install npm
npx create-react-app my-first-app  # this will install the create-react-app tool
```
If you get an error about your node version being out of date, try
```
sudo npm install -g n
sudo n latest
```

# Mac

## Python
```
python3 -m ensurepip --upgrade  # install pip, which manages python packages
pip3 install flask
pip3 install requests
pip3 install python-dotenv
```

## Heroku
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)  # install Homebrew
brew tap heroku/brew && brew install heroku  # install Heroku CLI
```

Create a free account on Heroku: https://signup.heroku.com/login

## PostgreSQL setup
```
brew install postgresql
brew services start postgresql
psql -h localhost  # this is just to test out that postgresql is installed okay - type "\q" to quit
# if the above command gives you an error like "database <user> does not exist," try the workaround in this link: https://stackoverflow.com/questions/17633422/psql-fatal-database-user-does-not-exist
pip3 install psycopg2-binary
pip3 install Flask-SQLAlchemy==2.1
```

## React/Node
```
brew update
brew install node
npx create-react-app my-first-app  # this will install the create-react-app tool
```

## Create a TMDB account
3. Sign up for TMDB Account here: https://www.themoviedb.org/
4. Go to your account settings and go to API
5. Copy your API Key

## Setup
6. Create `.env` file in your project directory
7. In your .env file, add the following lines:
```
TMDB_KEY="<YOUR KEY>"
DATABASE_URL="<DATABASE URL>"
SECRET_KEY="<SECRET KEY>"
```

## Run Application
8. Run command in terminal `python app.py`
9. Preview web page in browser '/'

## Run Heroku App
10. Install Heroku CLI: 

For WSL users, run `sudo curl https://cli-assets.heroku.com/install.sh | sh`. 

For Mac users, run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` if you don't have Homebrew installed, then `brew tap heroku/brew && brew install heroku`. 

This could take a few minutes. In the meantime...

11. Create a free account on Heroku https://signup.heroku.com/login
12. In the project folder, there's a `requirements.txt` file with all your non-standard dependencies, separated by a newline. In our case, they are `Flask` w/ a capital F, `requests`, `python-dotenv`, `Flask-SQLAlchemy`, `flask_login`, `psycopg2-binary`, and `postgresql`. Add any as you see fit.
13. There's also `Procfile`, which has the command that Heroku will use to run your app: `web: python app.py` (see documentation https://devcenter.heroku.com/articles/getting-started-with-python#define-a-procfile)
14. Add + commit all changed files with git
15. Log in to Heroku: `heroku login -i`
16. Create a new Heroku app: `heroku create`. This will create a new URL and associated host for you.
17. Push your code to Heroku: `git push heroku main`. This actually pushes your code to Heroku's remote repository.

You may get an error at this point relating to a buildpack. That means that Heroku can't figure out on its own what primary language your code is written in. You should be able to resolve this with `heroku buildpacks:set heroku/python`.

18. Go to https://dashboard.heroku.com/apps and click your App, then go to Settings, and click "Reveal Config Vars"
19. Add your secret key from `.env` with the matching variable name (`TMDB_KEY`) and value (your key, without quotation marks!)
20. Run `heroku open`. You can find the original project here: https://radiant-waters-80121.herokuapp.com/

# Technical Issues & Problems
For me, this whole project was a series of technical issues, which is natural, since I'm not very strong with JS/React. I'm much more comfortable when it comes to flask and jinja. But yeah, every step was a struggle really and I felt like I was learning a lot on the fly. I didn't know how 'useEffect()' worked (still don't) so I struggled to display the data from my API. By far the hardest thing to wrap my head around was finding a good way to make comments editable with a text field. I could make a button alter the data but I just couldn't find a way to make a text field work correctly. The farthest I got was being able to type in a single letter into a text field and it would refresh the page and I wouldn't be able to type anymore. It was also an extreme pain to look through documentation/stackoverflow posts because 90% of them were using some different react or something. I still don't know how 'this.state' actually applies to a functional component. I'd say I learned a lot about react in this project because I had to log upwards of 15 hours of reading documentation and coding it over the past 3 days, so I'm more comfortable with it than 3 days ago, but it's also very clear to me that I know nothing at all about react.