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
        if (response.status === 200 ) {
            return response.data;
        }
    } catch (err) {
        if(err.response.status === 409) return (err.response.data);
        else {
            throw new Error('update error: '+err);
        }
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

export const createCateringList = async (token, pkgname,img_link = '') => {
    try {
        const response = await axios.post('http://localhost:4000/cateringpkg', {
            pkg_name: pkgname,
            img_link
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

export const updateCateringPkg = async (id, pkgName,img_link, token) => {
    try {
        const response = await axios.put(`http://localhost:4000/cateringpkg/${id}`, {
            pkgName,
            img_link
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

export const getSubPkg = async (parentId) => {
    try {
        const response = await axios.get(`http://localhost:4000/cateringpkg/${parentId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Something went wrong while fetching subpkgs!');
        }
    } catch (error) {
        throw new Error('Subpkg fetch failed: ' + error);
    }
}

export const createSubPkg = async (parentId, contents, token) => {
    try {
        const response = await axios.post(`http://localhost:4000/cateringsubpkg/${parentId}`, {
            contents
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        if (response.status === 200) {
            return response.data.result;
        } else {
            throw new Error('Failed to create Sub Package!');
        }
    } catch (error) {
        throw new Error('Create subPkg failed: ' + error);
    }
}

export const deleteSubPkg = async (subId, token) => {
    try {
        const response = await axios.delete(`http://localhost:4000/cateringsubpkg/${subId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return (response.data);
        }

    } catch (err) {
        throw new Error("Error while delete request: " + err);
    }
}

export const updateSubPkg = async (subId, pkg_id, sublist,token) => {
    if (!subId || !pkg_id || !sublist || !token) throw new Error('Missing parameters!');
    try {
        const response = await axios.put(`http://localhost:4000/cateringsubpkg/${subId}`, {
            pkg_id,
            sublist
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Couldnt Update the data!');
        }
    } catch (error) {
        throw new Error('Request failed: ' + error);
    }
}

export const getUsers = async (token) => {
    try {
        const response = await axios.get('http://localhost:4000/users', {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error('Failed to get Users:: '+ error);
    }
}

export const deleteUser = async (token, id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.message;

    } catch (error) {
        return error.response.data.message;
    }

}