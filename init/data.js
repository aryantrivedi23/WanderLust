const mongoose = require("mongoose");

const categories = [
  "rooms",
  "city",
  "mountains",
  "castles",
  "pools",
  "camping",
  "farms",
  "arctic",
];

const sampleData = [
  {
    title: "Luxury Villa in South Goa",
    description:
      "Experience the perfect luxury getaway at this stunning villa in South Goa. Nestled near Benaulim Beach, it offers private beach access, modern interiors, and panoramic sea views. Ideal for families or couples seeking a peaceful vacation in one of India’s most popular beach destinations.",
    image: {
      filename: "listingimage",
      url: "https://assets.serenity.co.uk/53000-53999/53103/1296x864.jpg",
    },
    price: 4800,
    location: "Benaulim Beach, South Goa, Goa",
    country: "India",
  },
  {
    title: "Heritage Haveli in Jaipur",
    description:
      "Stay like royalty in this restored Rajasthani haveli located near Amer Fort, Jaipur. The property blends old-world charm with modern comfort, featuring antique furniture, courtyards, and traditional décor. A perfect heritage stay for travelers exploring Jaipur’s forts and palaces.",
    image: {
      filename: "listingimage",
      url: "https://jaipur.indanahotels.com/images/2d92a721078de1247c55192f3745899c.jpg",
    },
    price: 2500,
    location: "Amer Road, Jaipur, Rajasthan",
    country: "India",
  },
  {
    title: "Hill View Cottage in Manali",
    description:
      "A cozy wooden cottage in the heart of Old Manali with breathtaking views of snow-capped mountains and the Beas River. This scenic stay is ideal for honeymooners and nature lovers seeking a peaceful mountain retreat surrounded by apple orchards and pine forests.",
    image: {
      filename: "listingimage",
      url: "https://www.theholidayvilla.in/images/balkon/1.jpg",
    },
    price: 1500,
    location: "Old Manali Road, Manali, Himachal Pradesh",
    country: "India",
  },
  {
    title: "Luxury Houseboat in Alleppey",
    description:
      "Cruise the tranquil backwaters of Kerala aboard this premium houseboat in Alleppey. Enjoy air-conditioned rooms, local cuisine, and breathtaking sunset views from your private deck. A must-try luxury experience for travelers seeking authentic South Indian charm.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/a5/55/7d/forte-kochi.jpg?w=1200&h=-1&s=1",
    },
    price: 5000,
    location: "Punnamada Lake, Alleppey, Kerala",
    country: "India",
  },
  {
    title: "Penthouse in Bandra West, Mumbai",
    description:
      "This elegant penthouse in Bandra West offers breathtaking sea views and modern amenities. Located close to cafes, beaches, and nightlife, it’s perfect for business travelers and vacationers looking to stay in one of Mumbai’s trendiest neighborhoods.",
    image: {
      filename: "listingimage",
      url: "https://www.ahstatic.com/photos/6926_ho_00_p_1024x768.jpg",
    },
    price: 6500,
    location: "Bandra West, Mumbai, Maharashtra",
    country: "India",
  },
  {
    title: "Campsite in Rishikesh",
    description:
      "Immerse yourself in nature at this riverside campsite near Laxman Jhula, Rishikesh. Enjoy white-water rafting, yoga sessions, and bonfires under starry skies. Ideal for adventure lovers and backpackers seeking an affordable stay amidst the Himalayas.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c2/ce/five-star-hotels.jpg?w=1200&h=-1&s=1",
    },
    price: 900,
    location: "Laxman Jhula Road, Rishikesh, Uttarakhand",
    country: "India",
  },
  {
    title: "Modern Apartment in Sector 18, Noida",
    description:
      "A stylish and fully furnished apartment in the heart of Noida’s commercial hub. With close access to metro stations, shopping malls, and fine dining, this urban stay is perfect for business travelers and short-term city stays.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/2a/45/6a/the-culinary-court.jpg?w=1200&h=-1&s=1",
    },
    price: 1900,
    location: "Sector 18, Noida, Uttar Pradesh",
    country: "India",
  },
  {
    title: "Beach Shack in Varkala",
    description:
      "Unwind at this rustic beach shack perched on the famous Varkala cliffs with uninterrupted views of the Arabian Sea. Enjoy the laid-back coastal vibe, yoga retreats, and seafood cafés — ideal for solo travelers or couples seeking a serene seaside escape.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/311346165.jpg?k=bda9fd895ffba9a83258d0688fbbfd49f3405500f3524ea738c6b7bfa178fa8e&o=&hp=1",
    },
    price: 1000,
    location: "Cliff Road, Varkala, Kerala",
    country: "India",
  },
  {
    title: "Mountain Retreat in Darjeeling",
    description:
      "A charming hilltop retreat overlooking the Kanchenjunga range, surrounded by lush tea gardens. This cozy accommodation blends colonial architecture with warm hospitality, making it an ideal stay for tea lovers and mountain travelers visiting Darjeeling.",
    image: {
      filename: "listingimage",
      url: "https://www.awaygowe.com/wp-content/uploads/2021/02/best-hotels-darjeeling-featured2.webp",
    },
    price: 2300,
    location: "Mall Road, Darjeeling, West Bengal",
    country: "India",
  },
  {
    title: "Boutique Stay in Pondicherry",
    description:
      "A charming boutique guesthouse in the French Quarter of White Town, Pondicherry. With colonial architecture, pastel walls, and cozy courtyards, this stay offers a perfect blend of heritage charm and modern comfort just minutes from the beach promenade.",
    image: {
      filename: "listingimage",
      url: "https://r1imghtlak.mmtcdn.com/d0568ed4beab11eba7580242ac110003.webp?output-quality=75&downsize=328:180&output-format=jpg",
    },
    price: 2600,
    location: "Rue Suffren Street, White Town, Pondicherry",
    country: "India",
  },
  {
    title: "Tea Estate Bungalow in Munnar",
    description:
      "Set amidst endless tea plantations, this colonial-era bungalow in Munnar is a perfect hill-station escape. Guests can enjoy misty mornings, fresh mountain air, and scenic walks through lush green valleys. A great choice for couples and families alike.",
    image: {
      filename: "listingimage",
      url: "https://assets.cntraveller.in/photos/60ba2378e341ff812178eb61/1:1/w_1065,h_1065,c_limit/Gratitude-Pondicherry.JPG",
    },
    price: 3200,
    location: "Chithirapuram, Munnar, Kerala",
    country: "India",
  },
  {
    title: "Eco-Friendly Treehouse in Wayanad",
    description:
      "Stay above the forest canopy in this handcrafted eco-friendly treehouse located in the heart of Wayanad. Built with sustainable materials and surrounded by wildlife, it offers a unique nature retreat for travelers seeking peace and adventure.",
    image: {
      filename: "listingimage",
      url: "https://cdn.budgetyourtrip.com/images/photos/headerphotos/large/india_pondicherry.jpg",
    },
    price: 2100,
    location: "Vythiri, Wayanad, Kerala",
    country: "India",
  },
  {
    title: "City Loft in Connaught Place, New Delhi",
    description:
      "A stylish studio loft in Connaught Place offering contemporary design, fast Wi-Fi, and proximity to top attractions like India Gate and Janpath Market. Ideal for tourists, digital nomads, and professionals visiting the capital city.",
    image: {
      filename: "listingimage",
      url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/39/3c/ee/the-park-new-delhi.jpg",
    },
    price: 2700,
    location: "Connaught Place, Central Delhi, New Delhi",
    country: "India",
  },
  {
    title: "Hilltop Homestay in Shillong",
    description:
      "Escape into the misty hills of Shillong at this cozy homestay surrounded by pine trees and panoramic valley views. Guests can explore nearby waterfalls, local cafes, and Ward’s Lake for a refreshing northeast India experience.",
    image: {
      filename: "listingimage",
      url: "https://gos3.ibcdn.com/e1c32337-a93b-4d6c-81a2-8aa040d801e2.jpg",
    },
    price: 1800,
    location: "Laitumkhrah, Shillong, Meghalaya",
    country: "India",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax in paradise at this ocean-facing bungalow on Canggu Beach, Bali. Featuring a private pool, tropical garden, and open-air lounge, it’s ideal for honeymooners and surfers looking for a luxury beachfront experience in Indonesia.",
    image: {
      filename: "listingimage",
      url: "https://www.agoda.com/wp-content/uploads/2020/01/Best-hotels-in-Bali-The-Kayon-Jungle-Resort-by-Pramana.jpg",
    },
    price: 2200,
    location: "Canggu Beach, Bali",
    country: "Indonesia",
  },
  {
    title: "Luxury Villa in Santorini",
    description:
      "Perched on the cliffs of Oia, this luxury villa offers iconic Santorini sunsets and an infinity pool overlooking the caldera. A dream destination for couples, the villa blends Cycladic architecture with modern comforts and serene ocean views.",
    image: {
      filename: "listingimage",
      url: "https://imageio.forbes.com/specials-images/imageserve/627e31007be5959e6359a3ab/Oia--Santorini-Island--Cyclades--Greece--Twilight--Houses-and-churches-after-sunset/960x0.jpg?format=jpg&width=960",
    },
    price: 5500,
    location: "Oia, Santorini",
    country: "Greece",
  },
  {
    title: "Ski Chalet in Zermatt",
    description:
      "A luxurious alpine chalet in Zermatt offering direct views of the Matterhorn. Enjoy cozy fireplaces, wooden interiors, and ski-in/ski-out access. Ideal for families and winter sports enthusiasts exploring the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/cc/9c/34/skyroom.jpg?w=1200&h=-1&s=1",
    },
    price: 7000,
    location: "Zermatt, Valais",
    country: "Switzerland",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "This luxurious desert retreat in Al Qudra features private villas, palm courtyards, and infinity pools overlooking the dunes. Perfect for romantic getaways or family vacations seeking tranquility near the heart of Dubai.",
    image: {
      filename: "listingimage",
      url: "https://img.nh-hotels.net/BnZJ2j/yDDEzp/original/NH_Collection_Dubai_The_Palm_Pool_View_Evening.jpg",
    },
    price: 5000,
    location: "Al Qudra, Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Cabin by Lake Louise",
    description:
      "Wake up to crystal-clear mountain reflections at this charming cabin by Lake Louise. Offering easy access to Banff National Park, it’s ideal for hikers, nature lovers, and couples seeking a cozy Canadian wilderness escape.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/be/b3/da/carriage-house-inn.jpg?w=1200&h=-1&s=1",
    },
    price: 4000,
    location: "Lake Louise, Alberta",
    country: "Canada",
  },
  {
    title: "Historic Canal House in Amsterdam",
    description:
      "Stay in a classic 17th-century canal house in Amsterdam’s Jordaan district. This charming stay features Dutch interiors, waterfront views, and easy access to museums, cafes, and local markets — a quintessential European experience.",
    image: {
      filename: "listingimage",
      url: "https://media.cntraveller.com/photos/657b107a45ef808f5f810623/master/w_1600,c_limit/The_Hoxton,_Jordaan_Amsterdam_December23_PR_Global.jpg",
    },
    price: 3800,
    location: "Jordaan, Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Villa in Maldives",
    description:
      "Escape to your own overwater paradise in the Maldives. This private island villa offers crystal-clear waters, coral reefs, and luxurious ocean-view suites with glass floors. Ideal for honeymooners and luxury travelers.",
    image: {
      filename: "listingimage",
      url: "https://so-maldives.themaldiveshotels.com/data/Photos/OriginalPhoto/15716/1571641/1571641190.JPEG",
    },
    price: 9500,
    location: "North Malé Atoll, Maldives",
    country: "Maldives",
  },
  {
    title: "City Apartment in Tokyo",
    description:
      "Modern city apartment located in the heart of Shibuya, Tokyo. Offering skyline views, high-speed internet, and proximity to restaurants, nightlife, and shopping, it’s ideal for tourists and professionals visiting Japan’s capital.",
    image: {
      filename: "listingimage",
      url: "https://www.hotelscombined.in/himg/bb/e6/21/ice-123369-65001253_3XL-403118.jpg",
    },
    price: 3500,
    location: "Shibuya, Tokyo",
    country: "Japan",
  },
  {
    title: "Mountain Lodge in Queenstown",
    description:
      "Located near Lake Wakatipu, this luxury mountain lodge in Queenstown offers stunning lake views, spa facilities, and adventure access for skiing and hiking. Ideal for thrill-seekers and families exploring New Zealand’s South Island.",
    image: {
      filename: "listingimage",
      url: "https://thecarlinhotel.com/wp-content/uploads/2022/05/Princess-6-of-25.jpg",
    },
    price: 4200,
    location: "Lake Wakatipu, Queenstown",
    country: "New Zealand",
  },
  {
    title: "Cottage in the Scottish Highlands",
    description:
      "A stone-built countryside cottage surrounded by misty lochs and rolling hills. Perfect for nature lovers, this serene escape offers hiking, fishing, and cozy evenings by the fireplace in the heart of the Scottish Highlands.",
    image: {
      filename: "listingimage",
      url: "https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/united-kingdom/scotland/the-fife-arms-braemar-prince-albert-suite-p.jpg",
    },
    price: 3900,
    location: "Inverness, Scottish Highlands",
    country: "United Kingdom",
  },
];

const getRandomCategories = () => {
  const num = Math.floor(Math.random() * 5) + 1;
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const data = sampleData.map((item) => ({
  ...item,
  owner: "68ea2ba9067dc28693401a7a",
  category: getRandomCategories(),
}));

const users = [
  {
    _id: new mongoose.Types.ObjectId("68ea2ba9067dc28693401a7a"),
    email: "aryan@gmail.com",
    username: "aryan",
    salt: "38cdfbd73519ef5b12da2896ea5cfad05daedfab9335565bab92ffcb65657b72",
    hash: "761abd7c2aa8196997a88fee11d161af74f793bc6109faf5c757996304f0553ec135fb7e9b783fba71de8618d166b8a5ac8454a0353a8bf4e9bf184af11c9363f23d8d074e1f97cd50e80bf522addb7e4c7ee180ed8591844f68103f72f58fdc87f4a3dc0f86c404ba7c8ac1d62f603869a863ba85b559770d7ad80427cd0bf220b2edb0b676f0e2db14838ec9bda2093dee8b22f2a8796e8bbee0137c4811a0e01db22a656310f3d62516f8f54f74cd94b5b4c593fcefbe58e1dee52edd4bf64b6f38fa4e77df7ce6a01f181f2a30950739565454182396ce709532068f7974e8a7034a5d0af9391969db02c7a81341f11faaf6a6429199eb9b4b1e7413beb1e52eef250a42ff6fd1950528814d714ba6068c3ff90e8fda20e3f9847d03871027f031622cbdb56a8e4a277f2857f672d3327390a84e500536746f382c3f5b9eb1509735ace311567d48a49c2418fc9f8ef58ba43ea719ae1279ff33ba3a3a5c7a724efd0db122cd70d816073f8c1388f3ea5e4ccef87951b24c0e73499d863b2c5bc511aa846537592b20bee32b9446a93e7c39ae40fd04562af0ac3b0e4064247a22663c21eef601dacf258f636eda887d9fd62d668051c02b881837979e91c7d86937e9a92d2952f54702ea6fc021efb636a5bb97fc218a4395582483551dabff1871cd3ea3f334adf73c57558d6cce085c0f8f6e95032c13377eab8a96c5",
  },
];

module.exports = {
  data,
  users,
};
