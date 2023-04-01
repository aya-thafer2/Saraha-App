import axios from "axios";
import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import findUser from "../../utils/findUser";

const UserProfile = ({users}) => {
  const { id } = useParams();
  const [inputField, setInputField] = useState("");
  const [user, setUser] = useState(findUser(users, id));

  const onChange = (e) => {
    const { value } = e.target;
    setInputField(value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const apiURL =
      `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/` + id;
    const result = await axios.post(apiURL, { message: inputField });
    if(result.data.message === "success") {
      toast.success("Sent Successfully!");
    }
  };

  const shareProfile = (e, url) => {
    e.preventDefault();
    copy(url);
  };

  console.log(user); 

  return (
    <div className="container text-center py-5 my-5 text-center">
      <div className="card py-5 mb-5">
        <Link data-toggle="modal" data-target="#profile">
          <img
            src="/assets/images/avatar.png"
            className="avatar "
            alt="avatar"
          />
        </Link>
        <h3 className="py-2 text-capitalize">{user.userName}</h3>
        <div className="container w-50 m-auto">
          <form method="post" onSubmit={submitForm}>
            <textarea
              className="form-control"
              cols={10}
              rows={9}
              placeholder="Write your message here..."
              defaultValue={inputField}
              onChange={onChange}
            />
            <button className="btn btn-outline-info mt-3" type="submit" >
              <i className="far fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
      <button
        data-toggle="modal"
        data-target="#share"
        className="btn btn-default-outline share "
        onClick={(e) => shareProfile(e, window.location)}
      >
        <i className="fas fa-share-alt" /> Share Profile
      </button>
    </div>
  );
};

export default UserProfile;
