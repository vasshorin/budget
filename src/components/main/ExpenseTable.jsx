import React from 'react';

const ExpenseTable = ({ expenses }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Comment</th>
          <th>Amount</th>
          <th>Importance</th>
          <th>Account</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{expense.date}</td>
            <td>{expense.comment}</td>
            <td>{expense.amount}</td>
            <td>{expense.importance}</td>
            <td>{expense.account}</td>
            <td>{expense.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;