import Contents from "./Contents";

export default function ReviewCard() {
    const ReviewContents = Contents.ReviewContents;

    const reviewCards = ReviewContents.map((value, index) => {
        return (
            <div key={index} className="flex-grow-0 flex-shrink-0 basis-[100%] bg-gray-200 px-8 pt-4 md:pt-6 lg:pt-10 xl:pt-16 sm:basis-8/12 md:basis-1/2 lg:basis-1/3 xl:basis-[23%]">
                <div className="my-7 ">
                    <img src={value.image} alt="user image" className="w-2/5 rounded-full mx-auto"/>
                </div>
                <div className="my-7">
                    <p className="text-lg text-center">
                        {value.review}
                    </p>
                </div>
                <div className="my-7">
                    <h4 className="text-xl font-bold text-center">
                        {value.reviewer}
                    </h4>
                </div>
          </div>  
        );
    })
    return (
        <>
            <div className="container overflow-x-auto flex gap-10 p-4">
                {reviewCards}
            </div>
        </>
    );
}