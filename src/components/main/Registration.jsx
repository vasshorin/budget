// import React, { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// const Registration = () => {
//     // State for the form values
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
  
//     // Handle form submission
//     const handleSubmit = (event) => {
//       event.preventDefault();
  
//       // Send a POST request to the server to create a new user
//       axios
//         .post("/users", {
//           email: email,
//           password: password,
//           name: name,
//         })
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };
  
//     return (
//       <div>
//         <h1>Expense Tracker</h1>
//         {/* Registration */}
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="text"
//             id="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//           <br />
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//           <br />
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//           />
//           <br />
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     );
//   };
  
// export default Registration