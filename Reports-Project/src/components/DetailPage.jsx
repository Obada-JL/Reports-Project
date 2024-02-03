import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { AuthContext } from "../AppContext";
function DetailPage() {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(<div className="custom-loader"></div>);
  const [tableContent, setTableContent] = useState([]);
  const { id } = useParams();
  const [messages, setMesages] = useState([]);

  const token = Cookies.get("cookie");
  const { isStaff, setStaffStatus } = useContext(AuthContext);
  console.log(isStaff);
  const [filteringButton, setFilteringButton] = useState("All");
  const ComplaintTypes = (event) => {
    let complaintType = event.target.outerText.split(" ")[0];
    setFilteringButton(complaintType);
  };
  const changeStatus = () => {
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
            <p> Rejected</p>
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={ComplaintTypes}>
            <p>Pending </p>
          </a>
        </li>
      </ul>
    </div>;
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://complaintapi.kodunya.com/api/Complaints/${id}`, {
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let status;
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
          <div
            className="d-flex flex-column"
            style={{ flex: "65%", overflow: "scroll", overflowX: "hidden" }}
          >
            <Link
              className=" position-absolute p-4 font-size link-secondary d-block text-decoration-none"
              to={".."}
            >
              &#171;
            </Link>
            <h1 className="d-flex justify-content-center pt-2">{data.title}</h1>
            <div className="d-flex flex-50 h5 justify-content-around pt-2">
              if (isStaff) {changeStatus()}else
              {
                <td className={`text-white bgStatus${data.status} p-2 rounded`}>
                  {status}
                </td>
              }
              <div className="d-flex gap-2">
                <p>Date:</p> <p>{data.createdDate.split("T")[0]}</p>
              </div>
            </div>
            <p className="d-flex justify-content-center h5 pb-3 border-bottom">
              {data.category}
            </p>
            <div className="d-flex justify-content-between p-2">
              <div>
                <div className="pt-1 ">
                  <p className="h4 ms-2 ">Adress:</p>
                  <p className="p-2">{data.address}</p>
                </div>
                <div>
                  <p className="h4 ms-2 ">Description:</p>
                  <p className="p-2">{data.description}</p>
                </div>
              </div>
              <img
                src={`https://complaintapi.kodunya.com/api/Files/${data.image}`}
                width={350}
              />
            </div>
            <p className="h4 mb-3 p-2">Logs:</p>
            <div className="pb-1 d-flex gap-5 p-2">
              <div className="d-flex gap-2 h5">
                <p>{data.logs[0].logText}</p>
              </div>
              <div className="d-flex gap-2 h5">
                <p>{data.logs[0].logDate.split("T")[0]}</p>
              </div>
            </div>
          </div>,
        ]);
        data.messages.forEach((message) => {
          let sender;
          if (message.userId === data.userId) {
            sender = (
              <div className="message my_msg h5">
                <p className="bg-dark text-white"> {message.message}</p>
              </div>
            );
          } else {
            sender = (
              <div className="message friend_msg  text-white">
                <p className="bg-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            );
          }
          setMesages((prevContent) => [...prevContent, sender]);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (loading === true) {
      setTable(<div className="custom-loader"></div>);
    } else {
      setTable(tableContent);
    }
  }, [loading, tableContent]);
  const [AddMessage, setAddMessage] = useState(messages);
  const onMessageSend = (event) => {
    event.preventDefault;
    let message = event.target.previousElementSibling.value;
    const values = {
      complaintId: id,
      message: message,
    };
    fetch("https://complaintapi.kodunya.com/api/ComplaintMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values), // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
    setAddMessage((prevContent) => [
      ...prevContent,
      <div className="message my_msg h5">
        <p className="bg-dark text-white">{message}</p>
      </div>,
    ]);
    event.target.previousElementSibling.value = "";
  };
  return (
    <div className="d-flex">
      {table}

      <div
        className="d-flex flex-column border-start border-dark border-2"
        style={{ flex: "35%" }}
      >
        <h1 className="d-flex justify-content-center pt-3">MESSAGING</h1>
        <div
          className=""
          style={{
            overflow: "scroll",
            overflowX: "hidden",
            height: "calc(100vh - 198px)",
          }}
        >
          {messages.slice(0, messages.length / 2)}
          {AddMessage}
        </div>

        <div className="chat_input bg-secondary opacity-50">
          <input type="text" placeholder="Type a message" />
          <FontAwesomeIcon
            className="icon text-dark"
            icon={faShare}
            onClick={onMessageSend}
          />
        </div>
      </div>
    </div>
  );
}
export default DetailPage;
