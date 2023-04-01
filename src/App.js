import logo from "./logo.svg";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import cookies from "react-cookies";
import Loader from "./Components/Loader/Loader";
import UsersPage from "./Components/UsersPage/UsersPage";
import UserProfile from "./Components/UserProfile";
import MyProfile from "./Components/MyProfile/MyProfile";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const [logUser, setLogUser] = useState(cookies.load("token"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const result = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers"
    );
    setUsers(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    /** logUser is a token  */
    console.log(logUser);
  }, [logUser]);

  return (
    <>
      <Navbar logUser={logUser} setLogUser={setLogUser} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          {logUser ? (
            <>
              <Route
                path="/messages"
                element={<MyProfile users={users} logUser={logUser} />}
              ></Route>
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<Login setLogUser={setLogUser} />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/forget-password"
                element={<ForgetPassword />}
              ></Route>
              <Route
                path="/reset-code/:email"
                element={<ResetPassword />}
              ></Route>
              <Route path="" element={<Home />}></Route>
            </>
          )}

          <Route path="/list" element={<UsersPage users={users} />}></Route>
          <Route
            path="/user/:id"
            element={<UserProfile users={users} />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
