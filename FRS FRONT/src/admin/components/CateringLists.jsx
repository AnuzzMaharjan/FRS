import { useEffect, useState } from "react";
import { getCookie } from "../../functions/cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import {
  createCateringList,
  deleteCateringPkg,
  getCateringList,
  updateCateringPkg,
} from "../../functions/adminFunctions";
import CloseIcon from "@mui/icons-material/Close";
import { Outlet, useNavigate } from "react-router-dom";

export default function CateringLists() {
  const [cateringPkgs, setCateringPkgs] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pkgName, setPkgName] = useState("");
  const [pkgId, setPkgId] = useState(0);

  const navigate = useNavigate();

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
    let confirmation = confirm('Do you wish to delete this package and all its sub packages?');
    if (confirmation) {
      const token = getCookie("auth_token");
      const result = await deleteCateringPkg(id, token);
      toast(result);
      getAllPkgs();
    }
  };

  const handleEditPkgSubmit = async () => {
    const result = await updateCateringPkg(pkgId, pkgName, getCookie("auth_token"));

    toast(result);
    getAllPkgs();
    setPkgId(0);
    setPkgName("");
    setModalOpen(false);
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
          <button
            type="button"
            onClick={() => navigate(`${value.pkg_id}`)}
            className="bg-orange-600 rounded py-1 px-5 text-white"
          >
            {value.subpkgs.length}
          </button>
        </td>
        <td className="border-x border-slate-400 px-4 py-[2px] text-center">
          <button
            className="bg-red-600 text-slate-200 px-3 py-1 rounded text-xs mr-2"
            onClick={() => {
              deletepkg(value.pkg_id);
            }}
          >
            {<DeleteIcon />}
          </button>
          <button
            className="bg-blue-600 text-slate-200 px-3 py-1 rounded text-xs"
            onClick={() => {
              setPkgName(value.pkg_name);
              setPkgId(value.pkg_id);
              setModalOpen(true);
            }}
          >
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
      <div className="flex">
        <div className="basis-1/2">
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
        </div>

        <div className="basis-1/2">
          <Outlet />
        </div>
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
              handleEditPkgSubmit();
            }}
            className="relative"
          >
            <button type="button" className="absolute -top-4 -right-4" onClick={()=>setModalOpen(false)}><CloseIcon/></button>
            <fieldset className="border border-black py-4 px-6">
              <legend>Item Id: { pkgId }</legend>

              <div className="m-3">
                <label htmlFor="name" className="font-bold font-sans text-base">
                  Item_name :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={pkgName}
                  className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                  onChange={(e)=>setPkgName(e.target.value)}
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
