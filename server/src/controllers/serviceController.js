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
module.exports = {getAllServices, getServiceByType, getServiceById};
