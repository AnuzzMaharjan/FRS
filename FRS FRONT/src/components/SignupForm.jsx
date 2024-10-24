import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignupForm({ open, handleClose, task, onFormSubmit }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSignupForm = (e) => {
    e.preventDefault();

    const data = {
      username: userName,
      email,
      password,
        task,
      otp
    };

    onFormSubmit(data);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {task}
          </Typography>
          <Container id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSignupForm}>
              <input
                type="text"
                className="border w-full p-2 mt-3"
                placeholder="Username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />

              <input
                type="email"
                required
                className="border w-full p-2 mt-3"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                required
                className="border w-full p-2 mt-3"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <input
                  type="number"
                  className="border w-1/2 p-2 mt-3"
                  placeholder="OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="text-blue-600 w-1/2 underline">Request Otp</button>
              </div>
              <button
                className="mt-4 py-2 w-full px-10 text-xl font-sans font-semibold text-white rounded-md bg-red-600"
                type="submit"
              >
                Register
              </button>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
