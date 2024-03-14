import "./signIn.css";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
function SignIn() {
  const [cookies, setCookie] = useCookies([
    "cookie",
    "isStaff",
    "canAccept",
    "canReject",
    "canInProgress",
    "canClose",
    "userId",
  ]);
  const handleBlurEmail = (e) => {
    const formisValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      console.log(input.classList);
    };
    const formisinValid = () => {
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      console.log(input.classList);
    };
    const input = e.target;
    if (input.value.length === 0 || input.value.includes("@") === false) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  const handleBlurPassword = (e) => {
    const formisValid = () => {
      console.log(input.classList);
      input.classList.add("form-control");
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    };
    const formisinValid = () => {
      console.log(input.classList);
      input.classList.add("form-control");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    };
    const input = e.target;
    if (
      input.value.length === 0 ||
      input.value.length < 8 ||
      input.value.length > 20
    ) {
      formisinValid();
    } else {
      formisValid();
    }
  };
  const Email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const signInForm = useRef();
  const loader = useRef();
  const onLogin = () => {
    const Values = {
      userName: Email.current.value,
      password: password.current.value,
    };
    let form = signInForm.current;
    for (let i = 0; i < form.children[1].children.length; i++) {
      if (form.children[i].children[1].classList.contains("is-valid") == true) {
        loader.current.style.display = "grid";
        fetch("https://complaintapi.kodunya.com/api/Users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(Values),
        })
          .then((response) => {
            if (response.status === 200) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully",
              });
              loader.current.style.display = "none";
              return response.json();
            } else if (response.status === 401) {
              return Swal.fire({
                title: "The user is not defined",
                text: "Check your Username and password",
                icon: "error",
              });
            } else {
              alert("another error");
            }
          })
          .then((data) => {
            if (data.token) {
              setCookie("isStaff", data.isStaff);
              setCookie("canAccept", data.canAccept);
              setCookie("canReject", data.canReject);
              setCookie("canInProgress", data.canInProgress);
              setCookie("canClose", data.canClose);
              setCookie("cookie", data.token);
              setCookie("userId", data.userID);
              setCookie("manageAdmins", data.manageAdmins);
              navigate("/");
            }
          })
          .catch((error) => {
            console.error("Error during the fetch operation:", error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have some errors!",
        });
      }
    }
  };
  return (
    <>
      <div
        className="custom-loader"
        ref={loader}
        style={{ display: "none" }}
      ></div>
      <div className="sidenav bg-dark">
        <div className="login-main-text">
          <h2>
            Complaints app
            <br /> Login Page
          </h2>
          <p>Login or register from here to access.</p>
        </div>
      </div>
      <div className="main me-7">
        <img src={Logo} width={250} />
        <div className="col-md-6 col-sm-12 ">
          <div className="mt-lg-5">
            <form ref={signInForm}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="validationDefault01"
                  placeholder="Please Enter Your Email"
                  onChange={handleBlurEmail}
                  ref={Email}
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
                  onChange={handleBlurPassword}
                  ref={password}
                  required
                />
                <div id="passwordHelpBlock" className="form-text ">
                  Your password must be 8-20 characters long
                </div>
              </div>
              <button
                type="button"
                className="btn btn-black me-1"
                onClick={onLogin}
              >
                Login
              </button>
              <Link to={"/register"} className="btn btn-secondary">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
