import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice.js";
import { userRequest } from "../../requestMethod.jsx";
import { HOST_URL } from "../../Constant.js";
import toast from "react-hot-toast";

function Logout() {
  const dispatch = useDispatch();
  const [msg, setmsg] = useState("");

  const Logoutuser = async () => {
    const fetchedvalue = await userRequest
      .post(`${HOST_URL}/api/v1/users/logout`)
      .then((res) => res.data)
      .catch((error) => console.log(error));

    setmsg(fetchedvalue.message);

    console.log(fetchedvalue);

    if (!Logoutuser.data) {
      console.log("No data found");
      dispatch(logout(null));
      localStorage.removeItem("Authorization");
      toast.success("logout successfully");
    }
  };

  useEffect(() => {
    Logoutuser();
  }, []);

  return <div className="text-white mt-20">{msg}</div>;
}

export { Logout };
