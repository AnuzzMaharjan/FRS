import { useEffect, useState } from "react";
import { getCookie } from "../../functions/cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import {
  createCateringList,
  deleteCateringPkg,
  getCateringList,
} from "../../functions/adminFunctions";

export default function CateringLists() {
  const [cateringPkgs, setCateringPkgs] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [pkgName, setPkgName] = useState("");

  const getAllPkgs = async () => {
    const cateringList = await getCateringList();
    setCateringPkgs(cateringList);
  };
  const createPkg = async (e) => {
    e.preventDefault();

    const token = getCookie("auth_token");
    const result = await createCateringList(token, pkgName);
    toast(result);
    setPkgName("");
    getAllPkgs();
  };

  const deletepkg = async (id) => {
    const token = getCookie("auth_token");
    const result = await deleteCateringPkg(id, token);
    toast(result);
    getAllPkgs();
  }

  const mappedPkgs = cateringPkgs.map((value, index) => {
    return (
      <tr key={index}>
        <td className="border-x border-slate-400 px-4 py-[2px] text-center">
          {value.pkg_id}
        </td>
        <td className="border-x border-slate-400 px-4 py-[2px] text-center">
          {value.pkg_name}
        </td>
        <td className="border-x border-slate-400 px-4 py-[2px] text-center">
          <button className="bg-orange-600 rounded py-1 px-5 text-white">
            {value.subpkgs.length}
          </button>
        </td>
        <td className="border-x border-slate-400 px-4 py-[2px] text-center">
          <button className="bg-red-600 text-slate-200 px-3 py-1 rounded text-xs mr-2" onClick={()=>{deletepkg(value.pkg_id)}}>
            {<DeleteIcon />}
          </button>
          <button className="bg-blue-600 text-slate-200 px-3 py-1 rounded text-xs">
            {<EditIcon />}
          </button>
        </td>
      </tr>
    );
  });

  const toggleCreateItemForm = () => {
    setFormActive((prev) => !prev);
  };

  useEffect(() => {
    getAllPkgs();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex justify-end">
        <div className="basis-full ">
          <button
            className="bg-blue-600 text-slate-200 py-2 px-4 rounded block"
            onClick={toggleCreateItemForm}
          >
            {formActive ? "Close Form" : "Create an Item"}
          </button>
        </div>
        <div className="block">
          <form
            className={`${formActive ? "block" : "hidden"} flex`}
            onSubmit={createPkg}
          >
            <input
              type="text"
              placeholder="Package Name"
              className="border border-slate-400 m-1 rounded py-1 px-2 focus:outline outline-slate-600"
              value={pkgName}
              onChange={(e) => setPkgName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-1 m-1 px-6 rounded"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <div>
        <table className="border-separate border-spacing-4">
          <thead>
            <tr>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Pkg_id
              </th>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Pkg_name
              </th>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Subpkgs
              </th>
            </tr>
          </thead>
          <tbody>{mappedPkgs}</tbody>
        </table>
      </div>
    </>
  );
}
