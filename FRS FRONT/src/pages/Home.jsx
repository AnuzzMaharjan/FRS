import Card from "../components/Card";
import Contents from "../components/Contents";
import Header from "../components/header";
import Banner from "../components/Banner";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";

export default function Home() {

  const chefContents = Contents.ChefContents.map((value, index) => {
    return (
      <div key={index} className="basis-1/3 sm:basis-1/6 p-2 lg:p-4">
        <img src={value} alt="article images" className="w-full" />
      </div>
    );
  });

  const foodItems = Contents.FoodItems.map((value, index) => {
    return (
      <div key={index} className="basis-1/2 p-2 overflow-hidden sm:basis-1/3 sm:p-4">
        <img src={value} alt="food items" className="w-full object-cover" />
      </div>
    );
  })

  const Articles = Contents.ArticleContents.map((value, index) => {
    return (
      <div key={index} className="container mx-auto mt-28 px-12">
        <div className="text-center mx-auto">
          <h2 className=" font-bold text-2xl md:text-3xl xl:text-4xl">
            <span>{value.content1 ? value.content1.toUpperCase() : ""}</span>
            &nbsp;
            <span className="text-red-600">
              {value.highlightedContent
                ? value.highlightedContent.toUpperCase()
                : ""}
            </span>
            &nbsp;
            <span>{value.content2 ? value.content2.toUpperCase() : ""}</span>
          </h2>
          <div className="flex justify-center pt-2 sm:pt-5">
            <p className="xl:text-2xl md:text-xl sm:w-1/2 xl:w-2/6">{value.paragraph}</p>
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          {
            value.index === 0 ? chefContents : ''
          }
          {
            value.index === 1 ? ReviewCard() : ''
          }
          {
            value.index === 2 ? foodItems: ''
          }
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <Banner />
      <div className="container flex justify-center mx-auto pt-7 md:pt-28">
        <div className="grid grid-cols-3 gap-4 md:gap-16 mx-3 sm:mx-6 md:mx-8 lg:mx-12"  >
          {Contents.CardContents.map((element, key) => {
            return (
              <Card key={key} content={element.content} image={element.image} />
            );
          })}
        </div>
      </div>
      {Articles}
      <Footer />
    </>
  );
}
