import { useCookies } from "react-cookie";
import Logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
  const navigate = useNavigate();
  const onLogout = () => {
    removeCookie("cookie");
    navigate("/signIn");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <img src={Logo} width={50} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              ></a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account Settings
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={onLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
