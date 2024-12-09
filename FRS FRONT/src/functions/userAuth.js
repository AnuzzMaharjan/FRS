import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "./cookie";

export const handleLogin = async (email, password) => {
    try {
        const response = await axios.post(
          `http://localhost:4000/login`,
          {
              email,
              password
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      if (response.data.success) {
        if (response.data.role === "admin") {
          setCookie('auth_token', response.data.token, 1);
          setCookie('userId', response.data.userId, 1);
          return {success:true,message:'Login success!'};
        } else {
          setCookie('auth_token', response.data.token, 3);
          setCookie('userId', response.data.userId,3);
          return {success:true,message:'Login success!'};
        }
        } else {
            return { success: false,message:response.data.message};
        }
      } catch (err) {
        return { success: false, message: `Error : ${err}` };
      }
}

export function handleLogout() {
    deleteCookie('auth_token');
    deleteCookie('userId');
    return false;
}

export const getUserData=async()=> {
    const auth_token = getCookie("auth_token");
    const userId = getCookie("userId");
    try {
      const response = await axios.get(`http://localhost:4000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
        if (response.data.success) {
            return response.data;
        } else {
            return { success: false, message: `${response.data.message}` };
      }
    } catch (err) {
      return {success:false,message:err}
    }
}