import { useEffect, useState } from "react";
import chef1 from "../assets/images/chef1.jpeg";
import { getUserData, handleLogin, handleLogout } from "../config/userAuth";
import { getCookie, isCookieExpired } from "../config/cookie";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/signupForm";
import { createUser, getOtp } from "../config/createUser";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [task, setTask] = useState("");
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [otpResponse, setOtpResponse] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmission = async (data) => {
    setFormData(data);
  };

  const handleModalOpen = (task) => {
    setTask(task);
    handleOpen();
  };

  const checkLogin = () => {
    if (isCookieExpired("auth_token").expired || !getCookie("auth_token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  // const handleGetOtp = async (email) => {
  //   const response = await getOtp(email);
  //   if (response.data.success) {
  //     setOtpResponse(response.data);
  //   }
  // };

  // const handleVerifyOtp = async (email) => {
  //   if (otpResponse.success) {
  //     const response = createUser(
  //       email,
  //       otpResponse.otp,
  //       otpResponse.token,
  //       formData.password,
  //       formData.username
  //     );
  //     console.log(response);
  //   }
  // };

  // useEffect(() => {
  //   console.log(otpResponse);
  //   handleVerifyOtp("maharjananuzz6@gmail.com");
  // }, [otpResponse]);

  useEffect(() => {
    const login = async () => {
      if (formData.task === "Login") {
        try {
          const response = await handleLogin(formData.email, formData.password);
          if (!response.success) {
            throw new Error("Login Failed");
          }
          setIsLoggedIn(true);
        } catch (err) {
          console.log(err);
        } finally {
          setFormData({});
        }
      }
    };
    login();
  }, [formData.task]);

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
              <LoginForm open={loginOpen} handleClose={()=>setLoginOpen(false)} task="Login" onFormSubmit={handleFormSubmission} />
  
                <SignupForm open={signupOpen} handleClose={()=>setSignupOpen(false)} task="Signup" onFormSubmit={handleFormSubmission} />
  
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
