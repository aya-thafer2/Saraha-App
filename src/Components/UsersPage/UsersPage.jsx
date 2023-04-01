import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pagination from "../../utils/pagination";
import Pagination from "../Pagination/Pagination";

const UsersPage = ({ users }) => {
  const [results, setResults] = useState(users);
  const navigate = useNavigate();

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 12,
  });

  const changePageNumber = (page) => {
    setPageInfo({ ...pageInfo, pageNumber: page });
  };

  const searchUser = (e) => {
    const { value } = e.target;
    const arr = [];
    users.map((user) => {
      if (user.userName.toLowerCase().includes(value.toLowerCase())) {
        arr.push(user);
      }
    });
    setResults(arr);
    setPageInfo({ ...pageInfo, pageNumber: 0 });
  };

  return (
    <div className="container">
      <input
        className="form-control me-2 my-4"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={searchUser}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {pagination(results, pageInfo.pageNumber, pageInfo.pageSize).map(
            (user, index) => (
              <tr key={user._id}>
                <th scope="row">{1 + index + (pageInfo.pageNumber * pageInfo.pageSize)}</th>
                <td>{user.userName}</td>
                <td>
                  <button
                    className="btn btn-outline-dark "
                    onClick={() => navigate(`/user/${user._id}`)}
                  >
                    Send Message
                    <i className="fa-solid fa-paper-plane ms-2"></i>
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination
        users={results}
        changePageNumber={changePageNumber}
        {...pageInfo}
      />
    </div>
  );
};

export default UsersPage;
