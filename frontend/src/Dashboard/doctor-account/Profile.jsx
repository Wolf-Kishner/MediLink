import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  console.log(doctorData._id, "This is the id");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name || "",
      password: doctorData?.password ,
      email: doctorData?.email || "",
      phone: doctorData?.phone || "",
      gender: doctorData?.gender || "",
      specialization: doctorData?.specialization || "",
      ticketPrice: doctorData?.ticketPrice || 0,
      qualifications: doctorData?.qualifications || [],
      experiences: doctorData?.experiences || [],
      timeSlots: doctorData?.timeSlots || [],
      about: doctorData?.about || "",
    });
  }, [doctorData]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleReusableInputChange = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQualification = () => {
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChange("qualifications", index, event);
  };

  const deleteQualification = (index) => {
    deleteItem("qualifications", index);
  };

  const addExperience = () => {
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChange("experiences", index, event);
  };

  const deleteExperience = (index) => {
    deleteItem("experiences", index);
  };

  const addTimeSlot = () => {
    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChange("timeSlots", index, event);
  };

  const deleteTimeSlot = (index) => {
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-24px leading-9 mb-10">
        Profile Information
      </h2>

      <form onSubmit={updateProfileHandler}>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="form_input"
            readOnly
            aria-readonly
            disabled
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <p className="form_label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form_label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="form_input"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form_label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form_label">Starting Date *</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) => handleQualificationChange(e, index)}
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Ending Date *</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) => handleQualificationChange(e, index)}
                    className="form_input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <p className="form_label">Degree *</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    onChange={(e) => handleQualificationChange(e, index)}
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">University*</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    onChange={(e) => handleQualificationChange(e, index)}
                    className="form_input"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteQualification(index)}
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQualification}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form_label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form_label">Starting Date *</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Ending Date *</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form_input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <p className="form_label">Position *</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Hospital*</p>
                  <input
                    type="text"
                    name="hospital"
                    value={item.hospital}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form_input"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => deleteExperience(index)}
                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form_label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form_label">Day*</p>
                  <select
                    className="form_input py-3.5"
                    name="day"
                    value={item.day}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  >
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <p className="form_label">Starting Time *</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Ending Time *</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                    className="form_input"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => deleteTimeSlot(index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlot}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Time Slot
          </button>
        </div>
        <div className="mb-5">
          <p className="form_label">About You</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about You "
            onChange={handleInputChange}
            className="form_input"
          ></textarea>
        </div>
        <div className="flex mb-5 items-center gap-3">
          <div className="mt-7">
            <button
              type="submit"
              className="bg-primaryColor text-white text-[18px] leading-[30px] w-full px-4 py-3 rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
