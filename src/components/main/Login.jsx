// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'


// const Login = () => {
// const [email, setEmail] = useState('')
// const [password, setPassword] = useState('')
// const [error, setError] = useState('')
// const [loading, setLoading] = useState(false)

// const login = (event) => {
//     event.preventDefault()
//     setLoading(true)
//     axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password
//     })
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })
//     setLoading(false)
// }
    
//   return (
//     <div>
//         <h1>Login</h1>
//         <form onSubmit={login}>
//         <input 
//         type="email" 
//         placeholder="Username" 
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//         />
//         <input 
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         />
//         <button onClick={login}>Login</button>
//         </form>

//     </div>
//   )
// }

// export default Login