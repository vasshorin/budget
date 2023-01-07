import React from 'react'
import './main.css'
import { useState } from 'react'

const Main = () => {
    const [expenses, setExpenses] = useState([])
    const [expense, setExpense] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!expense || !amount || !date || !category) {
            alert('Please fill out all fields')
            return
        }
        if (edit) {
            setExpenses(
                expenses.map((item) => {
                    if (item.id === id) {
                        return { ...item, expense, amount, date, category }
                    }
                    return item
                })
            )
            setEdit(false)
        } else {
            const singleExpense = { id, expense, amount, date, category }
            setExpenses([...expenses, singleExpense])
        }
        setExpense('')
        setAmount('')
        setDate('')
        setCategory('')
        setId(id + 1)
    }

  return (
    <section className="data">
        <h1 className="title">Enter your expense information below</h1>
        <form className="form">
            <div className="form-control">
                <label htmlFor="text">Expense</label>
                <input type="text" id="text" placeholder="e.g. rent" />
                </div>
                <div className="form-control">
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" placeholder="e.g. 100" />
            </div>
            <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" placeholder="e.g. 01/01/2020" />
            </div>
            <div className="form-control">
                <label htmlFor="category">Category</label>
                <select name="category" id="category">
                    <option value="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="housing">Housing</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Fees</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="date">Importance</label>
                <input type="text" id="importance" placeholder="High" />
            </div>
            <button className="btn">Add Expense</button>
        </form>

        {/* Display entered information in one row below. Update when btn is pressed */}
        <div className="display">
            <h3>Expense</h3>
            <h3>Amount</h3>
            <h3>Date</h3>
            <h3>Category</h3>
            <h3>Importance</h3>
        </div>


    </section>

  )
}

export default Main