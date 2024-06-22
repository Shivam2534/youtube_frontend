import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod.jsx";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {HOST_URL} from '../../Constant.js'

function Fullname_feching_component({ user_id }) {
  const [UserFullname, setUserFullname] = useState("");

  const getUserFullname = async () => {
    const UserFullname = await publicRequest
      .get(`${HOST_URL}/api/v1/users/GetSpecificUser/${user_id}`)
      .then((res) => res.data);

    setUserFullname(UserFullname.data.FullName);
    // console.log("userFullname is- ", UserFullname.data.FullName);
  };

  useEffect(() => {
    getUserFullname();
  }, []);

  return (
    <>
      {UserFullname} <RiVerifiedBadgeFill />
    </>
  );
}

export { Fullname_feching_component };
