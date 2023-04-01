import axios from "axios";
import copy from "copy-to-clipboard";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import findUser from "../../utils/findUser";
import style from "./MyProfile.module.css";

const MyProfile = ({ users, logUser }) => {
  /** logUser is a token  */
  const [profileUser, setProfileUser] = useState({});
  const getUser = () => {
    const decoded = jwtDecode(logUser);
    setProfileUser(findUser(users, decoded.id));
  };

  const [messages, setMessages] = useState([]);
  const tokenAPI = `tariq__${logUser}`;
  const getMessages = async () => {
    const result = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages",
      { headers: { token: tokenAPI } }
    );
    if (result.data.message === "success") {
      setMessages(result.data.messages);
      console.log(result.data.messages);
    }
  };

  const deleteMessage = async (id) => {
    const result = await axios.delete(
      `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,
      { headers: { token: tokenAPI } }
    );
    toast.success('Deleted Successfully!');
    getMessages();
  };

  const shareProfile =  (e , url) => {
    e.preventDefault();
    copy(url);
  }

  useEffect(() => {
    getUser();
    getMessages();
  }, []);

  return (
    <React.Fragment>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <Link data-toggle="modal" data-target="#profile">
            <img src="/assets/images/avatar.png" className="avatar " />
          </Link>
          <h3 className="py-2 text-capitalize">{profileUser.userName}</h3>
          <button
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
            onClick={(e) => shareProfile(e, `http://localhost:3000/user/${profileUser._id}`)}
          >
            <i className="fas fa-share-alt" /> Share Profile
          </button>
        </div>
      </div>
      {/* =================messages=================== */}
      <div className="container text-center my-5 text-center">
        {messages.length === 0 ? (
          <div className="row">
            <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div className="row my-4" key={index}>
              <div className="col-md-12">
                <div className="card py-5 position-relative">
                  <p>{message.text}</p>
                  <div
                    className={style.deleteBtn}
                    onClick={() => deleteMessage(message._id)}
                  >
                    <i className="fa-solid fa-trash text-danger fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
