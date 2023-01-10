import React from "react";
import { useRef, useState, useEffect } from "react";
import "./register.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faCommentsDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axiosConfig from '../../routes/axiosConfig'


const USER_REGEX = /^[a-zA-Z0-9]{3,23}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{6,23}$/;
const REGISTER_URL = "/register"

const RegistrationForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const valid = USER_REGEX.test(user);
    console.log(valid);
    console.log(user);
    setValidName(valid);
  }, [user]);

  useEffect(() => {
    const valid = PASSWORD_REGEX.test(pwd);
    console.log(valid);
    console.log(pwd);
    setValidPwd(valid);
    const match = pwd === matchPwd;
    console.log(match);
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // hacking
    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid username or password.");
      errRef.current.focus();
      return;
    }
    console.log(user, pwd);
    try {
      const response = await axiosConfig.post(REGISTER_URL, JSON.stringify({user, pwd}),
        {
          headers: { "Content-Type": "application/json"},
          withCredentials: true, 
        }
      );
      console.log(response.data);
      console.log(response.status);
      console.log(JSON.stringify(response.data));
      setSuccess(true);
      // Clear input fields

    } catch (err) {
      if(!err?.response) {
        setErrMsg("Network error.");
      } else {
        setErrMsg(err.response.data);
      }
    }

  }
  return (
    <>
    {success ? (
      <section>
        <h1>Success!</h1>
        <p>
          <a href="/login">Login</a>
          </p>
      </section>
    ) : (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="polite"
      >
        {errMsg}
      </p>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            Username must be 3-23 characters long and contain only letters and
            numbers.
          </p>
          <label htmlFor="password">
            Password:
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
          </label>
          <input
                 type="password"
                 id="password"
                 onChange={(e) => setPwd(e.target.value)}
                 value={pwd}
                 required
                 aria-invalid={validPwd ? "false" : "true"}
                 aria-describedby="pwdnote"
                 onFocus={() => setPwdFocus(true)}
                 onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
            Password must be 6-23 characters long and contain only letters and
            numbers.
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Passwords must match.
          </p>

          <button
            disabled={
              !validName || !validPwd || !validMatch ? true : false
            }
          >
            Sign Up
          </button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </section>
    )}
    </>
  );
};

export default RegistrationForm;
