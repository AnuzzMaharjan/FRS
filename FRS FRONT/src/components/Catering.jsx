import BannerImage from "../assets/images/test.webp";

export default function Catering() {
  return (
    <>
      <div className="grid grid-cols-3 px-3">
        <div className="p-6 shadow-lg outline outline-2 outline-gray-300 -outline-offset-8 rounded-lg transition-all hover:shadow-xl hover:outline-offset-0">
            <img src={BannerImage} alt="" className="" />
          <div className="mt-7">
            <h3 className="text-3xl font-serif font-semibold">Full Catering</h3>
            <div className="mt-4">
              <ul>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
