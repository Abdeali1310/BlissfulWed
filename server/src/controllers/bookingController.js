const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");

// ✅ 1. Create a Booking
async function createBooking(req, res) {
    try {
        const { type, address, contact, serviceId, packageId, date, timeSlot, noOfGuests, totalAmount } = req.body;
        const userId = req.userId;
        console.log(type);



        if (!["Service", "Package"].includes(type)) {
            return res.status(400).json({ message: "Invalid booking type. Must be 'Service' or 'Package'." });
        }

        let service = null;
        let package = null;

        if (type == "Service") {
            service = await Service.findById(serviceId);


            if (!service) return res.status(404).json({ message: "Service not found" });
        }
        // else if (type === "Package") {
        //     package = await Package.findById(packageId);
        //     if (!package) return res.status(404).json({ message: "Package not found" });
        // }

        // Define service types that require guests
        const guestRequiredServices = ["Catering", "Music-&-dj", "Decoration"];

        if (type === "Service" && guestRequiredServices.includes(service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1)) && (!noOfGuests || noOfGuests <= 0)) {
            return res.status(400).json({ message: `Number of guests is required for ${service.serviceType} service.` });
        }

        // Define service types that require a date or time slot
        const timeRequiredServices = ["Haldi", "Mehndi", "Bridal-makeup",];
        const dateRequiredServices = ["Haldi", "Mehndi", "Catering", "Decoration", "Photography", "Bridal-makeup", "Music-&-dj", "Groom-wear"];

        if (type == "Service" && dateRequiredServices.includes(service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1)) && !date) {
            return res.status(400).json({ message: `Date is required for ${service.serviceType} service.` });
        }

        if (type === "Service" && timeRequiredServices.includes(service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1)) && !timeSlot) {
            return res.status(400).json({ message: `Time slot is required for ${service.serviceType} service.` });
        }

        // Check if the service is already booked at the given date/time
        if (type === "Service" && timeSlot && timeRequiredServices.includes(service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1))) {
            const isAlreadyBooked = await Booking.findOne({
                service: serviceId,
                date,
                timeSlot,
                status: "Booked",
            });
            console.log(isAlreadyBooked);

            if (isAlreadyBooked) {
                return res.status(400).json({ message: "This service is already booked at this time." });
            }
        }

        if (type === "Service" && date && dateRequiredServices.includes(service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1))) {
            const isAlreadyBookedOnDate = await Booking.findOne({
                service: serviceId,
                date,
                status: "Booked",
            });

            if (isAlreadyBookedOnDate) {
                return res.status(400).json({ message: `This service is already booked on ${date}.` });
            }
        }

        // Create a new booking
        const booking = new Booking({
            user: userId,
            type,
            service: type === "Service" ? serviceId : null,
            package: type === "Package" ? packageId : null,
            date,
            timeSlot: type === "Service" ? timeSlot ?? null : null,
            noOfGuests: guestRequiredServices.includes(service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1)) ? noOfGuests : 0,
            address,
            totalAmount,
            contact,
            status: "Pending",
        });

        await booking.save();

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}



// ✅ 2. Get a Single Booking
async function getBookingById(req, res) {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId).populate("service user", "name email serviceType");

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ 3. Get All Bookings (For Users & Admin)
async function getAllBookings(req, res) {
    try {
        const userId = req.userId;

        let bookings;
        if (userId) {
            bookings = await Booking.find({ user: userId }).populate("service", "name");
        } else {
            bookings = await Booking.find().populate("service user", "name email");
        }

        res.status(200).json({ success: true, booking: bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ 4. Update Booking Status (Admin Only)
async function updateBookingStatus(req, res) {
    try {
        const { bookingId } = req.params;
        const { status, noOfGuests, totalAmount, rescheduledAt } = req.body;

        const validStatuses = ["Pending", "Booked", "Rescheduled", "Cancelled"];

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid booking status." });
        }

        // Validate that noOfGuests is non-negative
        if (noOfGuests !== undefined && noOfGuests < 100) {
            return res.status(400).json({ message: "Number of guests cannot be less than 100." });
        }

        // Validate that totalAmount is positive
        if (totalAmount !== undefined && totalAmount <= 0) {
            return res.status(400).json({ message: "Total amount must be greater than zero." });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status, noOfGuests, totalAmount, rescheduledAt },
            { new: true }
        );

        if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

        res.json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

// ✅ 5. Cancel a Booking (User)
async function cancelBooking(req, res) {
    try {
        const { bookingId } = req.params;
        const userId = req.userId;

        const booking = await Booking.findOne({ _id: bookingId, user: userId });

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = "Cancelled";
        await booking.save();

        res.json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

//get booked dates
const getBookedDates = async (req, res) => {
    try {
        const { serviceId } = req.params; // Get serviceId from query params

        if (!serviceId) {
            return res.status(400).json({ message: "Service ID is required" });
        }

        // Find all bookings for this service ID
        const bookings = await Booking.find({ service: serviceId }).select("date");

        // Extract booked dates and format them as YYYY-MM-DD
        const bookedDates = bookings.map(booking => booking.date.toISOString().split("T")[0]);

        res.json({ bookedDates });
    } catch (error) {
        console.error("Error fetching booked dates:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getBookingByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all bookings of the user and populate related fields
        const bookings = await Booking.find({ user: userId })
            .populate("service", "name description price") // Populate service details
            .populate("package", "name details price") // Populate package details
            .sort({ createdAt: -1 });

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this user." });
        }

        
        return res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { getBookingByUserId, createBooking, getBookingById, getAllBookings, updateBookingStatus, cancelBooking, getBookedDates }