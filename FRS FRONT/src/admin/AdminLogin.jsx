import { handleLogin } from "../config/userAuth";
import { useState } from "react";
import AdminHeader from "./components/AdminHeader";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

  async function handleAdminLogin(e) {
    e.preventDefault();

      const response = await handleLogin(email, password);
      if (response.success) {
          navigate('dashboard');
        } else {
          alert(response.message);
      }
  }

  return (
    <>
      <div className="absolute w-full">
      <AdminHeader />
      </div>
      <div className="bg-zinc-200 h-svh flex justify-center items-center">
        <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded">
          <label htmlFor="aEmail" className="text-xl font-semibold">
            Email:
          </label>
          <br />
          <input
            type="email"
            id="aEmail"
            placeholder="Email"
            className="mt-2 mb-4 border border-zinc-500 rounded p-2 w-64"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="aPassword" className="text-xl font-semibold">
            Password:
          </label>
          <br />
          <input
            type="password"
            id="aPassword"
            placeholder="Password"
            className="mt-2 mb-4 border border-zinc-500 rounded p-2 w-64"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button
            type="submit"
            className="bg-blue-600 py-2 px-6 text-white font-semibold rounded"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
