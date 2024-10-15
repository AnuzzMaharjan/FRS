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

export default function PopupModal({ open, handleClose, task,onFormSubmit }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormDataSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: task === 'Signup' ? userName : "",
      email,
      password
    };
    onFormSubmit(data);
  }

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
            <form onSubmit={handleFormDataSubmit}>
              <input
                type="text"
                required
                className={`${task === 'Signup'?'':'hidden'} border w-full p-2 mt-3`}
                placeholder="Username"
                onChange={(e)=> setUserName(e.target.value)}
              />

              <input
                type="email"
                required
                className="border w-full p-2 mt-3"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
              />

              <input
                type="password"
                required
                className="border w-full p-2 mt-3"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />

              <button className={`mt-4 py-2 px-10 text-xl font-sans font-semibold text-white rounded-md ${task === "Signup" ? "bg-red-600" : "bg-blue-500"}`} type="submit">
                {task === "Signup" ? "Register" : "Login"}
              </button>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
