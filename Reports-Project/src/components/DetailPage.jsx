import "./DetailPage.css";
function DetailPage(props) {
  console.log(props);
  props.onFormSubmit.map((record) => {
    console.log(record);
  });
  const onCancelHandler = () => {
    props.onCancel();
  };
  return (
    <>
      <div
        className=" position-absolute p-4 font-size link-secondary d-block"
        onClick={onCancelHandler}
      >
        &#171;
      </div>
      <h1 className="d-flex justify-content-center pt-2">Title</h1>
      <div className="d-flex h5 justify-content-around pt-2">
        <p className="bg-success text-white p-2 rounded">Status</p>
        <div className="d-flex gap-2">
          <p>Date:</p> <p>12-05-2024</p>
        </div>
      </div>
      <p className="d-flex justify-content-center h5 pb-3 border-bottom">
        Electricity
      </p>
      <div className="pt-1 ">
        <p className="h4 ms-2 ">Adress:</p>
        <p className="p-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
          suscipit tempora quisquam asperiores illo est reprehenderit aspernatur
          in eum! Nemo at culpa nihil, hic porro vitae. Magnam eius suscipit
          ducimus?
        </p>
      </div>
      <div className="border-bottom border-dark border-3 pb-1">
        <p className="h4 ms-2 ">Description:</p>
        <p className="p-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis nihil
          doloribus, corrupti tempora quaerat assumenda obcaecati minima ipsam
          sunt praesentium. Quibusdam, distinctio aspernatur. Architecto eaque
          assumenda doloremque minus atque obcaecati!
        </p>
      </div>
      <h1>MESSAGING</h1>
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
