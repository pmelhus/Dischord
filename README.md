# Dischord

## Dischord at a Glance

Dischord is a full stack application intended for musicians and other creatives to network, communicate, and connect. Users can create profiles, servers, channels in servers, friend requests, and server invitations. Through the implementation of Socket.IO, users can also send live messages to server chat rooms or directly message their friends. With the use of Slate-React, when users type in a link that leads to either a youtube video or image, the image will render in the respective chat room. I have also created a "Friend Suggestion" feature where the current user will be connected with the mutual friends of all of their current friends in their friend list (the suggestions appear in order of highest frequency of mutuality between current friends). There is a Demo User available to browse all of the logged in features.




## <a href='https://my-dischord.herokuapp.com/'>Dischord Live Demo </a>

### <a href='https://github.com/brianmay2014/debonairbnb/wiki'>Git Wiki</a>
<br>

## **_Splash Page_**

<img width="2560" alt="Screen Shot 2022-06-20 at 12 23 07 AM" src="https://user-images.githubusercontent.com/97479364/174534285-ecf26c56-05fd-4faf-9442-b424e5c39159.png">

<br>

## **_Login Page_**

![signin-dischord](https://user-images.githubusercontent.com/97479364/226231256-dc8fcc1a-5ae2-40be-834f-653937983fcd.png)

<br>

## **_Signup Page_**

![signup-dischord](https://user-images.githubusercontent.com/97479364/226231285-691549d2-b92b-407c-ba65-a5fc031f1115.png)

<br>

## **_Friends Page_**

![friends-dischord](https://user-images.githubusercontent.com/97479364/226231413-b708e447-99bb-418d-9de3-a116a4213a5a.png)


<br>

## **_Server Page_**

![server-dischord](https://user-images.githubusercontent.com/97479364/226231478-6b3d024c-2d59-4070-9dc9-b956dcc2ce56.png)

<br>

## **_Direct Message Page_**

![dm-page-dischord](https://user-images.githubusercontent.com/97479364/226231573-5505d332-5a6f-4370-bf3e-d643eb0ffb3e.png)

<br>

## **_User Settings Page_**

![user-settings-dischord](https://user-images.githubusercontent.com/97479364/226231645-1a68f6a9-1412-4ffb-bd00-476cd5722c7c.png)

<br>

## Features
- Logged in users can:
  - Sign up / login with email.
  - Create, edit, and delete their servers and channels
  - Update their profile and servers with a personal avatar
  - Send friend requests to other users using their username
  - See a list of friend suggestions based on the mutuality of the friends of their own friends
  - Invite friends from their friend list to a server
  - Send live messages to a server or directly to one of their friends
  - See images and youtube videos rendered in the chat room once a message with the corresponding link has been sent

- Friend Recommendations

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
  - Understanding the dataflow of Socket IO took some time and effort. After getting a better grasp of how the data flows from the front to the backend, I was able to successfully implement the live chat feature in the application.
- Slate-React
  - Rendering messages via Slate and rendering images and videos based on links in the message was challenging. Slate has a special way of rendering text as nodes so understanding the different types of nodes and how they related to the text editor was crucial to it's implementation. Controlling the way they were rendering (transformed) required extensive reading into the documentation.

## Conclusion and Next Steps

- The next step for Dischord are to implement voice chat and let users explore other public servers.
- The long term goal of Dischord is to implement low-latency server voice chats so that musicians can play together in real time.
<br>
<br>
For any questions about any instructions, features, or any requested features, send me an e-mail at <a href='mailto:pmelhus@gmail.com'>pmelhus@gmail.com</a>, and I'll get back to you as quick as I can!

Thanks,
Paul Melhus
