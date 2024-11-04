import BannerImage from "../assets/images/test.webp";

export default function Catering() {
  return (
    <>
      <div className="grid grid-cols-2 gap-9">
      <div className="relative w-full">
        <img src={BannerImage} alt="" className="w-full" />
        <div className="absolute top-8 left-10">
          <h2 className="text-white text-3xl">Full Catering</h2>
        </div>
        <div className="absolute bottom-4 right-4 backdrop-blur-md rounded-lg py-6 pr-12 pl-16">
          <ul className="text-white text-xl font-semibold list-disc">
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </div>
      </div>
      <div className="relative w-full">
        <img src={BannerImage} alt="" className="w-full" />
        <div className="absolute top-8 left-8">
          <h2 className="text-white text-3xl">Half Catering</h2>
        </div>
        <div className="absolute bottom-4 right-4 backdrop-blur-md rounded-lg py-6 pr-12 pl-16">
          <ul className="text-white text-xl font-semibold list-disc">
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </div>
      </div>
      <div className="relative w-full">
        <img src={BannerImage} alt="" className="w-full" />
        <div className="absolute top-8 left-8">
          <h2 className="text-white text-3xl">Bill to Bill Catering</h2>
        </div>
        <div className="absolute bottom-4 right-4 backdrop-blur-md rounded-lg py-6 pr-12 pl-16">
          <ul className="text-white text-xl font-semibold list-disc">
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
}
