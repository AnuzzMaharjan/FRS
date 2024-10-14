import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Test() {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then((response) => {
                setTestData(response.data);
            })
            .catch((error) => {
                console.error(error);
        })
    },[])

    return (
        <>
            { testData.length > 0 ? (
                <ul>
                    {testData.map((item, index) => (
                        <li key={index}>
                            {JSON.stringify(item)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available</p>
            )}
        </>
    );
}