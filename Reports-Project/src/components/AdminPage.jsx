import Logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import Modal from "react-modal";
import ModalComponent from "./AddComplaint";
import styles from "./AdminPage.module.css";
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

  const formSubmitHandler = (record) => {
    console.log(record);
    setTableContent((prevContent) => [
      <tr key={record.id}>
        <td>{record.title}</td>
        <td>{record.Description}</td>
        <td>{record.Date}</td>
        <td className="text-white bg-secondary">{record.status}</td>
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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [filteringButton, setFilteringButton] = useState("All");
  const tableBody = useRef();
  const ComplaintTypes = (event) => {
    let complaintType = event.target.outerText.split(" ")[0];
    setFilteringButton(complaintType);
    for (let i = 1; i < tableBody.current.children.length; i++) {
      if (
        tableBody.current.children[i].children[3].innerText !== complaintType
      ) {
        if (complaintType === "All") {
          tableBody.current.children[i].style.display = "table-row";
        } else {
          tableBody.current.children[i].style.display = "none";
        }
      } else {
        tableBody.current.children[i].style.display = "table-row";
      }
    }
  };
  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center mt-3">
        <h1>My Complaints</h1>
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
        <div>
          <input
            id="listingDate"
            type="date"
            className="border border-success p-2 rounded mw-100"
            style={{ boxSizing: "border-box", backgroundColor: "#e5eaf5" }}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleOpenModal}
        >
          Add Complaints <span>&#43;</span>
        </button>
      </div>
      <table className="table table-hover table-striped mt-5 ">
        <tbody ref={tableBody}>
          <tr className="border-0 border-bottom border-3 border-dark">
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
          {tableContent}
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Alfreds Futterkiste</td>
            <td>15-01-2024</td>
            <td className="bg-danger text-white " key={0}>
              Rejected
            </td>
            <td>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="bg-warning p-1  rounded-start rounded-end text-white me-1 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="bg-danger p-1  rounded-start rounded-end text-white cursor-pointer"
              />
            </td>
          </tr>
          <tr>
            <td>Centro comercial </td>
            <td>Centro comercial </td>
            <td>09-05-2023</td>
            <td className="text-white bg-success " key={1}>
              Accepted
            </td>
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
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Ernst Handel</td>
            <td>17-03-2024</td>
            <td className="text-white bg-secondary ">Pending</td>
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
          </tr>
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <ModalComponent
          onCancel={handleCloseModal}
          onFormSubmit={formSubmitHandler}
        />
      </Modal>
    </>
  );
}

export default AdminPage;
