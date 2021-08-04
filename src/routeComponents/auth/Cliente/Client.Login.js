import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../../apis/api";
import TextInput from "../../../components/TextInput";
import { AuthContext } from "../../../contexts/authContext";
import { Navbar } from "react-bootstrap";
import "../../../assets/styles/index.css";
import SignupLogo from "../../../img/logosignup.png";

function ClientLogin(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      props.history.push("/profile");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div>
      <Navbar
        className="navbar sticky-top"
        bg="white"
        variant="white"
        expand="lg"
      >
        <img
          className="container d-flex"
          src={SignupLogo}
          style={{ height: "23%", width: "23%" }}
          alt="logo"
        />
      </Navbar>

      <div className="pag-fundo pt-4">
        <div className="container mt-5" style={{ color: "#FFA900" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group d-flex pb-3">
              <Link
                className="fas fa-angle-double-left pr-4"
                style={{ color: "#FFFFFF" }}
                to="/"
              />
              <h1 className="pl-2">
                <strong>Login Usuário</strong>
              </h1>
            </div>

            <div style={{ fontSize: 17 }}>
              <strong>
                <TextInput
                  label="E-mail:"
                  type="email"
                  name="email"
                  id="signupFormEmail"
                  value={state.email}
                  error={errors.email}
                  onChange={handleChange}
                />
                <TextInput
                  label="Senha:"
                  type="password"
                  name="password"
                  id="signupFormPassword"
                  value={state.password}
                  error={errors.password}
                  onChange={handleChange}
                />
              </strong>
            </div>

            <div className="form-group">
              <div className=" d-flex justify-content-between">
                <button
                  className="btn text-white"
                  style={{ backgroundColor: "#FF7600" }}
                  type="submit"
                >
                  Login
                </button>
              </div>

              <br />
              <p style={{ color: "#FFA900" }}>
                Ainda não tenho uma conta? <br />
                <Link className="text-white" to="/signup">
                  Clique Aqui!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
