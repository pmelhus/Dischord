# Dischord

## Dischord at a Glance

Dischord is a full stack application intended for musicians and other creatives to network, communicate, and connect. Users can create profiles, servers, and channels. They're able to live message one another on a server given that the other user is a member of that server.  There is a Demo User available to browse all of the logged in features.




## <a href='https://my-dischord.herokuapp.com/'>Dischord Live Demo </a>

### <a href='https://github.com/brianmay2014/debonairbnb/wiki'>Git Wiki</a>
<br>

## **_Splash Page_**

<img width="2560" alt="Screen Shot 2022-06-20 at 12 23 07 AM" src="https://user-images.githubusercontent.com/97479364/174534285-ecf26c56-05fd-4faf-9442-b424e5c39159.png">

<br>

## **_Login Page_**

<img width="1792" alt="Screen Shot 2022-06-20 at 12 31 51 AM" src="https://user-images.githubusercontent.com/97479364/174534397-f5ed6b94-0caa-4816-a3e6-e66ec50499de.png">

<br>

## **_Signup Page_**

<img width="1914" alt="Screen Shot 2022-06-20 at 12 31 36 AM" src="https://user-images.githubusercontent.com/97479364/174534436-04e32224-045b-4db0-812b-6744a03353fb.png">


<br>

## **_Home chat Page_**

<img width="2560" alt="Screen Shot 2022-06-20 at 12 23 57 AM" src="https://user-images.githubusercontent.com/97479364/174534492-a69a27f2-cf99-49ed-9ae8-86810fa39d06.png">

<br>

## **_Server Page_**

<img width="2560" alt="Screen Shot 2022-06-20 at 12 25 02 AM" src="https://user-images.githubusercontent.com/97479364/174534558-84a7b6e3-60a6-4616-bd3c-0b5ce1768f74.png">

<br>

## Features
- Logged in users can:
  - Sign up / login with email.
  - Users can create, edit, and delete their servers, channels, and live messages
  - Update their profile and servers with a personal avatar

## Getting Development Environment Up And Running
- Git Clone the repo to your local machine (latest main branch repo)
- Install Dependencies:
  - While inside `/app` Run:

         pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

  - While inside `/react-app` Run

         npm install

- Create a '.env' file that mirrors the '.env.example' file
- Create a user in your local postgreSQL database according to the .env file
- Get into the virtual environment, migrate and seed your data base



         pipenv shell
         flask db upgrade
         flask seed all


- Start servers:
  - While inside `/app` Run `pipenv shell` to get inside the virtual environment then run `flask run` to get the backend server running.
  - While inside `/react-app` Run `npm start`
- Enjoy.

## Heroku Deployment
1. Create a Heroku account if you don't have one already
2. Create a new application in the dashboard, for example "my-dischord"
3. Under the "Resources" tab, click "Find More add-ons", and add "Heroku Postgres"
4. Install <a href='https://devcenter.heroku.com/articles/heroku-cli'>Heroku CLI</a>
5. Login to Heroku by running this in the terminal `heroku login`
6. When you're logged in, run `heroku authorizations:create`, and copy the GUID value for the Token key.
7. The repo is set up with Github Actions, you'll need to set up two environment variables set up in your repo settings -> secrets -> actions. Click "New repository secret" to create these two variables:
   - `HEROKU_API_KEY` => set equal to the auth token from step 6.
   - `HEROKU_APP_NAME` => set equal to the Heroku app name you gave in step 2.
8. Back in Heroku, inside the "Settings" page of your newly created app, click on "Reveal Config Vars", and add the variables from the .env file for Heroku.
9. Whenever you push to the main branch, your Docker image will deploy the application to Heroku.
10. To seed the Heroku database, run `heroku run -a HEROKU_APP_NAME flask seed all`


## Application Architecture

Dischord is built on React and Redux in the frontend with a Flask backend, using PostgreSQL as a database.

## Frontend Overview

Dischord depends on backend for queries and routes, but uses the Redux store and React components for a snappy frontend.

<br>

### Frontend Technologies Used

#### React

Web pages of Dischord are rendered using React components. It creates dynamic reusable content, with quick DOM manipulation for fast re-rendering. Used React to build JSX elements.

#### Redux

Dischord uses Redux throughout to make limited backend calls for each page, and uses the Redux store to make re-renders quick whenever the store updates.

#### CSS

Dischord uses CSS to style all of the HTML documents.

#### Javascript

Javascript is used on the frontend with React and Redux to create a responsive app.

<br>

### Backend Overview

#### Flask

The back-end server of Dischord is set up using Flask with Python.

Dischord uses a Flask back-end server with PostgreSQL database. Dischord also implemented features to protect user's password and information.


#### WTForms

WTForms is utilized for back-end validation for all forms on the app.

#### PostgreSQL

Dischord relies on PostgreSQL to maintain its relational database.

<br>

## Challenges and Solutions

- Socket IO
  - Understanding the dataflow of Socket IO took some time and effort. After getting a better grasp of how the data flows from the front to backend let me successfully implement the live chat feature in the application.

## Conclusion and Next Steps

- The next step for Dischord is to add a friends feature, direct messaging, and implement voice chat.
- The long term goal of Dischord is to implement low-latency server voice chats so that musicians can play together in real time.
<br>
<br>
For any questions about any instructions, features, or any requested features, send me an e-mail at <a href='mailto:pmelhus@gmail.com'>pmelhus@gmail.com</a>, and I'll get back to you as quick as I can!

Thanks,
Paul Melhus
