import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getRentalItemsList } from "../functions/adminFunctions";

export default function Test() {
    const [items, setItems] = useState();
    
    async function getList() {
        const result = await getRentalItemsList();
        
        const mappedData = result.map((value, index) => {
            return (<tr key={index}>
                <td>{value.itemName}</td>
                <td>{value.itemPrice}</td>
                <td>{value.stock}</td>
            </tr>
            )
        });

        setItems(mappedData);
    }


    return (
        <>
            <button onClick={getList}>click</button>
            <table>
                <tbody>
                { items}
                </tbody>
            </table>
        </>
    );
}