import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod.jsx";
import { HOST_URL } from "../../Constant.js";
import toast from "react-hot-toast";

function Login() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchedData = await publicRequest
      .post(`${HOST_URL}/api/v1/users/login`, {
        username,
        email,
        password,
      })
      .then((res) => res.data);
    localStorage.setItem("Authorization", fetchedData.data.accesstoken);
    if (fetchedData) {
      dispatch(login(fetchedData.data.user));
      navigate("/");
      toast.success("Login Successfull");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex justify-center items-center">
      <div className="bg-[#0F0F0F] p-8 rounded-lg shadow-lg w-1/3 border border-[#2C2C2C]">
        <h2 className="text-2xl font-bold mb-6 text-white">Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export { Login };
