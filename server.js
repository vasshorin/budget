// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const MongoDBSession = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("./models/User");
const Expense = require("./models/Expenses");
const Category = require("./models/Category");
const Account = require("./models/Account");


const mongoURI =
  "mongodb+srv://testUser:testUser@cluster0.etygx.mongodb.net/new?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(bodyParser.json());


// Connect to the MongoDB database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  });


  // Create a session store
const store = new MongoDBSession({
  uri: mongoURI,
  collection: "mySessions",
});

app.use(session ({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: store
}))


// Middleware function to protect a route
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Create a new user
app.post("api/newUser", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });

  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(user);
    }
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  // Verify the email and password
  User.findOne({ email, password }, (error, user) => {
    if (error) {
      res.status(500).send(error);
    } else if (!user) {
      res.status(401).send("Email or password is incorrect");
    } else {
      // Set the session variable to indicate that the user is logged in
      req.session.user = user;
      // Redirect the user to the protected page
      res.redirect("/protected-page");
    }
  });
});

// Create a new expense
app.post("/newExpenses", (req, res) => {
  const expense = new Expense({
    date: req.body.date,
    comment: req.body.comment,
    amount: req.body.amount,
    importance: req.body.importance,
    account: req.body.account,
    category: req.body.category,
    user: req.body.userId,
  });

  expense.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expense);
    }
  });
});

// Add new category to category list
app.post("/newCategory", (req, res) => {
  const category = new Category({
    category: req.body.category,
  });

  category.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(category);
    }
  });
});

// Get all categories
app.get("/categories", (req, res) => {
  Category.find((error, categories) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(categories);
    }
  });
});

// Add new account to account list
app.post("/newAccount", (req, res) => {
  const account = new Account({
    account: req.body.account,
  });

  account.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(account);
    }
  });
});

// Get all accounts
app.get("/accounts", (req, res) => {
  Account.find((error, accounts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(accounts);
    }
  });
});

// Get a list of expenses for a user
app.get("/users/:userId/expenses", (req, res) => {
  Expense.find({ user: req.params.userId }, (error, expenses) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expenses);
    }
  });
});

// Get all expenses
app.get("/expenses", (req, res) => {
  Expense.find((error, expenses) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expenses);
    }
  });
});

// delete expense
app.post("/expenses/:id", (req, res) => {
  Expense.findByIdAndDelete(req.params.id, (error, expense) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expense);
    }
  });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Our app is running on port htpp://localhost:${PORT}`);
});
