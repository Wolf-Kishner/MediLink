import React from "react";
import { useContext, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "./../../context/AuthContext";

import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";

import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`, token);

  console.log(userData, "UserData");
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <FaUserCircle style={{ fontSize: "80px" }} />
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px]">{userData.name}</h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type :{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.bloodType}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-nd text-white "
                >
                  Logout
                </button>
                <button className="w-full mt-4 bg-red-600 p-3 text-[16px] leading-7 rounded-nd text-white ">
                  Delete Account
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`p-2 mr-5 px-5 rounded-md ${
                    tab === "bookings"
                      ? "bg-primaryColor text-white font-normal"
                      : "text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor"
                  }`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`py-2 px-5 rounded-md ${
                    tab === "settings"
                      ? "bg-primaryColor text-white font-normal"
                      : "text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor"
                  }`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
