import Logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeCommit,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ModalComponent from "./AddComplaint";
import DetailPage from "./DetailPage";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AddComplaint from "./AddComplaint";
import "./MainPage.css";
import Pagination from "@mui/material/Pagination";
import { PaginationItem, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReactPaginate from "react-paginate";

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
  const [tableContent, setTableContent] = useState([]);
  const formSubmitHandler = (record) => {
    console.log(record.id);
    setTableContent((prevContent) => [
      <tr onClick={handleOpenModal}>
        <td>{record.title}</td>
        <td>{record.Type}</td>
        <td>{record.Date}</td>
        <td className="text-white bg-secondary">{record.status}</td>
        <td>
          <FontAwesomeIcon
            icon={faTrashCan}
            className="bg-danger p-1  rounded-start rounded-end text-white ms-3"
          />
        </td>
      </tr>,
      ...prevContent,
    ]);

    const Values = {
      description: record.Description,
      category: record.Type,
      address: record.Adress,
      title: record.title,
      image: record.image,
    };
    console.log(Values);
    fetch("https://complaintapi.kodunya.com/api/Complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
        // Add any other headers if needed
      },
      body: JSON.stringify(Values), // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {});
    handleCloseModal();
  };
  const onClick = (e) => {
    if (e.target.tagName === "TD") {
      OpenDetailPage(e);
    } else {
      console.log(e.target.tagName);
      DeleteComplaint(e);
    }
  };
  const token = Cookies.get("cookie");
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://complaintapi.kodunya.com/api/Complaints", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.forEach((data) => {
  //         let status;
  //         if (data.length === 0) {
  //         } else {
  //           if (data.status === 0) {
  //             status = "Pending";
  //           } else if (data.status === 1) {
  //             status = "Accepted";
  //           } else if (data.status === 2) {
  //             status = "Rejected";
  //           } else if (data.status === 3) {
  //             status = "InProgress";
  //           } else if (data.status === 4) {
  //             status = "Closed";
  //           }
  //           setTableContent((prevContent) => [
  //             <tr
  //               onClick={onClick}
  //               id={data.id}
  //               className="border-bottom border-1"
  //               style={{ cursor: "pointer" }}
  //             >
  //               <td className="text-break w-25">{data.title}</td>
  //               <td>{data.category}</td>
  //               <td>{data.createdDate.split("T")[0]}</td>
  //               <td className={`text-white bgStatus${data.status} p-2`}>
  //                 {status}
  //               </td>
  //               <td>
  //                 <FontAwesomeIcon
  //                   icon={faTrashCan}
  //                   className="bg-danger p-1  rounded-start rounded-end text-white ms-3"
  //                   onClick={onClick}
  //                   style={{ cursor: "pointer" }}
  //                 />
  //               </td>
  //             </tr>,
  //             ...prevContent,
  //           ]);
  //         }
  //       });
  //       {
  //         tableContent.slice(Math.ceil(tableContent.length / 2));
  //       }
  //       return;
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  const [table, setTable] = useState(<div className="custom-loader"></div>);
  useEffect(() => {
    if (loading === true) {
      setTable(<div className="custom-loader"></div>);
    } else {
      setTable(tableContent.slice(0, Math.ceil(tableContent.length) / 2));
    }
  }, [loading, tableContent]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOpenModal(false);
  };
  const DeleteComplaint = (e) => {
    console.log(e.currentTarget.closest("tr").id);
    const trId = e.currentTarget.closest("tr").id;
    Swal.fire({
      title: "Are you sure to Delete This Complaint ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted successfuly!",
          icon: "success",
        });
        fetch(`https://complaintapi.kodunya.com/api/Complaints/${trId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
            // Add any other headers if needed
          },
        }).then((response) => {
          response.json();
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        return;
      }
    });
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
  const navigate = useNavigate();
  const OpenDetailPage = (event) => {
    const trElement = event.target.closest("tr");
    const trElementId = trElement.id;
    navigate(`/${trElementId}`);
  };
  const [mainTitle, setMainTitle] = useState("My Complaints");
  const [head, setHead] = useState();
  const isStaff = Cookies.get("isStaff");
  useEffect(() => {
    if (isStaff === "true") {
      setMainTitle("All Complaints");
      setHead();
    } else {
      setMainTitle("My Complaints");
      setHead(
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
      );
    }
  }, []);

  // Add a <div id="container"> to your HTML to see the component rendered.
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetch();
    fetch(
      `https://complaintapi.kodunya.com/api/Complaints/Paging?skip=${currentItems}&take=1${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.items.forEach((data) => {
          let status;
          if (data.length === 0) {
          } else {
            if (data.status === 0) {
              status = "Pending";
            } else if (data.status === 1) {
              status = "Accepted";
            } else if (data.status === 2) {
              status = "Rejected";
            } else if (data.status === 3) {
              status = "InProgress";
            } else if (data.status === 4) {
              status = "Closed";
            }
            setTableContent((prevContent) => [
              <tr
                onClick={onClick}
                id={data.id}
                className="border-bottom border-1"
                style={{ cursor: "pointer" }}
              >
                <td className="text-break w-25">{data.title}</td>
                <td>{data.category}</td>
                <td>{data.createdDate.split("T")[0]}</td>
                <td className={`text-white bgStatus${data.status} p-2`}>
                  {status}
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="bg-danger p-1  rounded-start rounded-end text-white ms-3"
                    onClick={onClick}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>,
              ...prevContent,
            ]);
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center mt-3">
        <h1>{mainTitle}</h1>
      </div>
      {head}
      <table className="table table-hover table-striped mt-5 ">
        <tbody ref={tableBody}>
          <tr className="border-0 border-bottom border-3 border-dark">
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tbody>
        {tableContent.slice(0, tableContent.length / 2)}
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
      <div className="d-flex justify-content-center mt-3 pb-5">
        {/* <Typography>Page: {page}</Typography> */}
      </div>
    </>
  );
}
export default MainPage;
