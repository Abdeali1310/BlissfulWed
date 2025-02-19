/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";

export default function BookingPage() {
  let url = window.location.href;
  const queryParams = new URL(url).searchParams;

  const serviceType = queryParams.get("serviceType");
  const serviceId = queryParams.get("serviceId");

  const decodedServiceType = decodeURIComponent(serviceType);

  const capitalizedServiceType =
    decodedServiceType.charAt(0).toUpperCase() + decodedServiceType.slice(1);

  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(100);
  const [address, setAddress] = useState("");
  const [disabledDates, setDisabledDates] = useState([]);
  const [service, setService] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default to India
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data
    axios
      .post("http://localhost:3000/api/v1/user", {}, { withCredentials: true })
      .then((res) => setUser(res.data.user));

    // Fetch booked dates
    axios
      .get(`http://localhost:3000/api/v1/booking/booked-dates/${serviceId}`, {
        withCredentials: true,
      })
      .then((res) => setDisabledDates(res.data.bookedDates));

    // Fetch service details
    axios
      .get(`http://localhost:3000/api/v1/service/id/${serviceId}`)
      .then((res) => {
        setService(res.data.service);
        calculateFinalPrice(res.data.service, noOfGuests);
      });
  }, [capitalizedServiceType]);

  useEffect(() => {
    if (service) {
      calculateFinalPrice(service, noOfGuests);
    }
  }, [noOfGuests, service]);

  const calculateFinalPrice = (service, guests) => {
    if (!service) return;

    const basePrice = service.price;
    const discountAmount = (service.discount / 100) * basePrice;
    let totalPrice = basePrice - discountAmount;

    if (guests > 100) {
      const extraGuests = guests - 100;
      const extraGuestPrice = (extraGuests * totalPrice) / 100;
      totalPrice += extraGuestPrice;
    }

    setFinalPrice(totalPrice);
  };

  const fetchAddressSuggestions = async (query) => {
    if (!query.trim()) {
      setAddressSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=IN`
      );

      // Filter results to ensure they are from India
      const indianResults = res.data.filter((item) =>
        item.display_name.includes("India")
      );

      setAddressSuggestions(indianResults);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    if (!address.trim() || !date) {
      toast.error("Address is required");
      setLoading(false);
      return;
    }
    try {
      const bookingData = {
        user: localStorage.getItem("user"),
        type: "Service",
        serviceId,
        date,
        timeSlot,
        contact: user.contact,
        noOfGuests,
        address,
        totalAmount: finalPrice,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/booking",
        bookingData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log(response.data);
        
        toast.success(
          "Your Booking is successfully noted. Kindly complete payment to confirm booking"
        );
        const bookingId = response.data.booking._id;
        setTimeout(async () => {
          navigate(`/payment?finalPrice=${finalPrice}&bookingId=${bookingId}`);
        }, 1500);
      } else {
        toast.error("Failed to book your service. Try again");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Booking Error:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div className=" bg-pink-100 overflow-y-scroll overflow-x-hidden w-full h-full">
        <Navbar />
        <ToastContainer />
        <div className="flex items-center justify-center w-screen h-full min-h-screen ">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <h2 className="text-4xl font-cursive text-[#e73895] font-bold text-center mb-4">
              Book{" "}
              {capitalizedServiceType === "Music-"
                ? "Music-&-dj"
                : capitalizedServiceType}{" "}
              {capitalizedServiceType === "Bridal-" && "Bridal-makeup"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={user?.username || ""}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="border p-2 rounded"
                placeholder="Your Name"
              />

              <input
                type="email"
                value={user?.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border p-2 rounded"
                placeholder="Your Email"
              />

              <input
                type="tel"
                value={user?.contact || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setUser({ ...user, contact: value });
                  }
                }}
                className="border p-2 rounded"
                placeholder="Your Contact Number"
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                required
              />

              <DatePicker
                selected={date}
                onChange={setDate}
                minDate={new Date()}
                filterDate={(d) =>
                  !disabledDates.includes(d.toISOString().split("T")[0])
                }
                className="border p-2 rounded w-full"
                placeholderText="Select a Date"
                popperPlacement="bottom-start"
                popperClassName="z-50"
                required
              />

              {["Haldi", "Mehndi", "Bridal-makeup"].includes(
                capitalizedServiceType
              ) && (
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="" disabled>
                    Select a Time Slot
                  </option>{" "}
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                </select>
              )}

              {["Catering", "Music-", "Decoration"].includes(
                capitalizedServiceType
              ) && (
                <div className="flex gap-2 items-center">
                  <div>No. of guests : </div>
                  <input
                    type="number"
                    placeholder="Number of Guests"
                    value={noOfGuests}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (isNaN(value) || value > 100 || value < 500) {
                        setNoOfGuests(value);
                      }
                    }}
                    className="border p-2 rounded"
                  />
                  {noOfGuests < 100 || noOfGuests > 500 && (
                    <p className="text-red-500 text-sm">
                      Number of guests must be more than 100 or less than 500.
                    </p>
                  )}
                </div>
              )}

              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  fetchAddressSuggestions(e.target.value);
                }}
                placeholder="Enter Address"
                className="border p-2 rounded"
                required
              />

              {addressSuggestions.length > 0 && (
                <ul className="border rounded bg-white max-h-32 overflow-y-auto">
                  {addressSuggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setAddress(item.display_name);
                        setPosition([item.lat, item.lon]);
                        setAddressSuggestions([]);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {item.display_name}
                    </li>
                  ))}
                </ul>
              )}
              {service && (
                <div className="text-center text-lg font-semibold mb-4">
                  Final Price:{" "}
                  <span className="text-[#e73895] text-2xl ">
                    ₹{Math.round(finalPrice).toLocaleString()}
                  </span>
                </div>
              )}
              <button
                type="submit"
                onClick={handleSubmit}
                className={`bg-pink-500 text-white py-2 rounded text-center hover:bg-pink-600 flex items-center justify-center gap-2 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                    Processing...
                  </>
                ) : (
                  "Book Now -> Proceed to payment"
                )}
              </button>
            </form>
            {["Catering", "Music-", "Decoration"].includes(
              capitalizedServiceType
            ) && (
              <h4 className=" mt-12 mb-4 text-xl font-bold text-[#e73895] font-cursive">
                *Note : The above service is for 100 guests only. Price may
                increase as you change No. of Guests. Thank you
              </h4>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
