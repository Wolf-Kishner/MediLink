import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Sucessfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update the data" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Sucessfully Deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    //To avoid sending passwords
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile information retrieved successfully",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // Step 1: retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.userId });

    // Step 2: extract doctor ids from appointment bookings
    const doctorIds = bookings.map((el) => el.doctor.id);

    // Step 3: retrieve doctors using relevant  doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get appointments",
    });
  }
};
