import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Test() {
    const [testData, setTestData] = useState([]);

    const handleLogin = async() => {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email:"user1@dummy.com",
                password:"123456789"
            },
                {
                    headers: {
                    "Content-Type":"application/json"
                }
            }
            )
            localStorage.setItem('token', response.data.token);
            getUserData(response.data.userId);
        } catch (err) {
            console.log('Error', err);
            setTestData(err.response.data);
        }
    }

    const getUserData = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:4000/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setTestData(response.data);
        } catch (err) {
            console.log('Error getting user data!', err);
            setTestData(err.response.data);
        }
    }

    useEffect(() => {
        handleLogin();
    },[])

    return (
        <>
            {console.log(testData,)}
            {testData.success ?
                <p>{JSON.stringify(testData)}</p> : <p>{testData.message}</p>}
            
        </>
    );
}