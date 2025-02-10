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

module.exports = { getServiceByType };
