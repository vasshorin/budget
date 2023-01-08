import React, { useState } from "react";
import { useEffect } from "react";
import axiosConfig from "./components/main/axiosConfig";
import "./App.css";

const App = () => {
  // State for the form values
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState("");
  const [importance, setImportance] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [id, setId] = useState("");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to the server to create a new expense
    axiosConfig
      .post("/newExpenses", {
        // Set id to the previous id + 1
        id: id + 1,
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
        // Add the new expense to the list of expenses in the state
        setExpenses([...expenses, response.data]);
        // Set the id to the previous id + 1, if id is 0, set it to 1 instead of 0, else set it to the previous id + 1
        setId(id === 0 ? 1 : id + 1);
        setDate("");
        setComment("");
        setAmount("");
        setImportance("");
        setAccount("");
        setCategory("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch the expenses from the server when the component mounts
  useEffect(() => {
    axiosConfig
      .get("/expenses")
      .then((response) => {
        //  setExpenses(response.data);
        setExpenses([
          ...response.data,
          {
            date: date,
            comment: comment,
            amount: amount,
            importance: importance,
            account: account,
            category: category,
            userId: userId,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Delete an expense from the server and update the list of expenses in the state when the user clicks the delete button for an expense
  const handleDelete = (id) => {
    axiosConfig.post(`/expenses/${id}`).then((response) => {
      const newExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(newExpenses);
    });
  };

  const filterExpenses = (event) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.importance === event.target.value
    );
    setExpenses(filteredExpenses);
  };

  const filterBYCategory = (event) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.category === event.target.value
    );
    setExpenses(filteredExpenses);
  };


  return (
    <div>
      <h1>Expense Tracker</h1>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          onClick={() => setImportance("")}
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
        <select
          id="importance"
          value={importance}
          required={true}
          onChange={(event) => setImportance(event.target.value)}
        >
          {/* Make a default value first  */}
          <option value="">Select an importance</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
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
          required={true}
          onChange={(event) => setCategory(event.target.value)}
        >
          {/* Make a default value first  */}
          <option value="">Select a category</option>
          <option value="rent">Rent</option>
          <option value="grocery">Grocery</option>
          <option value="dining">Dining</option>
          <option value="fees">Fees</option>
        </select>
        <br />
        <br />
        <br />
        {/* Submit button on click reset all of the fields */}
        <button type="submit" onClick={() => setDate("")}>
          Submit
        </button>
      </form>

      <h2>Filter Expenses</h2>
      <select onChange={filterExpenses}>
        <input
          type="text"
          value={importance}
          onChange={(event) => setImportance(event.target.value)}
        />
        <option value="">Select an importance</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select onChange={filterBYCategory}>
        <input

          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <option value="">Select a category</option>
        <option value="rent">Rent</option>
        <option value="grocery">Grocery</option>
        <option value="dining">Dining</option>
        <option value="fees">Fees</option>
      </select>
      
      {/* Display the expenses */}
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Comment</th>
            <th>Amount</th>
            <th>Account</th>
            <th>Category</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.date}</td>
              <td>{expense.comment}</td>
              <td>${expense.amount}</td>
              <td>{expense.account}</td>
              <td>{expense.category}</td>
              <td>{expense.importance}</td>
              <td>
                {/* Delete button */}
                <button onClick={() => handleDelete(expense._id)}>
                  Delete
                </button>
                {/* Edit buttons */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
