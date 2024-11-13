import { useEffect, useState } from "react";
import {
  createRentalItem,
  deleteRentalItem,
  getRentalItemsList,
} from "../../config/adminFunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from '../../config/cookie';

export default function RentalLists() {
  const [formActive, setFormActive] = useState(false);
  const [items, setItems] = useState();
  const [itemName, setItemName] = useState("");
  const [itemRate, setItemRate] = useState("");
  const [itemStock, setItemStock] = useState("");

  const deleteItem = async (id) => {
    const result = await deleteRentalItem(id,getCookie('auth_token'));
    toast(result.message);
    getList();
  };

  const toggleCreateItemForm = () => {
    setFormActive((prev) => !prev);
  };

  const handleCreateItemForm = async (e) => {
    e.preventDefault();

    const result = await createRentalItem(itemName, itemRate, itemStock);
    toast(result.message);
    setFormActive(false);
  };

  async function getList() {
    const result = await getRentalItemsList();

    const mappedData = result.map((value, index) => {
      return (
        <tr key={index}>
          <td className="border-x border-slate-400 px-4 py-[2px] text-center">
            {value.itemId}
          </td>
          <td className="border-x border-slate-400 px-4 py-[2px] text-center">
            {value.itemName}
          </td>
          <td className="border-x border-slate-400 px-4 py-[2px] text-center">
            {value.itemPrice}
          </td>
          <td className="border-x border-slate-400 px-4 py-[2px] text-center">
            {value.stock}
          </td>
          <td className="border-x border-slate-400 px-4 py-[2px] text-center">
            <button
              className="bg-red-600 text-slate-200 px-3 py-1 rounded text-xs mr-2"
              onClick={() => deleteItem(value.itemId)}
            >
              {<DeleteIcon />}
            </button>
            <button className="bg-blue-600 text-slate-200 px-3 py-1 rounded text-xs">
              {<EditIcon />}
            </button>
          </td>
        </tr>
      );
    });

    setItems(mappedData);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div>
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
              onSubmit={handleCreateItemForm}
              className={`${formActive ? "block" : "hidden"}`}
            >
              <input
                type="text"
                placeholder="Item Name"
                className="border border-slate-400 m-1 rounded py-1 px-2 focus:outline outline-slate-600"
                onChange={(e) => setItemName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Rate"
                className="border border-slate-400 m-1 rounded py-1 px-2 focus:outline outline-slate-600"
                onChange={(e) => setItemRate(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Stock"
                className="border border-slate-400 m-1 rounded py-1 px-2 focus:outline outline-slate-600"
                onChange={(e) => setItemStock(e.target.value)}
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
        <table className="border-separate border-spacing-4">
          <thead>
            <tr>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Item_Id
              </th>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Item_Name
              </th>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Item_Rate
              </th>
              <th className="border-b border-slate-400 text-center py-2 px-4">
                Item_Stock
              </th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    </>
  );
}
