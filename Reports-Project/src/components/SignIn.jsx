import "./signIn.css";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useAuth } from "../AppContext.jsx";
function SignIn() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
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
  const userName = useRef();
  const password = useRef();

  const { setStaffStatus, setClose, setInProgress, setAccept, setReject } =
    useAuth();
  const navigate = useNavigate();
  const onLogin = () => {
    const Values = {
      userName: userName.current.value,
      password: password.current.value,
    };
    fetch("https://complaintapi.kodunya.com/api/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(Values),
    })
      .then((response) => {
        if (response.status === 200) {
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
          setStaffStatus(data.isStaff);
          setAccept(data.canAccept);
          setReject(data.canReject);
          setInProgress(data.canInProgress);
          setClose(data.canClose);
          setCookie("cookie", data.token);
          navigate("/");
        }
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
          <p>Login or register from here to access.</p>
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
                  id="validationDefault01"
                  placeholder="Please Enter Your Username"
                  onBlur={handleBlur}
                  ref={userName}
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
