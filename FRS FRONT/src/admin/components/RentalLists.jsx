import { useEffect, useState } from "react";
import {
  createRentalItem,
  deleteRentalItem,
  getRentalItemsList,
  updateRentalItem,
} from "../../functions/adminFunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../functions/cookie";
import CloseIcon from '@mui/icons-material/Close';

export default function RentalLists() {
  const [formActive, setFormActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState();
  const [itemName, setItemName] = useState("");
  const [itemRate, setItemRate] = useState(0);
  const [itemStock, setItemStock] = useState(0);
  const [itemId, setItemId] = useState(0)

  useEffect(() => {
    getList();
  }, []);

  const deleteItem = async (id) => {
    let confirmation = confirm('Do you want to delete this item?');
    if (confirmation) {
      const result = await deleteRentalItem(id, getCookie("auth_token"));
      toast(result.message);
      getList();
    }
  };

  const toggleCreateItemForm = () => {
    setFormActive((prev) => !prev);
  };

  const handleCreateItemForm = async () => {

    const result = await createRentalItem(itemName, itemRate, itemStock,getCookie("auth_token"));
    toast(result.message);
    getList();
    setFormActive(false);
  };

  const handleEditSubmit = async() => {
    const data = {
      id: itemId,
      name: itemName,
      rate: parseInt(itemRate),
      stock: parseInt(itemStock)
    }
    
    const result = await updateRentalItem(data, getCookie("auth_token"));
    toast(result);
    getList();
    setModalOpen(false);
  };

  const togglePopup = (id, name, rate, stock) => {
    setItemName(name);
    setItemId(id);
    setItemRate(rate);
    setItemStock(stock);
    setModalOpen(!modalOpen);
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
            <button
              className="bg-blue-600 text-slate-200 px-3 py-1 rounded text-xs"
              onClick={(e) => {
                e.stopPropagation();
                togglePopup(
                  value.itemId,
                  value.itemName,
                  value.itemPrice,
                  value.stock
                );
              }}
            >
              {<EditIcon />}
            </button>
          </td>
        </tr>
      );
    });

    setItems(mappedData);
  }

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
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateItemForm();
              }}
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
              handleEditSubmit();
            }}
            className="relative"
          >
            <button type="button" className="absolute -top-4 -right-4" onClick={()=>setModalOpen(false)}><CloseIcon/></button>
            <fieldset className="border border-black py-4 px-6">
              <legend>Item Id: {itemId}</legend>

              <div className="m-3">
                <label htmlFor="name" className="font-bold font-sans text-base">
                  Item_name :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={itemName}
                  className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                  onChange={(e)=>setItemName(e.target.value)}
                />
              </div>
              <div className="m-3">
                <label htmlFor="rate" className="font-bold font-sans text-base">
                  Item_Rate :
                </label>
                <input
                  type="number"
                  name="rate"
                  id="rate"
                  value={itemRate}
                  className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                  onChange={(e)=>setItemRate(e.target.value)}
                />
              </div>
              <div className="m-3">
                <label
                  htmlFor="stock"
                  className="font-bold font-sans text-base"
                >
                  item_Stock :
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={itemStock}
                  className="border border-black rounded-sm py-1 px-2 font-sans ml-3 text-base"
                  onChange={(e)=>setItemStock(e.target.value)}
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
