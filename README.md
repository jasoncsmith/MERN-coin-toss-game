# This is a simple Coin Toss Game using a MERN stack

### Technologies Used
- MongoDb
- Mongoose
- Express
- React
- Node
- Redux
- JSON Web Tokens
- Typescript
- React Router
- MUI
- Axios

## About the Game
The game allows you to create an account or login with existing account
You will be given 100 tokens when you create your account. 

The game allows you to set a wager on the odds of a coin toss being 'heads' or 'tails'

If you win, you will receive a toast confirmation and the amount you wagered will be added to your account.

- If you win 3X in a row, you get 3X your wager added to your account.

- If you win 5X in a row, you get 10X your wager added to your account.

If at any time there is a loss or you have won 5 times in a row, your winning streak will be reset.

If you run out of tokens you will be presented a button to refill your account with 100 tokens.

You can only bet up to the amount of tokens you possess.

Your last 10 plays and winning streak will be displayed in the navbar.

## To Run this App

### Install Dependencies
From root directory run
### `npm run installDependencies` 

### DB
You will need to host a MongoDB locally or in the cloud.
Once established create a .env file in the backend dir and add the following fields:
### `PORT=5000`
### `MONGODB_URL="{{MongoDb connection URI}}"`
### `SECRET_KEY="{{Your uuid for the JWT}}"`

### To Serve
In Root directory open 2 terminals.
Run in terminal 1:
### `npm run start:client`

Run in terminal 2:
### `npm run start:backend`

This will run the app locally on your computer on port 3000 and serve the backend on port 5000.

Navigate to http://localhost:3000/

![Image of Game](./game-ss.jpg?raw=true)
