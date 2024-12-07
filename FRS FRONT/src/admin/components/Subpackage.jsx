import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createSubPkg,
  deleteSubPkg,
  getSubPkg,
  updateSubPkg,
} from "../../functions/adminFunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { getCookie } from "../../functions/cookie";
import { toast, ToastContainer } from "react-toastify";

export default function Subpackage() {
  const { pkgId } = useParams();

  const [formActive, setFormActive] = useState(false);
  const [subPkgContents, setSubPkgContents] = useState("");
  const [parentId, setParentId] = useState(pkgId);
  const [modalOpen, setModalOpen] = useState(false);
  const [subPkgs, setSubPkgs] = useState([]);
  const [subList, setSubList] = useState("");
  const [subId, setSubId] = useState("");

  const fetchSubPkgs = async () => {
    const [result] = await getSubPkg(parseInt(pkgId));

    setSubPkgs(result);
  };

  const toggleCreateSubPkgForm = () => {
    setFormActive(!formActive);
  };

  const handleCreateSubpkg = async () => {
    let newContents = subPkgContents.includes("\n")
      ? subPkgContents.split("\n")
      : [subPkgContents];
    console.log(newContents);
    const result = await createSubPkg(
      pkgId,
      newContents,
      getCookie("auth_token")
    );
    result.forEach((res) => {
      toast(`${res.text} => result: ${res.result}`);
    });
    setSubPkgContents("");
      fetchSubPkgs();
      setFormActive(false);
  };

  const handleDeleteSubPkg = async (subId) => {
    let confirmation = confirm("Do you want to delete this subPkg?");
    if (confirmation) {
      const result = await deleteSubPkg(subId, getCookie("auth_token"));

      toast(result);
      fetchSubPkgs();
    }
  };

    const handleEditSubPkgSubmit = async () => {
        const result = await updateSubPkg(parseInt(subId), parseInt(parentId), subList, getCookie('auth_token'));

        fetchSubPkgs();
        toast(result);
        setModalOpen(false);
  };

  useEffect(() => {
    fetchSubPkgs();
  }, [pkgId]);
  return (
    <>
      <ToastContainer />
      <div className="flex justify-end flex-wrap">
        <div className="basis-1/4">
          <button
            className="bg-blue-600 text-slate-200 py-2 px-3 rounded block"
            onClick={toggleCreateSubPkgForm}
          >
            {formActive ? "Close Form" : "Create Subpkg"}
          </button>
        </div>
        <div className="block basis-3/4">
          <form
            className={`${formActive ? "block" : "hidden"}`}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSubpkg();
            }}
          >
            <input
              type="number"
              placeholder="Parent Id"
              className="border border-slate-400 m-1 rounded py-1 px-2 focus:outline outline-slate-600"
              value={pkgId}
              onChange={(e) => setParentId(e.target.value)}
              required
            />
            <textarea
              placeholder="Contents"
              className="border border-slate-400 m-1 w-full rounded py-1 px-2 focus:outline outline-slate-600"
              value={subPkgContents}
              onChange={(e) => setSubPkgContents(e.target.value)}
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
      {subPkgs.length > 0 ? (
        <div className="bg-zinc-200 py-2 px-5 my-5 outline outline-1 outline-zinc-400 -outline-offset-8">
          <table className="border-separate border-spacing-4">
            <thead>
              <tr>
                <th className="border-b border-slate-400 text-center py-2 px-2">
                  sublist_id
                </th>
                <th className="border-b border-slate-400 text-center py-2 px-2">
                  pkg_id
                </th>
                <th className="border-b border-slate-400 text-center py-2 px-2">
                  sublist
                </th>
              </tr>
            </thead>
            <tbody>
              {subPkgs.map((value, index) => {
                return (
                  <tr key={index}>
                    <td className="border-x border-slate-400 px-2 py-[2px] text-center">
                      {value.sublist_id}
                    </td>
                    <td className="border-x border-slate-400 px-2 py-[2px] text-center">
                      {value.pkg_id}
                    </td>
                    <td className="border-x border-slate-400 px-2 py-[2px] text-center max-w-48">
                      {value.sublist}
                    </td>
                    <td className="border-x border-slate-400 px-2 py-[2px] text-center">
                      <button
                        className="bg-red-600 text-slate-200 px-3 py-1 rounded text-xs mr-2"
                        onClick={() => handleDeleteSubPkg(value.sublist_id)}
                      >
                        {<DeleteIcon />}
                      </button>
                      <button
                        className="bg-blue-600 text-slate-200 px-3 py-1 rounded text-xs"
                        onClick={() => {
                          setSubId(value.sublist_id);
                            setSubList(value.sublist);
                            setModalOpen(true);
                        }}
                      >
                        {<EditIcon />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-5">
          <p>No Subpackages found</p>
        </div>
      )}

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
              handleEditSubPkgSubmit();
            }}
            className="relative"
          >
            <button
              type="button"
              className="absolute -top-4 -right-4"
              onClick={() => setModalOpen(false)}
            >
              <CloseIcon />
            </button>
            <fieldset className="border border-black py-4 px-6">
              <legend>Item Id: {subId}</legend>

              <div className="m-3">
                <label htmlFor="name" className="font-bold font-sans text-base">
                  pkg_id :
                </label>
                <input
                  type="number"
                  name="name"
                  id="name"
                  value={parentId}
                  className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                  onChange={(e) => setParentId(e.target.value)}
                />
              </div>
              <div className="m-3">
                <label htmlFor="name" className="font-bold font-sans text-base">
                  sublist :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={subList}
                  className="w-4/5 border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                  onChange={(e) => setSubList(e.target.value)}
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
