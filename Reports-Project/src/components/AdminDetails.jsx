import "./AdminDetails.css";
function AdminDetails(props) {
  const Cancel = () => {
    props.onCancel();
  };
  return (
    <>
      <h1 className="border-bottom border-3 d-flex justify-content-center p-2">
        Name
      </h1>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="border-0 border-bottom border-1 outline-0 border-dark"
        />
      </div>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="number"
          id="phoneNumber"
          className="border-0 border-bottom border-1 outline-0 border-dark"
        />
      </div>
      <div className="d-flex flex-column p-2 ">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="border-0 border-bottom border-1 outline-0 border-dark"
        />
      </div>
      <h5 className="ps-2 pt-1">This Admin Can do :</h5>
      <div className="d-flex gap-2 flex-wrap p-2 justify-content-center">
        <label class="check">
          <input type="checkbox" />
          <span>Accept</span>
        </label>
        <label class="check">
          <input type="checkbox" />
          <span>Reject</span>
        </label>

        <label class="check">
          <input type="checkbox" />
          <span>In Progress</span>
        </label>

        <label class="check">
          <input type="checkbox" />
          <span>Close</span>
        </label>

        <label class="check">
          <input type="checkbox" />
          <span>Change Admins</span>
        </label>
      </div>
      <div className="d-flex justify-content-end  p-2 gap-2">
        <button className="btn btn-secondary" onClick={Cancel}>
          Cancel
        </button>
        <button className="btn btn-success">Refresh</button>
      </div>
    </>
  );
}

export default AdminDetails;
