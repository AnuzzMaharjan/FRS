import { useEffect } from "react";
import BannerImage from "../assets/images/test.webp";
import { getCateringList } from "../functions/adminFunctions";
import { useState } from "react";

export default function Catering() {
  const [cateringPkgs, setCateringPkgs] = useState([]);

  const getCateringPkgs = async () => {
    const result = await getCateringList();

    setCateringPkgs(result);
  };

  useEffect(() => {
    getCateringPkgs();
  }, []);

  const mappedPkgs = cateringPkgs.map((value, index) => {
    return (
      <div
        className="p-6 shadow-lg outline outline-2 outline-gray-300 -outline-offset-8 rounded-lg transition-all hover:shadow-xl hover:outline-offset-0"
        key={index}
      >
        <img src={value.img_link} alt="" className="" />
        {/* <iframe src={ value.img_link } allow="autoplay" className="w-full h-64"></iframe> */}
        <div className="mt-7">
          <h3 className="text-3xl font-serif font-semibold">
            {value.pkg_name}
          </h3>
          <div className="mt-4 px-5">
            <ul className="list-disc">
              {value.subpkgs.map((data, ind) => {
                return <li key={ind}>{data.sublist}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-3 px-3 gap-4">{mappedPkgs}</div>
    </>
  );
}
