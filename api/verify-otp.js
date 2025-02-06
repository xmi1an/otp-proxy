// api/verify-otp.js

const axios = require("axios");
// add dotenv package
require("dotenv").config();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: false, message: "Method Not Allowed" });
  }

  const { phone_number, otp } = req.body;

  if (!phone_number || !otp) {
    return res
      .status(400)
      .json({ status: false, message: "Phone number and OTP are required" });
  }
try {
  const response = await axios.post(process.env.OTP_VERIFY_API_URL, {
    phone_number,
    otp,
  });

  // Modify the response data here
  const modifiedResponse = {
    status: response.data.status,
    message: response.data.message,
    created_by: "xmi1an",
  };

  return res.status(response.status).json(modifiedResponse);
} catch (error) {
  console.error("Error verifying OTP:", error.message);
  return res
    .status(500)
    .json({ status: false, message: "Internal Server Error" });
}
};
