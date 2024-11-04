
import Logo from "../../assets/Logo.png";

export default function AdminHeader(){
    return (
        <>
            <div className="bg-zinc-500 flex justify-between items-center w-full px-5">
                <h2 className="text-2xl text-white font-serif">Friendship Rental service</h2>
                <div className="w-28 p-2">
                    <img src={ Logo} alt="" className="w-full" />
                </div>
            </div>
        </>  
    );
}