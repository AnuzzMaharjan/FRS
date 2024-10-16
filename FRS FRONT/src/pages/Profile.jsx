import { useEffect, useState } from "react";
import chef1 from "../assets/images/chef1.jpeg";
import PopupModal from "../components/PopupModal";
import axios from "axios";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkLoggedIn = () => {
    
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setIsLoggedIn(true);
        console.log(response);
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("uId", response.data.userId);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("Error loggin in: ", err);
      alert(err.response.data.message);
    }
  };

  const handleSignup = () => {};

  const handleGetUserInfo = async () => {
    // console.log(isLoggedIn);
    const auth_token = localStorage.getItem("auth_token");
    const userId = localStorage.getItem("uId");
    try {
      const response = await axios.get(`http://localhost:4000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      if (response.data.success) {
        setUserData(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err.response.message);
    }
  };

  const handleFormSubmission = async (data) => {
    setFormData(data);
    handleClose();
  };

  useEffect(() => {
    if (formData.task === "Login") {
      handleLogin();
    }
    if (isLoggedIn) {
      console.log(userData);
      handleGetUserInfo();
    }
  }, [formData,isLoggedIn]);

  useEffect(() => {
    
  }, []);

  const handleModalOpen = (task) => {
    setTask(task);
    handleOpen();
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
              {userData?.username || "Guest"}
            </h2>
            <p className="text-lg text-zinc-500">
              {userData?.email || "Guest Email"}
            </p>
            {isLoggedIn && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
