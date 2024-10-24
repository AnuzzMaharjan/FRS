import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createUser, getOtp } from "../config/createUser";

export default function Test() {
    const [otpResponse, setOtpResponse] = useState({});
    const [testData, setTestData] = useState([]);

    const handleGetOtp = async (email)=>{
        const response = await getOtp(email);
        if (response.data.success) {
            setOtpResponse(response.data);
        }
    }

    const handleVerifyOtp = async (email) => {
        if (otpResponse.success) {
            const response = createUser(email, otpResponse.otp, otpResponse.token,'asdf','Anuj Maharjan');
            console.log(response);
        }
    }
    
    useEffect(() => {
        console.log(otpResponse);
        handleVerifyOtp("maharjananuzz6@gmail.com")
    }, [otpResponse]);

    return (
        <>
            <button onClick={()=>handleGetOtp("maharjananuzz6@gmail.com")}>click</button>
            
        </>
    );
}