const User = require("../models/User");
const Task = require("../models/Task");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await Task.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.status(200).json({ status: true, msg: "Account deleted successfully." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
} 