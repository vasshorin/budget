import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AppRouter from "./components/main/AppRouter";



const App = () => {
 // State for the form values
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [name, setName] = useState("");
 const [date, setDate] = useState("");
 const [comment, setComment] = useState("");
 const [amount, setAmount] = useState("");
 const [importance, setImportance] = useState("");
 const [account, setAccount] = useState("");
 const [category, setCategory] = useState("");
 const [userId, setUserId] = useState("");
 const [expenses, setExpenses] = useState([]);

 // Handle form submission
 const handleSubmit = (event) => {
   event.preventDefault();

   // Send a POST request to the server to create a new user
   axios
     .post("/users", {
       email: email,
       password: password,
       name: name,
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });

   // Send a POST request to the server to create a new expense
   axios
     .post("/expenses", {
       date: date,
       comment: comment,
       amount: amount,
       importance: importance,
       account: account,
       category: category,
       userId: userId,
     })
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
 };

 // Fetch the expenses from the server when the component mounts
 useEffect(() => {
   axios
     .get("/users/:userId/expenses")
     .then((response) => {
       setExpenses(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
 }, []);

 return (
   <div>
     <h1>Expense Tracker</h1>
     {/* Registration */}
     {/* <h2>Register</h2>
     <form onSubmit={handleSubmit}>
       <label htmlFor="email">Email:</label>
       <input
         type="text"
         id="email"
         value={email}
         onChange={(event) => setEmail(event.target.value)}
       />
       <br />
       <label htmlFor="password">Password:</label>
       <input
         type="password"
         id="password"
         value={password}
         onChange={(event) => setPassword(event.target.value)}
       />
       <br />
       <label htmlFor="name">Name:</label>
       <input
         type="text"
         id="name"
         value={name}
         onChange={(event) => setName(event.target.value)}
       />
       <br />
       <button type="submit">Register</button>
     </form> */}

     {/* Expense */}
     <h2>Add Expense</h2>
     <form onSubmit={handleSubmit}>
       <label htmlFor="date">Date:</label>
       <input
         type="date"
         id="date"
         value={date}
         onChange={(event) => setDate(event.target.value)}
       />
       <br />
       <label htmlFor="comment">Comment:</label>
       <input
         type="text"
         id="comment"
         value={comment}
         onChange={(event) => setComment(event.target.value)}
       />
       <br />
       <label htmlFor="amount">Amount:</label>
       <input
         type="number"
         id="amount"
         value={amount}
         onChange={(event) => setAmount(event.target.value)}
       />
       <br />
       <label htmlFor="importance">Importance:</label>
       <input
         type="text"
         id="importance"
         value={importance}
         onChange={(event) => setImportance(event.target.value)}
       />
       <br />
       <label htmlFor="account">Account:</label>
       <input
         type="text"
         id="account"
         value={account}
         onChange={(event) => setAccount(event.target.value)}
       />
       <br />
       <label htmlFor="category">Category:</label>
       <select
         id="category"
         value={category}
         onChange={(event) => setCategory(event.target.value)}
       >
         <option value="rent">Rent</option>
         <option value="grocery">Grocery</option>
         <option value="dining">Dining</option>
         <option value="fees">Fees</option>
       </select>
       <br />
       <button type="submit">Add Expense</button>
     </form>
     <h2>Expenses</h2>
     <ul>
       {expenses.map((expense) => (
         <li key={expense._id}>
           {expense.date} - {expense.comment} - {expense.amount}
         </li>
       ))}
     </ul>
   </div>
 );
};

export default App;
