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

export async function addCourse(courseData) {
  try {
    const response = await axios.post(`${backend_api_url}/add-course`, courseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
}

export async function getCourses(email) {
  try {
    const response = await axios.get(`${backend_api_url}/courses`, {
      params: { email }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('courses' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching courses:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await axios.delete(`${backend_api_url}/courses/${courseId}`);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function getEnrollmentRequests() {
  try {
    const response = await axios.get(`${backend_api_url}/enrollment-requests`);
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('requests' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching enrollment requests:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function respondToEnrollmentRequest(requestId, isApproved) {
  try {
    const response = await axios.post(`${backend_api_url}/enrollment-requests/respond`, {
      requestId,
      isApproved
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    console.error('Error responding to enrollment request:', error.response ? error.response.data : error.message);
    throw error;
  }
}
