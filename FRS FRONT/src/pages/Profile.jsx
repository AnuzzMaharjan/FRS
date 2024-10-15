import { useEffect, useState } from "react";
import chef1 from "../assets/images/chef1.jpeg";
import PopupModal from "../components/PopupModal";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        pasword: ''
    });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = () => {};

  const handleGetUserInfo = () => {};

  const handleFormSubmission = (data) => {
       setFormData(data);
      handleClose();
  };

    useEffect(() => {
        console.log(formData);
    },[formData])
    const handleModalOpen = (task) => {
        setTask(task);
        handleOpen();
        console.log(formData);
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
            <h2 className="text-5xl font-semibold font-mono">Guest_Guest</h2>
            <p className="text-lg text-zinc-500">guest@example.com</p>
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
                              onFormSubmit = {handleFormSubmission}
                          />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
