// seeders/imageSeeder.js
const mongoose = require('mongoose');
const Image = require('../models/imageModel');  // Adjust the path as needed
const MONGO_URI = "mongodb+srv://blissfulwed8:UInGWjPyu4aIffz4@cluster0.pezd8.mongodb.net/blissfulwedDB?retryWrites=true&w=majority";


// Sample Image Data
const imageData = [
  {
    event: 'pre-wedding',
    filePath: 'https://plus.unsplash.com/premium_photo-1691030256235-47d75d5890b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcHJlJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/originals/b2/52/c7/b252c7ccc376054a582f324578d47f0b.jpg',
    category: 'moments'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/58/3d/ad/583dad803bb06fb33c32266eb36d5986.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/ba/fd/a2/bafda2827f525c94abdaa372c7fd7b43.jpg',
    category: 'family'
  },
  {
    event: 'reception',
    filePath: 'https://cdn2.hubspot.net/hubfs/3941184/DY4V2552.jpg',
    category: 'guests'
  },
  {
    event: 'engagement',
    filePath: 'https://cdn.pixabay.com/photo/2018/11/29/19/42/ring-3846369_960_720.jpg',
    category: 'couple'
  }
];

// Seed Function
const seedImages = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Image.deleteMany(); // Clear existing data
    await Image.insertMany(imageData); // Insert new data
    console.log('Image data seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding image data:', err);
    mongoose.connection.close();
  }
};

seedImages();