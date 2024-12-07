import axios from "axios";

export const getRentalItemsList = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/items`);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Item Fetch error: ", response.data);
        }
    } catch (err) {
        throw new Error("List items error: ", err);
    }
}

export const deleteRentalItem = async (id, token) => {
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

export const createRentalItem = async (itemName, itemRate, itemStock, token) => {
    if (!token) {
        throw new Error("User not valid");
    }
    if (!itemName || !itemRate || !itemStock) {
        throw new Error("Empty Create item parameters!!");
    }
    const data = {
        itemName,
        itemPrice: itemRate,
        stock: itemStock
    }
    try {
        const response = await axios.post(`http://localhost:4000/item/entry`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        if (response.status === 200) {
            return response.data;
        } else {
            return (response.data.message);
        }
    } catch (err) {
        throw new Error("Item Create Error: ", err);
    }
}

export const updateRentalItem = async (data, token) => {
    try {
        const response = await axios.put(`http://localhost:4000/item/${data.id}`, {
            name: data.name,
            rate: data.rate,
            stock: data.stock
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error(response);
        }
    } catch (err) {
        throw new Error('Error updating: ' + err);
    }
}

export const getCateringList = async () => {
    try {
        const response = await axios.get('http://localhost:4000/cateringpkgs');
        if (response.status === 200) {
            return response.data;
        }
        else {
            return "Couldn't get the data!!";
        }
    } catch (err) {
        throw new Error('Error Fetching the List: ', err);
    }
}

export const createCateringList = async (token, pkgname) => {
    try {
        const response = await axios.post('http://localhost:4000/cateringpkg', {
            pkg_name: pkgname,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

export const deleteCateringPkg = async (id, token) => {
    try {
        const response = await axios.delete(`http://localhost:4000/cateringpkg`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { id }
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

export const updateCateringPkg = async (id, pkgName, token) => {
    try {
        const response = await axios.put(`http://localhost:4000/cateringpkg/${id}`, {
            pkgName
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error('Failed Request: ' + error)
    }
}