import { useCookies } from "react-cookie";
import Logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie"]);
  const navigate = useNavigate();
  const onLogout = () => {
    Swal.fire({
      title: "Are you sure to Log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("cookie");
        removeCookie("isStaff");
        removeCookie("canAccept");
        removeCookie("canReject");
        removeCookie("canInProgress");
        removeCookie("canClose");
        removeCookie("userId");
        navigate("/signIn");
        Swal.fire({
          title: "Logged out successfuly!",
          icon: "success",
        });
      }
    });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <div className="d-flex gap-3 h-50">
          <img src={Logo} width={50} />
          <div className="d-flex align-items-center">
            <button className=" btn btn-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
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
