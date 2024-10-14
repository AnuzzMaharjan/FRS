import ImageBanner from "../components/ImageBanner";
import { NavLink, Outlet } from "react-router-dom";

export default function Services() {
    return (
        <>
            <ImageBanner title={'Our Services'} />
            <div className="container mx-auto mt-20">
                <div>
                <h2 className="text-4xl font-semibold text-center">"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</h2>
                    <p className="text-center text-lg mt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla nunc, feugiat sed posuere non, interdum id mauris. Pellentesque dapibus metus vel elit volutpat mollis. Phasellus nec luctus nisi. Mauris risus urna, faucibus sed ipsum sed, congue tristique quam. Aenean.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla nunc, feugiat sed posuere non, interdum id mauris. Pellentesque dapibus metus vel elit volutpat mollis. Phasellus nec luctus nisi. Mauris risus urna, faucibus sed ipsum sed, congue tristique quam. Aenean.
                </p>
                </div>
                <div className="my-20">
                    <div className="grid grid-cols-2">
                    <NavLink to='/services' end className={({isActive})=>isActive?'underline underline-offset-4 text-red-600':''}>
                    <h3 className="text-3xl font-serif font-semibold text-center mb-4">Catering Services</h3>
                    </NavLink>
                    <NavLink to='/services/rental' className={({isActive})=>isActive?'underline underline-offset-4 text-red-600':''}>
                    <h3 className="text-3xl font-serif font-semibold text-center mb-4">Rental Services</h3>
                    </NavLink>
                    </div>
                    
                    <Outlet />
                </div>
            </div>
        </>  
    );
}