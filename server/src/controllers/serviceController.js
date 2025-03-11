const Booking = require("../models/Booking");
const Service = require("../models/Service"); 

const getServiceByType = async (req, res) => {
    try {
        const { serviceType } = req.params;

        const services = await Service.find({ serviceType });

        if (!services || services.length === 0) {
            return res.status(404).json({ success:false,message: "No services found for this type" });
        }

        res.status(200).json({success:true,services:services});
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Find service by ID
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ success:false,message: "Service not found" });
    }

    res.status(200).json({success:true,service:service});
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllServices = async (req, res) => {
  try {
    const services = await Service.find(); // Fetch all services from the database
    res.status(200).json({
      success: true,
      services: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};


const getTopBookedServices = async (req, res) => {
  try {
    const topServices = await Booking.aggregate([
      {
        $group: {
          _id: { $toObjectId: "$service" }, // Convert to ObjectId
          totalBookings: { $sum: 1 },
        },
      },
      { $sort: { totalBookings: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      { $unwind: "$serviceDetails" },
      {
        $project: {
          _id: "$serviceDetails._id",
          serviceType: "$serviceDetails.serviceType",
          totalBookings: 1,
          price: "$serviceDetails.price",
          category: "$serviceDetails.category",
        },
      },
    ]);

    res.status(200).json(topServices);
  } catch (error) {
    console.error("Error fetching top booked services:", error);
    res.status(500).json({ message: "Error fetching top booked services", error });
  }
};

// 📌 2. Get Most Booked Category
const getMostBookedCategory = async (req, res) => {
  try {
    const topCategory = await Booking.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      { $unwind: "$serviceDetails" },
      {
        $group: {
          _id: "$serviceDetails.category",
          totalBookings: { $sum: 1 },
        },
      },
      { $sort: { totalBookings: -1 } },
      { $limit: 1 },
    ]);

    res.status(200).json(topCategory[0] || { message: "No bookings found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching most booked category", error });
  }
};

// 📌 3. Get Average Rating Per Service Type
const getAverageRating = async (req, res) => {
  try {
    const avgRatings = await Service.aggregate([
      {
        $group: {
          _id: "$serviceType",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1 } },
    ]);

    res.status(200).json(avgRatings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching average rating", error });
  }
};

const createNewService = async (req, res) => {
  try {
    const {
      serviceType,
      price,
      category,
      description,
      duration,
      tags,
      discount,
      fullInfo,
      cardImage,
      images,
      availability,
      isBestseller,
      availableEverywhere,
    } = req.body;
    
    // Validate required fields
    if (!serviceType || !price || !fullInfo || !cardImage) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create a new service
    const newService = new Service({
      serviceType,
      price,
      category,
      description,
      duration,
      tags: tags,
      discount,
      fullInfo,
      cardImage,
      images: images,
      availability,
      isBestseller,
      availableEverywhere,
    });

    // Save the service to the database
    const savedService = await newService.save();

    res.status(201).json({ message: "Service created successfully.", service: savedService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = {createNewService,getTopBookedServices,getMostBookedCategory,getAverageRating,getAllServices, getServiceByType, getServiceById};
