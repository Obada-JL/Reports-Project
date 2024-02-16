// import {
//   ColumnDirective,
//   ColumnsDirective,
//   GridComponent,
//   Inject,
//   Page,
// } from "@syncfusion/ej2-react-grids";
// import React, { useState } from "react";
// import { data } from "./datasource";
// import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
// import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

// function App() {
//   const [pageSettings, setPageSettings] = useState();
//   let textbox;
//   const click = () => {
//     const pageSize = { pageSize: textbox.value };
//     setPageSettings(pageSize);
//   };
//   return (
//     <div>
//       <label>Enter page size:</label>
//       <TextBoxComponent
//         ref={(t) => (textbox = t)}
//         width={120}
//       ></TextBoxComponent>
//       <ButtonComponent onClick={click}>Click button</ButtonComponent>
//       <GridComponent
//         dataSource={data}
//         height={265}
//         allowPaging={true}
//         pageSettings={pageSettings}
//       >
//         <ColumnsDirective>
//           <ColumnDirective
//             field="OrderID"
//             headerText="Order ID"
//             width="120"
//             textAlign="Right"
//             isPrimaryKey={true}
//           />
//           <ColumnDirective
//             field="CustomerID"
//             headerText="Customer ID"
//             width="140"
//           />
//           <ColumnDirective
//             field="Freight"
//             headerText="Freight"
//             width="120"
//             format="C"
//             textAlign="Right"
//           />
//           <ColumnDirective
//             field="ShipCountry"
//             headerText="Ship Country"
//             width="150"
//           />
//           <ColumnDirective
//             field="ShipCity"
//             headerText="Ship City"
//             width="150"
//           />
//           <ColumnDirective
//             field="Verified"
//             headerText="Verified"
//             width="150"
//             displayAsCheckBox={true}
//           />
//         </ColumnsDirective>
//         <Inject services={[Page]} />
//       </GridComponent>
//     </div>
//   );
// }
// export default App;

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const token = Cookies.get("cookie");
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://complaintapi.kodunya.com/api/Complaints", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data && data.length) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // event handler for page change on click
  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= products.length / 10 &&
      pageNumber !== page
    )
      setPage(pageNumber);
    console.log(pageNumber);
    console.log(page);
  };

  return (
    <div className="App">
      <h1>All Products</h1>
      {products.length && (
        <ol className="All__products">
          {products.slice(page * 10 - 10, page * 10).map((product) => (
            <li key={product.id} className="product">
              <img src={product.thumbnail} alt={product.title} />
              <h4>{product.title}</h4>
            </li>
          ))}
        </ol>
      )}

      {products.length > 0 && (
        <section className="pagination">
          <span
            onClick={() => handlePageChange(page - 1)}
            className={`arrow ${page === 1 ? "pagination__disabled" : ""}`}
          >
            ⬅
          </span>
          {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
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
              page === Math.floor(products.length / 10)
                ? "pagination__disabled"
                : ""
            }`}
          >
            ➡
          </span>
        </section>
      )}
    </div>
  );
}
