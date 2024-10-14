import Card1 from "../assets/images/card1.jpg";
import Card2 from "../assets/images/card2.jpg";
import Card3 from "../assets/images/card3.jpg";
import Chef1 from "../assets/images/chef1.jpeg";
import Chef2 from "../assets/images/chef2.jpeg";
import Chef3 from "../assets/images/chef3.jpeg";
import Chef4 from "../assets/images/chef4.jpeg";
import Chef5 from "../assets/images/chef5.jpeg";
import Chef6 from "../assets/images/chef6.jpeg";
import Chef7 from "../assets/images/chef7.jpeg";
import Chef8 from "../assets/images/chef8.jpeg";
import salad from "../assets/images/salad.webp";
import meatItem from "../assets/images/meatItem.webp";
import fastfood from "../assets/images/fastfood.webp";
import beans from "../assets/images/beans.webp";
import desserts from "../assets/images/desserts.webp";
import cakes from "../assets/images/cakes.webp";


const CardContents = [
    {
      content: "We Make Dishes According to your need",
      image: Card1
    },
    {
      content: "We Make Dishes According to your need",
      image: Card2
    },
    {
      content: "We Make Dishes According to your need",
      image: Card3
    }
]
  
const ChefContents = [Chef1, Chef2, Chef3, Chef4, Chef5, Chef6, Chef7, Chef8,Chef1, Chef2, Chef3, Chef4, Chef5, Chef6, Chef7, Chef8, Chef6, Chef7];

const ArticleContents = [
  {
    index: 0,
    content1: 'Quality',
    highlightedContent: 'Guaranteed',
    paragraph: ' All our chefs have been vetted and reviewed by guest to ensure great dining experience.'
  },
  {
    index: 1,
    content1: 'Over',
    highlightedContent: '2,000',
    content2: 'happy guests',
    paragraph: 'We empower our clients to feel confident as party hosts, so they don\'t have to worry about food or logistics, but rather spend memorable time with their guests.'
  },
  {
    index: 2,
    content1: 'Our',
    highlightedContent: 'Instagram',
    content2: 'feed',
    paragraph: 'with pictures posted everyday, our Instagram feed will help you get a sense of how delightful a Friendship experience is.'
  },
]

const ReviewContents = [
  {
    image: Chef1,
    review: 'Clubvivre is always my first choice when I host dinners, as the quality of food, the extraordinary service and the attention to detail are all outstanding. Now I get to enjoy the party too!',
    reviewer: 'Chris Mathew'
  },
  {
    image: Chef2,
    review: 'Clubvivre is always my first choice when I host dinners, as the quality of food, the extraordinary service and the attention to detail are all outstanding. Now I get to enjoy the party too!',
    reviewer: 'Chris Mathew'
  },
  {
    image: Chef3,
    review: 'Clubvivre is always my first choice when I host dinners, as the quality of food, the extraordinary service and the attention to detail are all outstanding. Now I get to enjoy the party too!',
    reviewer: 'Chris Mathew'
  },
  {
    image: Chef4,
    review: 'Clubvivre is always my first choice when I host dinners, as the quality of food, the extraordinary service and the attention to detail are all outstanding. Now I get to enjoy the party too!',
    reviewer: 'Chris Mathew'
  },
  {
    image: Chef5,
    review: 'Clubvivre is always my first choice when I host dinners, as the quality of food, the extraordinary service and the attention to detail are all outstanding. Now I get to enjoy the party too!',
    reviewer: 'Chris Mathew'
  }
]

//3000 X 4000
const FoodItems = [meatItem, fastfood, salad, beans,desserts,cakes];

const ContactContents = {
  address: 'Sunakothi-26, Lalitpur',
  contact1: '9841415451',
  contact2:'9767473105',
  facebook: 'https://www.facebook.com/friendshiprentalservice'
}

const Contents = {
  CardContents,
  ChefContents,
  ArticleContents,
  ReviewContents,
  FoodItems,
  ContactContents
}
export default Contents;