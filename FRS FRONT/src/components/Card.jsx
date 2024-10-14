export default function Card({ content, image }) {
  return (
      <div className="relative">
        <div className="absolute top-0 left-0 bg-[#000000bf] text-white w-full h-full z-10 rounded-2xl flex items-center  justify-center opacity-0 transition hover:opacity-100">
          <div className="px-2 text-sm font-semibold text-center w-full sm:text-xl sm:font-bold md:text-2xl lg:text-4xl xl:w-1/2">{content}</div>
        </div>
        <img src={image} alt="card1" className="min-w-full rounded-2xl" />
      </div>
  );
}
