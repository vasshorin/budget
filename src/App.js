import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axiosConfig from "./components/main/axiosConfig";
import "./App.css";

const App = () => {
  // State for the form values
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState("");
  const [importance, setImportance] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [id, setId] = useState("");
  const [newOption, setNewOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");


  // Sort date 
  const sortByDate = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
      setExpenses(
        expenses.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
      );
    } else {
      setSortOrder("asc");
      setExpenses(
        expenses.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
    }
  };
  
  // Sort amount
  const sortByAmount = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
      setExpenses(
        expenses.sort((a, b) => {
          return a.amount - b.amount;
        })
      );
    } else {
      setSortOrder("asc");
      setExpenses(
        expenses.sort((a, b) => {
          return b.amount - a.amount;
        })
      );
    }
  };
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to the server to create a new expense
    axiosConfig
      .post("/newExpenses", {
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
        setExpenses([response.data,...expenses]);
        // Set the id to the previous id + 1, if id is 0, set it to 1 instead of 0, else set it to the previous id + 1
        setId(id === 0 ? 1 : id + 1);
        setDate("");
        setComment("");
        setAmount("");
        setImportance("");
        setAccount("");
        setCategory("");
        setUserId("");
        // Update the total expenses
        setTotalExpenses({
          ...totalExpenses,
          [response.data.category]: totalExpenses[response.data.category]
            ? totalExpenses[response.data.category] + response.data.amount
            : response.data.amount,
        });

      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Let the user add a new option to the select elemen
  const handleSubmit1 = (event) => {
    event.preventDefault();
    setNewOption("");
  };

  // Handle form input changes
  const handleChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleChange1 = (event) => {
    setNewAccount(event.target.value);
  };

  // Total expenses
  useEffect(() => {
    axiosConfig
      .get("/expenses")
      .then((response) => {
        const categoryTotals = {};
        response.data.forEach((expense) => {
          if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
          } else {
            categoryTotals[expense.category] = expense.amount;
          }
        });
        setTotalExpenses(categoryTotals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  // Fetch the expenses from the server when the component mounts
  useEffect(() => {
    axiosConfig
      .get("/expenses")
      .then((response) => {
        setExpenses([
          ...response.data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          }),
        ]);
        setId(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Fetch the categories from the server when the component mounts
  useEffect(() => {
    axiosConfig
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

// Add new category
  const addCategory = (event) => {
    event.preventDefault();
    axiosConfig
      .post("/newCategory", {
        category: newOption,
      })
      .then((response) => {
        console.log(response.data);
        setCategories([...categories, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add new account
  const addAccount = (event) => {
    event.preventDefault();
    axiosConfig
      .post("/newAccount", {
        account: newAccount,
      })
      .then((response) => {
        console.log(response.data);
        setAccounts([...accounts, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch all accounts from the server when the component mounts
  useEffect(() => {
    axiosConfig
      .get("/accounts")
      .then((response) => {
        setAccounts(response.data);
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
      // Update the total expenses
      setTotalExpenses({
        ...totalExpenses,
        [response.data.category]: totalExpenses[response.data.category]
          ? totalExpenses[response.data.category] - response.data.amount
          : 0,
      });

    });
  };
  // Filter expenses by importance 
  const filterExpenses = (event) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.importance === event.target.value
    );
    setExpenses(filteredExpenses);
  };
  // Filter expenses by account
  const filterBYCategory = (event) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.category === event.target.value
    );
    setExpenses(filteredExpenses);
  };


  return (
    <div>
      <h1>Expense Tracker</h1>
      {/* Add new category */}
      <h2>Add new category</h2>
      <form onSubmit={handleSubmit1}>
        <label htmlFor="newOption">New Category:</label>
        <input
          type="text"
          id="newOption"
          value={newOption}
          onChange={handleChange}
        />
        <button type="submit" onClick={addCategory}> Add Category</button>
      </form>

{/* Add new account */}
      <h2>Add new account</h2>
      <form onSubmit={handleSubmit1}>
        <label htmlFor="newAccount">New Account:</label>
        <input
          type="text"
          id="newAccount"
          value={newAccount}
          onChange={handleChange1}
        />
        <button type="submit" onClick={addAccount}> Add Account</button>
      </form>


      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
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
        <select
          id="account"
          value={account}
          required={true}
          onChange={(event) => setAccount(event.target.value)}
        >
          {/* Make a default value first  */}
          <option value="">Select an account</option>
          {accounts.map((account) => (
            <option key={account._id} value={account.account}>
              {account.account}
            </option>
          ))}
        </select>
  
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
          {categories.map((category) => (
            <option key={category._id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <button type="submit">
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
        {categories.map((category) => (
          // If default value is chosen, display all expenses
          < option key={category._id} value={category.category}>
            {category.category}
          </option>
        ))}
      
      </select>

      {/* Display the expenses last one entered should be on top*/}
      <h2>Expenses</h2>

      <table>
        <thead>
          <tr>
            <th onClick={sortByDate}>Date</th>
            <th>Comment</th>
            <th onClick={sortByAmount}>Amount</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display total expenses for each category per custom date range */}
       <h2>Total Expenses</h2>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(totalExpenses).map(([category, total]) => (
          <tr>
            <td>{category}</td>
            <td>${total}</td>
          </tr>
        ))}
      
        </tbody>
      </table>

    </div>
  );
};

export default App;