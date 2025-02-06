// api/verify-otp.js

const axios = require("axios");

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
    // Optional: Add any authentication or rate limiting here

    const response = await axios.post(process.env.OTP_VERIFY_API_URL, {
      phone_number,
      otp,
    });

    // You can manipulate the response if needed
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
