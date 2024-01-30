import "./signIn.css";
import Logo from "../assets/logo.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const handleBlur = (props) => {
    const input = props.target;
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    if (props.target.id === "validationDefault01") {
      if (input.value.length > 0) {
        formisValid();
      } else {
        formisinValid();
      }
    } else {
      if (input.value.length > 7 && input.value.length < 21) {
        formisValid();
      } else {
        formisinValid();
      }
    }
  };
  const password = useRef();
  const validatePassword = (event) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = event.target;
    if (password.current.value > 0) {
      formisValid();
    } else if (input.value.length > 7 && input.value.length < 21) {
      formisValid();
    } else if (password.current.value !== input.value) {
      console.log("form invalid");
      formisinValid();
    } else {
      if (password.current.value === input.value) {
        formisValid();
        password.current.classList.add("form-control");
        password.current.classList.remove("is-invalid");
        password.current.classList.add("is-valid");
      } else {
        formisinValid();
      }
    }
  };
  const userName = useRef();
  const phoneNumber = useRef();
  const onRegister = () => {
    const Values = {
      name: userName.current.value,
      phoneNumber: phoneNumber.current.value,
      password: password.current.value,
    };
    fetch("https://complaintapi.kodunya.com/api/Users/SignUp", {
      method: "POST",
      headers: {
        // Authorization : `bearer ${}`,
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      body: JSON.stringify(Values), // Convert the object to a JSON string
    })
      .then((response) => {
        // console.log(resopnse.data.token);
        console.log(response.json());
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
  };
  return (
    <>
      <div className="sidenav bg-dark">
        <div className="login-main-text">
          <h2>
            Application
            <br /> Login Page
          </h2>
          <p>Register or login from here to access.</p>
        </div>
      </div>
      <div className="main me-7">
        <img src={Logo} width={250} />
        <div className="col-md-6 col-sm-12 ">
          <div className="mt-lg-5">
            <form>
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter Your Username"
                  ref={userName}
                  onBlur={handleBlur}
                  required
                />
                <label className="mt-2">Phone Number</label>
                <input
                  type="number"
                  className="form-control "
                  id="validationDefault01"
                  placeholder="Please Enter Your Phone Number"
                  ref={phoneNumber}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="form-group mb-2 mt-2">
                <label htmlFor="inputPassword5" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword5"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Please Enter Your Password"
                  onBlur={handleBlur}
                  ref={password}
                  required
                />
                <label htmlFor="inputPassword5" className="form-label">
                  Repeat your Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Please Enter Your Password"
                  onBlur={validatePassword}
                  required
                />
                <div id="passwordHelpBlock" className="form-text ">
                  Your password must be 8-20 characters long
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary me-1"
                onClick={onRegister}
              >
                Register
              </button>
              <Link to={"/signIn"} className="btn btn-black ">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
