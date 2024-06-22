import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice.js";
import { useNavigate } from "react-router-dom";
import {HOST_URL} from '../../Constant.js'

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState();
  const [coverImage, setcoverImage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("FullName", fullName);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("avatar", avatar);
    formdata.append("coverImage", coverImage);

    await axios
      .post(`${HOST_URL}/api/v1/users/register`, formdata)
      .then((res) => navigate("/login"));
  };

  return (
    <div className="min-h-screen bg-[#000000] flex justify-center items-center">
      <div className="bg-[#0F0F0F] p-8 rounded-lg shadow-lg w-1/2 border border-[#2C2C2C]">
        <h2 className="text-2xl font-bold mb-6 text-white">Create your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="FullName"
            value={fullName}
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="file"
            placeholder="avatar"
            name="avatar"
            onChange={(e) => setavatar(e.target.files[0])}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="file"
            placeholder="coverImage"
            name="coverImage"
            onChange={(e) => setcoverImage(e.target.files[0])}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export { Register };
