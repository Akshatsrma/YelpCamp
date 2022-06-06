const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error");
    console.log(err);
  });

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "620cbe3b1472bc55e5c9d3fe",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum ipsam quas est ut magni quisquam, repudiandae consectetur saepe architecto aliquid neque sunt minus eligendi! Velit ipsam saepe tenetur culpa sed.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dmjqjgumk/image/upload/v1645624027/YelpCamp/visj9hbptjjin8cqdbgk.png",
          filename: "YelpCamp/visj9hbptjjin8cqdbgk",
        },
        {
          url: "https://res.cloudinary.com/dmjqjgumk/image/upload/v1645624025/YelpCamp/p2pciusneusqciq3ksx8.jpg",
          filename: "YelpCamp/p2pciusneusqciq3ksx8",
        },
        {
          url: "https://res.cloudinary.com/dmjqjgumk/image/upload/v1645624026/YelpCamp/ctruebfo9ekzgr2htjgl.jpg",
          filename: "YelpCamp/ctruebfo9ekzgr2htjgl",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
