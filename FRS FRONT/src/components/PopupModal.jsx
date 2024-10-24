import LoginForm from "./LoginForm";
import SignupForm from "./signupForm";

export default function PopupModal({ open, handleClose, task, onFormSubmit }) {
  if (task === 'Login') {
    return <LoginForm open={open} handleClose={handleClose} task="Login" onFormSubmit={onFormSubmit} />
  } else {
    return <SignupForm open={open} handleClose={handleClose} task="Signup" onFormSubmit={onFormSubmit} />
  }
}
