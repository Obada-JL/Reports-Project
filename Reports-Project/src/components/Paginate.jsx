import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "@mui/material";
export default function App() {
  const [complaints, setcomplaints] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const token = Cookies.get("cookie");
  const fetchProducts = async (pageNumber) => {
    console.log("entering");
    let page_number;
    if (pageNumber === undefined || pageNumber === null) {
      page_number = page;
    } else {
      page_number = pageNumber;
    }
    console.log(page_number);
    const res = await fetch(
      `https://complaintapi.kodunya.com/api/Complaints/Paging?skip=${page_number}&take=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.items && data.items.length)
      setcomplaints(data.items), setTotal(data.total);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // event handler for page change on click
  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    if (
      pageNumber > 0 &&
      pageNumber <= complaints.length / 10 &&
      pageNumber !== page
    )
      setPage(pageNumber);
    fetchProducts(pageNumber);
  };
  console.log(page);
  return (
    <div className="App">
      <h1>All Products</h1>

      {complaints.length && (
        <table>
          <tbody>
            {complaints.slice(page * 10 - 10, page * 10).map((complaint) => (
              <tr
                // onClick={onClick}
                id={complaint.id}
                className="border-bottom border-1"
                style={{ cursor: "pointer" }}
              >
                <td className="text-break w-25">{complaint.title}</td>
                <td>{complaint.category}</td>
                <td>{complaint.createdDate.split("T")[0]}</td>
                <td className={`text-white bgStatus${complaint.status} p-2`}>
                  {status}
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="bg-danger p-1  rounded-start rounded-end text-white ms-3"
                    // onClick={onClick}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {complaints.length > 0 && (
        <section className="pagination">
          <span
            onClick={() => handlePageChange(page - 1)}
            className={`arrow ${page === 1 ? "pagination__disabled" : ""}`}
          >
            ⬅
          </span>
          {[...Array(Math.ceil(total / 10))].map((_, i) => (
            <span
              className={`page__number ${
                page === i + 1 ? "selected__page__number" : ""
              }`}
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => handlePageChange(page + 1)}
            className={`arrow ${
              page === Math.floor(complaints.length / 10)
                ? "pagination__disabled"
                : ""
            }`}
          >
            ➡
          </span>
          <Pagination count={Math.ceil(total / 10)} variant="outlined" />
        </section>
      )}
    </div>
  );
}
