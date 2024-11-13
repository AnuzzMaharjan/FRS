import axios from "axios";

export const getRentalItemsList = async () => {
    try {
        const response = await axios.get('http://localhost:4000/items');

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Item Fetch error: ", response.data);
        }
    } catch (err) {
        throw new Error("List items error: ",err);
    }
}

export const deleteRentalItem = async (id,token) => {
    try {
        const response = await axios.delete(`http://localhost:4000/item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Item Delete error: ", response.data);
        }
    } catch (err) {
        throw new Error("List item delete Error: ", err);
    }
}

export const createRentalItem = async (itemName, itemRate, itemStock) => {
    if (!itemName || !itemRate || !itemStock) {
        throw new Error("Empty Create item parameters!!");
    }
    const data = {
        itemName,
        itemPrice: itemRate,
        stock:itemStock
    }
    try {
        const response = await axios.post('http://localhost:4000/item/entry', data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (err) {
        throw new Error("Item Create Error: ", err);
    }
}