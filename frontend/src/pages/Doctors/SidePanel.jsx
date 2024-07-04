import React from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const handleBooking = async (e) => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + "Please Try again later");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
           $ {ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text-para mt-0 font-semibold">Available Time Slots:</p>

        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day}
              </p>
              <p className="text-[15px] leading-6">
                {convertTime(item.startingTime)} -{convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
        <button onClick={handleBooking} className="btn px-2 w-full rounded-md">
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
