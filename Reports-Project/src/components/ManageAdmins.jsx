import Logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ModalComponent from "./AddComplaint";
import Cookies from "js-cookie";
import AdminDetails from "./AdminDetails";
import AddAdmin from "./AddAdmin";
const token = Cookies.get("cookie");
function AdminPage() {
  // description - search in navbar - filter complaints
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      padding: "0px",
      borderRadius: " 10px",
      width: "400px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const [tableContent, setTableContent] = useState([]);
  const formSubmitHandler = (admin) => {
    console.log(admin);
    setTableContent((prevContent) => [
      <tr>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td>{admin.phoneNumber}</td>
        <td>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="bg-warning p-1  rounded-start rounded-end text-white me-1"
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className="bg-danger p-1  rounded-start rounded-end text-white"
          />
        </td>
      </tr>,
      ...prevContent,
    ]);
    handleCloseModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleDetailOpenModal = () => {
    setIsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
  };
  const [filteringButton, setFilteringButton] = useState("All");
  const tableBody = useRef();
  const ComplaintTypes = (event) => {
    let complaintType = event.target.outerText.split(" ")[0];
    setFilteringButton(complaintType);
  };
  useEffect(() => {
    fetch("https://complaintapi.kodunya.com/api/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.forEach((admin) => {
          setTableContent((prevContent) => [
            <tr>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phoneNumber}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="bg-warning p-1  rounded-start rounded-end text-white me-1"
                  onClick={handleDetailOpenModal}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="bg-danger p-1  rounded-start rounded-end text-white"
                />
              </td>
            </tr>,
            ...prevContent,
          ]);
        });
        {
        }
        return;
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
  }, []);

  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center mt-3">
        <h1>All Admins</h1>
      </div>
      <div className="mt-5 ms-5 me-5 d-flex justify-content-between  border-bottom border-dark pb-3 border-3 rounded-start rounded-end">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {filteringButton}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>All Complaints</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p> Accepted Complaints</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p> Rejected Complaints</p>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
                <p>Pending Complaints</p>
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleOpenModal}
        >
          Add Admins <span>&#43;</span>
        </button>
      </div>
      <table className="table table-hover table-striped mt-5 ">
        <tbody ref={tableBody}>
          <tr className="border-0 border-bottom border-3 border-dark">
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
          {tableContent.slice(Math.ceil(tableContent.length / 2))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AddAdmin onCancel={handleCloseModal} onSubmit={handleCloseModal} />
      </Modal>
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AdminDetails
          onCancel={handleCloseModal}
          onFormSubmit={formSubmitHandler}
        />
      </Modal>
    </>
  );
}

export default AdminPage;
