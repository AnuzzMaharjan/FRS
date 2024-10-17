import { useEffect, useState } from "react";
import chef1 from "../assets/images/chef1.jpeg";
import PopupModal from "../components/PopupModal";
import { getUserData, handleLogin, handleLogout } from "../config/userAuth";
import { getCookie, isCookieExpired } from "../config/cookie";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignup = () => {};

  const handleFormSubmission = async (data) => {
    setFormData(data);
    handleClose();
  };

  const handleModalOpen = (task) => {
    setTask(task);
    handleOpen();
  };

  const checkLogin = () => {
    if (isCookieExpired("auth_token").expired || !getCookie('auth_token')) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (formData.task === "Login") {
      handleLogin(formData.email, formData.password).then((response) => {
        if (!response.success) {
          throw new Error("Login Failed");
        } else {
          setIsLoggedIn(response.success);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }, [formData]);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData().then(response=>setUserData({...response})).catch(err=>console.log(err));
    }
  }, [isLoggedIn])
  

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
                  onClick={() => handleModalOpen("Signup")}
                >
                  Signup!
                </button>
                <button
                  className="bg-blue-600 py-3 px-10 rounded-md ml-5 text-white text-xl font-semibold transition hover:scale-105"
                  onClick={() => handleModalOpen("Login")}
                >
                  Login!
                </button>
                <PopupModal
                  open={open}
                  handleClose={handleClose}
                  task={task}
                  onFormSubmit={handleFormSubmission}
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
                <button className="bg-blue-600 py-3 px-10 rounded-md ml-5 mt-auto mb-8 text-white text-xl font-semibold transition hover:scale-105"
                  onClick={() => {
                  setIsLoggedIn(handleLogout())
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
