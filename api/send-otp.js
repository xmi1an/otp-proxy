// api/send-otp.js

const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }

  const { phone_number } = req.body;

  if (!phone_number) {
    return res.status(400).json({ status: false, message: 'Phone number is required' });
  }

  try {
    // Optional: Add any authentication or rate limiting here

    const response = await axios.post(process.env.OTP_SEND_API_URL, {
      phone_number,
    });

    // You can manipulate the response if needed
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    return res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};
