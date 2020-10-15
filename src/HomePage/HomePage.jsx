import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { MDBDataTable } from "mdbreact";

function HomePage() {

  const history = useHistory();
  const [selectType, setSelectType] = useState("characters");

  const [data, setData] = useState();
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("logged_in_user"))
  );

  if (user) {
    console.log("user", user);
  } else {
    debugger;
    history.push("/login");
  }

  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/" + selectType, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((fields) => {
        let columns = [];
        Object.keys(fields[0]).forEach((obj) => {
          let column = {
            label: obj.replace("_", " ").toUpperCase(),
            field: obj,
            sort: "asc",
            width: 150,
          };
          columns.push(column);
        });
        // setColumns(columns);
        // setCharList(fields);
        let data = {
          columns: columns,
          rows: fields,
        };
        setData(data);
      });
  }, [selectType]);

  return (
    <div>
      <h1>Hi {user && user.username}!</h1>
      <h3>
        Search the characters of breaking bad series by episodes or characters
      </h3>
      <button
        type="button"
        class="btn btn-primary float-right"
        onClick={() => {
          setUser("");
          window.localStorage.removeItem("logged_in_user");
        }}
      >
        Log out
      </button>
      <div>
        <div className="col-md-4" style={{ paddingLeft: "0px" }}>
          <label for="exampleFormControlSelect1">Breaking Bad Characters</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={() => setSelectType(event.target.value)}
          >
            <option value="characters">View by characters</option>
            <option value="episodes">View by episodes</option>
          </select>
        </div>

        <div style={{ background: "white", padding: "10px" }}>
          <MDBDataTable responsive striped bordered autoWidth data={data} />
        </div>
      </div>
    </div>
  );
}

export { HomePage };
