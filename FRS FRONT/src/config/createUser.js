import axios from "axios"

export const getOtp = (email) => {
    try {
        const response = axios.post('http://localhost:4000/generateotp', {
            email
        })
        return response;
    }
    catch (err) {
        console.log(err);
    }
}
export const createUser = async(email,otp,token,password,username) => {
    try {
        const response = await axios.post('http://localhost:4000/signup', {
            username,
            email,
            password,
            otp: Number(otp),
            token
        }, { withCredentials: true });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}