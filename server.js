// server.js

const express = require('express');
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://testUser:testUser@cluster0.etygx.mongodb.net/new?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Fix headers that are sent to the client after they are sent
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.header('Access-Control-Allow-Credentials', true); // If needed
    next();
});


app.use(bodyParser.json());
// Placeholder %PUBLIC_URL% for the public folder
app.use(express.static(__dirname + '/public'));

// Connect to the MongoDB database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to database!");
});

// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }]
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Define the expense schema
const expenseSchema = new mongoose.Schema({
  date: Date,
  comment: String,
  amount: Number,
  importance: String,
  account: String,
  category: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Create the Expense model
const Expense = mongoose.model('Expense', expenseSchema);

// Create a new user
app.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });

  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(user);
    }
  });
});

// Create a new expense
app.post('/expenses', (req, res) => {
  const expense = new Expense({
    date: req.body.date,
    comment: req.body.comment,
    amount: req.body.amount,
    importance: req.body.importance,
    account: req.body.account,
    category: req.body.category,
    user: req.body.userId
  });

  expense.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expense);
    }
  });
});

// Get a list of expenses for a user
app.get('/users/:userId/expenses', (req, res) => {
  Expense.find({ user: req.params.userId }, (error, expenses) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expenses);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
