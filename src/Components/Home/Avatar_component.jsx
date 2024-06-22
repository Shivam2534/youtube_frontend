import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod.jsx";
import {HOST_URL} from '../../Constant.js'
// import { useDispatch } from "react-redux";
// import { Update_channel_data } from "../../Store/User_channel_data.js";

function Avatar_component({ user_id }) {
  const [Uservatar, setUservatar] = useState();
  // const dispatch = useDispatch();

  const getUserAvatar = async () => {
    const UserAvatar = await publicRequest
      .get(`${HOST_URL}/api/v1/users/GetSpecificUser/${user_id}`)
      .then((res) => res.data);

    setUservatar(UserAvatar);
  };

  useEffect(() => {
    getUserAvatar();
  }, []);

  return (
    <div className="w-10 h-10 overflow-hidden rounded-full">
      <img
        src={Uservatar?.data.avatar}
        alt="404"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export { Avatar_component };
