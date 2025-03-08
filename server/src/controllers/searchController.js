const Service = require("../models/Service");

const searchServices = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        const services = await Service.find({
            $or: [
                { serviceType: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } },
                { tags: { $in: [q] } }
            ],
        }).select("serviceType description cardImage _id");

        res.json(services || []);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { searchServices };
