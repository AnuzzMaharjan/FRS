import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteUser, getUsers } from "../../functions/adminFunctions";
import { getCookie } from "../../functions/cookie";

export default function UsersList() {
    const [modalOpen, setModalOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState("");

    const togglePopup = (id, name, email) => {
        setUserId(id);
        setUsername(name);
        setEmail(email);
        setModalOpen(!modalOpen);
      };
    
    const handleUserDelete = async (id) => {
        const result = await deleteUser(getCookie('auth_token'), id);

        toast(result);
        getAllUsers();
    }
    
    const getAllUsers = async () => {
        const result = await getUsers(getCookie('auth_token'));

        const mappedData = result.map((value, index) => {
            return (
                <tr key={index}>
                    <td className="border-x border-slate-400 px-4 py-[2px] text-center">
                        {value.userId}
                    </td>
                    <td className="border-x border-slate-400 px-4 py-[2px] text-center">
                        {value.username}
                    </td>
                    <td className="border-x border-slate-400 px-4 py-[2px] text-center">
                        {value.email}
                    </td>
                    <td className="border-x border-slate-400 px-4 py-[2px] text-center">
                        <button
                            className="bg-red-600 text-slate-200 px-3 py-1 rounded text-xs mr-2"
                            onClick={() => handleUserDelete(value.userId)}
                        >
                            {<DeleteIcon />}
                        </button>
                        <button
                            className="bg-blue-600 text-slate-200 px-3 py-1 rounded text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePopup(
                                    value.userId,
                                    value.username,
                                    value.email
                                );
                            }}
                        >
                            {<EditIcon />}
                        </button>
                    </td>
                </tr>
            )
        })
        setUserData(mappedData);
    }
    useEffect(() => {
        getAllUsers(); 
    }, [])
    


    return (
        <>
        <div>
          <ToastContainer />
          <table className="border-separate border-spacing-4">
            <thead>
              <tr>
                <th className="border-b border-slate-400 text-center py-2 px-4">
                  User Id
                </th>
                <th className="border-b border-slate-400 text-center py-2 px-4">
                  Username
                </th>
                <th className="border-b border-slate-400 text-center py-2 px-4">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>{userData}</tbody>
          </table>
        </div>
  
        {/* popup */}
        <div
          className={`fixed bg-zinc-500/40 w-full h-full top-0 left-0 z-10 ${
            modalOpen ? "" : "hidden"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 z-20 bg-white py-6 px-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                
              }}
              className="relative"
            >
              <button type="button" className="absolute -top-4 -right-4" onClick={()=>setModalOpen(false)}><CloseIcon/></button>
              <fieldset className="border border-black py-4 px-6">
                <legend>User Id : {userId}</legend>
  
                <div className="m-3">
                  <label htmlFor="username" className="font-bold font-sans text-base">
                    Username :
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                </div>
                <div className="m-3">
                  <label htmlFor="email" className="font-bold font-sans text-base">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Save"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md mx-3 text-base font-semibold"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </>
    );
}