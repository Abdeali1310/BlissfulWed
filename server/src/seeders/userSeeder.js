require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const User = require("../models/User");

const USER_COUNT = 10; // Adjust the count as needed

const mongoURI = "mongodb+srv://blissfulwed8:UInGWjPyu4aIffz4@cluster0.pezd8.mongodb.net/blissfulwedDB?retryWrites=true&w=majority&appName=Cluster0"; 
if (!mongoURI) {
  console.error("❌ ERROR: MongoDB connection string is missing in .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  });

// ✅ List of Common Indian Names
const indianNames = [
  "Aarav Sharma", "Vihaan Patel", "Riya Mehta", "Ishaan Gupta", "Sanya Kapoor",
  "Aryan Verma", "Neha Joshi", "Karan Malhotra", "Priya Choudhary", "Ananya Iyer"
];

// ✅ List of Wedding-Related Bios
const weddingBios = [
  "Excited to start my new journey with my soulmate! Wedding planning in full swing. 💍✨",
  "Looking for the best wedding venues & outfits for my big day! 💖👰",
  "Shaadi prep is on! Need a photographer who can capture our love story perfectly. 📸💞",
  "Searching for the most elegant lehenga & sherwani styles for our wedding. 🎉",
  "Can’t wait for our destination wedding! Dreaming of a magical celebration. 🌸🏝️",
  "Helping my best friend plan her dream wedding. It's going to be epic! 🎊🎶",
  "Bride-to-be! Hunting for the perfect mehendi & sangeet playlist. 🎵💃",
  "Excited groom! Want the best wedding decorators to create a fairytale event. 🌟🏰",
  "Countdown to the wedding begins! Finding the perfect venue & catering. 🍽️💞",
  "Traditional yet modern – planning a wedding that blends both worlds beautifully. 🏵️✨"
];

// ✅ List of Major Indian Cities
const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
  "Chennai", "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow"
];

// ✅ Function to Generate Random Indian Users
const generateRandomUsers = async (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const name = indianNames[i % indianNames.length]; // Get a name from the list
    const [firstName, lastName] = name.split(" "); // Split into first & last name
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`; // Create email format

    const hashedPassword = await bcrypt.hash("Random@123", 10); // Default password for all

    users.push({
      username: name, // Keep username as full name (e.g., "Aarav Sharma")
      password: hashedPassword,
      email: email,
      contact: `9${Math.floor(100000000 + Math.random() * 900000000)}`, // Ensuring a 10-digit valid Indian number
      bio: weddingBios[i % weddingBios.length], // Assign a wedding-related bio
      gender: i % 2 === 0 ? "male" : "female",
      city: faker.helpers.arrayElement(indianCities) // Pick a random Indian city
    });
  }
  return users;
};

// ✅ Insert Users into Database
const seedUsers = async () => {
  try {
    const randomUsers = await generateRandomUsers(USER_COUNT);
    await User.insertMany(randomUsers);
    
    console.log(`✅ ${USER_COUNT} Indian Users Seeded Successfully!`);
    mongoose.connection.close(); // Close DB connection
  } catch (error) {
    console.error("❌ Error Seeding Users:", error);
    mongoose.connection.close();
  }
};

// Run Seeder
seedUsers();
