import { useEffect, useState } from "react";
import { getRentalItemsList } from "../functions/adminFunctions";
import { Link, Outlet } from "react-router-dom";

export default function Rental() {
    const [firstItemBlock, setFirstItemBlock] = useState([]);
    const [secondItemBlock, setSecondItemBlock] = useState([]);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);

    const getItemsList = async () => {
        const result = await getRentalItemsList();
        
        if (result.length > 20) {
            setFirstItemBlock(result.slice(0,5));
            setSecondItemBlock(result.slice(5));
        } else {
            setFirstItemBlock(result);
        }
    }

    useEffect(() => {
        getItemsList();
        setPrivacyPolicy(false);
    }, [])

    const firstMappedData = firstItemBlock?.map((value, index) => {
        return (
            <tr key={index}>
                <td className="border border-slate-400">{ index+1 }</td>
                <td className="border border-slate-400">{ value.itemName}</td>
                <td className="border border-slate-400">{ value.itemPrice}</td>
                <td className="border border-slate-400 max-w-16"><input type="number" className="w-full text-center focus:outline-none" /></td>
                <td className="border border-slate-400 max-w-16"><input type="number" className="w-full text-center focus:outline-none" /></td>
            </tr>
        )
    }) || 'No Items found!!';
    const secondMappedData = secondItemBlock?.map((value, index) => {
        return (
            <tr key={index}>
                <td className="border border-slate-400">{ index }</td>
                <td className="border border-slate-400">{ value.itemName}</td>
                <td className="border border-slate-400">{ value.itemPrice}</td>
                <td className="border border-slate-400 max-w-16"><input type="number" className="w-full text-center focus:outline-none" /></td>
                <td className="border border-slate-400 max-w-16"><input type="number" className="w-full text-center focus:outline-none" /></td>
            </tr>
        )
    }) || '';

    return (
        <>
            <div className="flex flex-wrap gap-[2%]">
                <table className="basis-[49%] text-center border-collapse">
                    <thead>
                    <tr>
                        <th className="border-b border-slate-400">S.N.</th>
                        <th className="border-b border-slate-400">Item Name</th>
                        <th className="border-b border-slate-400">Item Rate</th>
                        <th className="border-b border-slate-400">Units</th>
                        <th className="border-b border-slate-400">Days</th>
                    </tr>
                    </thead>
                    <tbody>
                        {firstMappedData}
                    </tbody>
                </table>

                <table className="basis-[49%] border-collapse">
                <thead>
                    <tr>
                        <th className="border-b border-slate-400">S.N.</th>
                        <th className="border-b border-slate-400">Item Name</th>
                        <th className="border-b border-slate-400">Item Rate</th>
                        <th className="border-b border-slate-400">Units</th>
                        <th className="border-b border-slate-400">Days</th>
                    </tr>
                    </thead>
                    <tbody>
                        {secondMappedData}
                    </tbody>
                </table>
            </div>
            <div>
                <input type="radio" onChange={(e) => setPrivacyPolicy(true)} />
                I have read all the <Link to="/terms&conditions">terms & conditions</Link>
            </div>
        </>  
    );
}