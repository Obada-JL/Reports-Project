import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
function DetailPage() {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(<div className="custom-loader"></div>);
  const [tableContent, setTableContent] = useState([]);
  const { id } = useParams();

  const cookieValue = Cookies.get("cookie");
  useEffect(() => {
    setLoading(true);
    fetch(`https://complaintapi.kodunya.com/api/Complaints/${id}`, {
      headers: {
        Authorization: "bearer " + cookieValue,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let status;
        if (data.status === 0) {
          status = (
            <td className="text-white bg-secondary p-2 rounded">Pending</td>
          );
        } else if (data.status === 1) {
          status = (
            <td className="text-white bg-success p-2 rounded">Accepted</td>
          );
        } else if (data.status === 2) {
          status = (
            <td className="text-white bg-danger p-2 rounded">Rejected</td>
          );
        } else if (data.status === 3) {
          status = (
            <td className="text-white bg-primary p-2 rounded">InProgress</td>
          );
        } else if (data.status === 4) {
          status = <td className="text-white bg-Dark p-2 rounded">Closed</td>;
        }
        setTableContent((prevContent) => [
          <>
            <Link
              className=" position-absolute p-4 font-size link-secondary d-block text-decoration-none"
              to={".."}
            >
              &#171;
            </Link>
            <h1 className="d-flex justify-content-center pt-2">{data.title}</h1>
            <div className="d-flex h5 justify-content-around pt-2">
              {status}
              <div className="d-flex gap-2">
                <p>Date:</p> <p>{data.createdDate.split("T")[0]}</p>
              </div>
            </div>
            <p className="d-flex justify-content-center h5 pb-3 border-bottom">
              {data.category}
            </p>
            <div className="pt-1 ">
              <p className="h4 ms-2 ">Adress:</p>
              <p className="p-2">{data.address}</p>
            </div>
            <div className="border-bottom border-dark border-3 pb-1">
              <p className="h4 ms-2 ">Description:</p>
              <p className="p-2">{data.description}</p>
            </div>
          </>,
        ]);
        return;
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
  const { urlId } = useParams();

  const onMessageSend = (event) => {
    const message = event.target.previousElementSibling.value;
    const values = {
      complaintId: urlId,
      message: message,
    };

    console.log(event.target.previousElementSibling.value);
    fetch("https://complaintapi.kodunya.com/api/ComplaintMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + cookieValue,
      },
      body: JSON.stringify(values), // Convert the object to a JSON string
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error during the fetch operation:", error);
      });
    console.log(event.target.previousElementSibling.value);
  };
  return (
    <>
      {table}

      <h1 className="d-flex justify-content-center pt-3">MESSAGING</h1>
      <div className="message my_msg h5">
        <p className="bg-dark text-white"> Hello</p>
      </div>
      <div className="message friend_msg  text-white">
        <p className="bg-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="message my_msg h5">
        <p className="bg-dark text-white"> Hello</p>
      </div>
      <div className="message friend_msg  text-white">
        <p className="bg-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="message my_msg h5">
        <p className="bg-dark text-white"> Hello</p>
      </div>
      <div className="message friend_msg  text-white">
        <p className="bg-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="message my_msg h5">
        <p className="bg-dark text-white"> Hello</p>
      </div>
      <div className="message friend_msg  text-white">
        <p className="bg-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="message my_msg h5">
        <p className="bg-dark text-white"> Hello</p>
      </div>
      <div className="message friend_msg  text-white">
        <p className="bg-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="chat_input bg-secondary opacity-50">
        <input type="text" placeholder="Type a message" />
        <FontAwesomeIcon
          className="icon text-dark"
          icon={faShare}
          onClick={onMessageSend}
        />
      </div>
    </>
    // <button
    //   type="button"
    //   className="btn btn-secondary"
    //   onClick={onCancelHandler}
    // >
    //   Cancel
    // </button>
  );
}
export default DetailPage;
