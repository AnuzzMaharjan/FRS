import { useEffect, useState } from "react";
import chef1 from "../assets/images/chef1.jpeg";
import { getUserData, handleLogin, handleLogout } from "../functions/userAuth";
import { getCookie, isCookieExpired } from "../functions/cookie";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/signupForm";
import { createUser, getOtp } from "../functions/createUser";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({});
  const [otpResponse, setOtpResponse] = useState({});

  const handleFormSubmission = async (data) => {
    if (data.task === "Login") {
      userLogin(data.email, data.password);
    }
    if (data.task === "Signup") {
      if (otpResponse.success) {
        try {
          const response = await createUser(
            data.email,
            data.otp,
            otpResponse.token,
            data.password,
            data.username
          );
          
          if (response.success) {
            alert(response.message);
            userLogin(data.email, data.password);
          } else {
            alert(response.message);
          }
        } catch (err) {
          throw new Error("Signup Error: ", err);
        }
      } else {
        throw new Error(otpResponse.message);
      }
    }
  };

  const userLogin = async(email,password) => {
    try {
      const response = await handleLogin(email, password);
      if (!response.success) {
        throw new Error("Login Failed");
      }
      setIsLoggedIn(true);
    } catch (err) {
      throw new Error("Login Error: ", err);
    }
  }
  
  const checkLogin = () => {
    if (isCookieExpired("auth_token").expired || !getCookie("auth_token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleGetOtp = async (emailData) => {
    console.log(email, "emailstate");
    const response = await getOtp(emailData);
    if (response.data.success) {
      setOtpResponse(response.data);
    } else {
      console.log(response.data);
    }
  };

  // const handleVerifyOtp = async (email) => {
  //   console.log(email, "verify");
  //   if (otpResponse.success) {
  //     const response = await createUser(
  //       email,
  //       formData.otp,
  //       otpResponse.token,
  //       formData.password,
  //       formData.username
  //     );

  //     console.log(response);
  //   } else {
  //     console.log(otpResponse);
  //   }
  // };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await getUserData();
          setUserData({ ...response });
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

  const getEmailData = (data) => {
    console.log(data, "emaildata");
    setEmail(data);
    if (data && data != "") handleGetOtp(data);
  };

  return (
    <>
      <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-3 p-16 gap-8">
          <div className="p-5">
            <img
              src={chef1}
              alt="profile picture"
              className="w-full rounded-full outline-dashed outline-offset-4 outline-red-500"
            />
          </div>
          <div className="col-span-2 border-l-2 flex flex-col justify-start items-center pt-10">
            <h2 className="text-5xl font-semibold font-mono">
              {isLoggedIn ? userData?.username : "Guest_Guest"}
            </h2>
            <p className="text-lg text-zinc-500">
              {isLoggedIn ? userData?.email : "guest@example.com"}
            </p>
            {!isLoggedIn ? (
              <div className="mt-auto mb-8">
                <button
                  className="bg-red-600 py-3 px-10 rounded-md mr-5 text-white text-xl font-semibold transition hover:scale-105"
                  onClick={() => setSignupOpen(true)}
                >
                  Signup!
                </button>
                <button
                  className="bg-blue-600 py-3 px-10 rounded-md ml-5 text-white text-xl font-semibold transition hover:scale-105"
                  onClick={() => setLoginOpen(true)}
                >
                  Login!
                </button>
                {/* <PopupModal
                  open={open}
                  handleClose={handleClose}
                  task={task}
                  onFormSubmit={handleFormSubmission}
                /> */}
                <LoginForm
                  open={loginOpen}
                  handleClose={() => setLoginOpen(false)}
                  task="Login"
                  onFormSubmit={handleFormSubmission}
                />

                <SignupForm
                  open={signupOpen}
                  onReqOtp={setEmail}
                  handleClose={() => setSignupOpen(false)}
                  task="Signup"
                  onFormSubmit={handleFormSubmission}
                  sendEmailDatatoParent={getEmailData}
                />
              </div>
            ) : (
              <>
                <div className="flex justify-evenly w-full mt-8">
                  <div className="px-4 py-2 transition-shadow cursor-pointer hover:shadow-md">
                    <AccountBoxOutlinedIcon />
                    <span className="ml-3">Edit Profile</span>
                  </div>
                  <div className="px-4 py-2 transition-shadow cursor-pointer hover:shadow-md">
                    <ShoppingCartOutlinedIcon />
                    <span className="ml-3">Your Orders</span>
                  </div>
                  <div className="px-4 py-2 transition-shadow cursor-pointer hover:shadow-md">
                    <NotificationsNoneOutlinedIcon />
                  </div>
                </div>
                <button className="text-blue-900 mt-auto">
                  Forgot password?
                </button>
                <button
                  className="bg-blue-600 py-3 px-10 rounded-md ml-5 mt-auto mb-8 text-white text-xl font-semibold transition hover:scale-105"
                  onClick={() => {
                    handleLogout();
                    setIsLoggedIn(false);
                  }}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
