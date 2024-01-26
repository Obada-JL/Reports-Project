import Logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ModalComponent from "./AddComplaint";
import DetailPage from "./DetailPage";
import { Link } from "react-router-dom";
import AddComplaint from "./AddComplaint";

function MainPage(props) {
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
      width: "1000px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const modal2Styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      padding: "0px",
      height: "100%",
      width: "100vw",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const [tableContent, setTableContent] = useState([]);
  const formSubmitHandler = (record) => {
    // console.log(record.id);
    setTableContent((prevContent) => [
      <tr onClick={handleOpenModal}>
        <td>{record.title}</td>
        <td>{record.Type}</td>
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

    const Values = {
      description: record.Description,
      category: record.Type,
      address: record.Adress,
    };

    fetch("https://complaintapi.kodunya.com/api/Complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      body: JSON.stringify(Values), // Convert the object to a JSON string
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        const lastComplaint = data[data.length - 1];
        setTableContent((prevContent) => [
          <tr>
            <td>{lastComplaint.title}</td>
            <td>{lastComplaint.category}</td>
            <td>{lastComplaint.createdDate}</td>
            <td className="text-white bg-secondary">{lastComplaint.status}</td>
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
        ]);
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });

    handleCloseModal();
  };

  // const loadComplaints = () => {
  const [status, setStatus] = useState();
  useEffect(() => {
    fetch("https://complaintapi.kodunya.com/api/Complaints")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forEach((data) => {
          if (data.status === 0) {
            setStatus(<td className="text-white bg-secondary">Pending</td>);
          } else if (data.status === 1) {
            setStatus(<td className="text-white bg-success">Accepted</td>);
          } else if (data.status === 2) {
            setStatus(<td className="text-white bg-danger">Rejected</td>);
          } else if (data.status === 3) {
            setStatus(<td className="text-white bg-primary">InProgress</td>);
          } else if (data.status === 4) {
            setStatus(<td className="text-white bg-Dark">Closed</td>);
          }
          {
            tableContent;
          }
          setTableContent((prevContent) => [
            <tr onClick={handleOpenModal}>
              <td>{data.title}</td>
              <td>{data.category}</td>
              <td>{data.createdDate.split("T")[0]}</td>

              <td className="text-white bg-secondary">{status}</td>
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
        });
      });
  }, []);
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleModalOpen = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOpenModal(false);
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
  const GetAPI = () => {
    fetch("https://complaintapi.kodunya.com/api/Complaints", {
      method: "POST",
      body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const handleTest = (event) => {
    <AddComplaint onFormSubmit={formSubmitHandler} />;
    console.log(event);
  };
  const OpenDetailPage = (event) => {
    console.log("entering");
    const trElement = event.target.closest("tr");
    console.log(trElement.id);
    return <DetailPage onFormSubmit={formSubmitHandler} />;
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
        <Link className="btn btn-success" onClick={handleModalOpen}>
          Add Complaints <span>&#43;</span>
        </Link>
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
          <tr onClick={OpenDetailPage}>
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
          <tr onClick={OpenDetailPage}>
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
          <tr onClick={OpenDetailPage}>
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
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >

      </Modal> */}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AddComplaint
          onCancel={handleCloseModal}
          onFormSubmit={formSubmitHandler}
        />
      </Modal>
    </>
  );
}
export default MainPage;
