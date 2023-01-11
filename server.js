// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");
const saltRounds = 10;


// const User = require("./src/models/user.model");
// const Expense = require("./models/expenses.model");
// const Category = require("./models/Category");
// const Account = require("./models/Account");


const mongoURI =
  "mongodb+srv://testUser:testUser@cluster0.etygx.mongodb.net/new?retryWrites=true&w=majority";

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3003'}));
// app.use(bodyParser.json());
app.use(express.json());


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


// User schema
const userSchema = new mongoose.Schema({
  user: String,
  pwd: String,
  // An array of categories
  category: [
    {
      category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"}
    },
  ],
  // An array of accounts
  accounts: [
    {
      account: { type: mongoose.Schema.Types.ObjectId, ref: "Account"}
    },
  ],
  // An array of expenses
  expenses: [
    {
   expense:  { type: mongoose.Schema.Types.ObjectId, ref: "Expense" },
    },
  ],
});

// User model
const User = mongoose.model("User", userSchema);

// Expenses model
const expenseSchema = new mongoose.Schema({
  id: Number,
  date: String,
  comment: String,
  amount: Number,
  importance: String,
  account: String,
  category: String
});

const Expense = mongoose.model("Expense", expenseSchema);

// Category model
const categorySchema = new mongoose.Schema({
  category: String,
});

const Category = mongoose.model("Category", categorySchema);

// Account model
const accountSchema = new mongoose.Schema({
  account: String,
});

const Account = mongoose.model("Account", accountSchema);


// Middleware function to protect a route
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Create a new user
app.post("/register", (req, res) => {
  console.log(req.body)
  const user = new User({
    user: req.body.user,
    pwd: req.body.pwd,
    account: req.body.account,
    category: req.body.category,
    expenses: req.body.expenses
  });
  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log("User created");
      console.log(user);
      res.send(user)
    }
  });
});

// Login routen
app.post("/auth", (req, res) => {
  const { user, pwd } = req.body;
  
  // Verify the username and password
  User.findOne({ user, pwd }, (error, user) => {
    if (error) {
      res.status(500).send(error);
    } else if (!user) {
      res.status(401).send("username or password is incorrect");
    } else {
      // Set the session variable to indicate that the user is logged in
      req.session.user = user;
      console.log("Success " +  req.session.user)

      // Redirect the user to the protected page
      // res.redirect("/expenses");
    }
  });
});

// Create a new expense for a user
app.post("/users/:userId/newExpense", (req, res) => {
  const expense = new Expense({
    id: req.body.id,
    date: req.body.date,
    comment: req.body.comment,
    amount: req.body.amount,
    importance: req.body.importance,
    account: req.body.account,
    category: req.body.category,
  });

  expense.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expense);
    }
  });
});

// Get all expenses for a user
app.get("/users/:userId/expenses", (req, res) => {
  Expense.find((error, expenses) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expenses);
    }
  });
});


// // Get a list of expenses for a user
// app.get("/users/:userId/expenses", (req, res) => {
//   Expense.find({ user: req.params.userId }, (error, expenses) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.send(expenses);
//     }
//   });
// });







const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log("###################################################");
  console.log(`Our app is running on port htpp://localhost:${PORT}`);
  console.log("###################################################")
});
