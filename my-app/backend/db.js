const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    try {
      const foodItemsData = await fetched_data.find({}).toArray();
      const foodCategory = await mongoose.connection.db.collection(
        "foodCategory"
      );
      const foodCategoryData = await foodCategory.find({}).toArray();

      global.food_items = foodItemsData;
      global.foodCategory = foodCategoryData;
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDatabase;
