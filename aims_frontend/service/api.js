import axios from 'axios';

const backend_api_url = process.env.NEXT_PUBLIC_BACKEND_API;

export async function sendEmail(email) {
  try {
    const response = await axios.post(`${backend_api_url}/check-email`, { email });
    console.log(response.otp);
    console.log("Email sent successfully!");
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('type' in data) || !('otp' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    // if (!data.exists) {
    //   return { exists: false };
    // }

    return { exists: true, role: data.type, otp: data.otp }; // Assuming the backend sends the OTP back.
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
}
