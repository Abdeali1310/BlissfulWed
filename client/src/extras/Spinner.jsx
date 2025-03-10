/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaGift, FaTimesCircle, FaMoneyBillWave } from "react-icons/fa";
import Confetti from "react-confetti";
import axios from "axios"; // Import Axios for API calls
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const generateCouponCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const prizes = [
  { label: "Better Luck Next Time", icon: <FaTimesCircle className="text-red-500" />, code: "NOCASH2024" },
  { label: "₹500 Off Coupon", icon: <FaGift className="text-yellow-500" />, code: "AX9G5TI" },
  { label: "₹1000 Off Coupon", icon: <FaMoneyBillWave className="text-green-500" />, code: "G9UC8IT" },
  { label: "₹5% Off", icon: <FaGift className="text-yellow-500" />, code: "YAX97CF" },
  { label: "Better Luck Next Time", icon: <FaTimesCircle className="text-red-500" />, code: "TRYAGAIN24" },
  { label: "₹250 Off Coupon", icon: <FaGift className="text-blue-500" />, code: "PA7YE9K" },
  { label: "₹1500 Off Coupon", icon: <FaMoneyBillWave className="text-purple-500" />, code: "YA8YI0P" },
  { label: "10% Off", icon: <FaGift className="text-blue-500" />, code: "WT8IS9K" },
  { label: "12% Off", icon: <FaMoneyBillWave className="text-green-500" />, code: "AU9IEN7" },
];

const Spinner = () => {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [user, setUser] = useState(null);
    const [done,setDone] = useState(false);
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/",{},{withCredentials:true}); // Replace with your actual API route
        const userData = response.data.user;
        
        setUser(userData);
        setDone(true)
        console.log(user);
        
        setHasSpun(userData.hasSpun);
        if (userData.hasSpun && userData.prize) {
          setSelectedPrize(userData.prize);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [done]);

  const handleSpin = async () => {
    if (hasSpun) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const newAngle = 360 * 5 + (randomIndex * (360 / prizes.length));
    setAngle(newAngle);

    setTimeout(async () => {
      setSpinning(false);
      const wonPrize = prizes[randomIndex];
      setSelectedPrize(wonPrize);
      setHasSpun(true);

      try {
        await axios.put(`http://localhost:3000/api/v1/user/update-spin/`, {
            userId:user._id,
            hasSpun: true,
          prize: wonPrize,
        },{withCredentials:true}); // Replace with your actual API route
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }, 3000);
  };
  const navigate = useNavigate();
  return (
    <div className="flex relative overflow-x-hidden h-full w-full flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4">🎉 Spin & Win! 🎉</h1>
      <p className="text-lg text-white mb-6">Try your luck and win amazing rewards!</p>
      <Button
        variant=""
        sx={{position:"absolute",top:"3rem",left:"3rem"}}
        color="primary"
        className="mb-4 bg-pink-100 hover:bg-pink-600 text-white rounded"
        onClick={() => navigate("/")}
      >
        <p className="text-2xl font-black "> <ArrowBack /></p>
      </Button>
      <div className="relative flex items-center justify-center w-72 h-72">
        <div
          className="w-64 h-64 rounded-full border-[10px] border-gray-300 flex items-center justify-center transition-transform duration-[3s] ease-out relative overflow-hidden"
          style={{ transform: `rotate(${angle}deg)`, backgroundColor: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
        >
          {prizes.map((prize, index) => {
            const rotation = (index * 360) / prizes.length;
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  clipPath: "polygon(50% 50%, 100% 0, 0 0)",
                  backgroundColor: index % 2 === 0 ? "#e73895" : "#e77895",
                }}
              >
                <div
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${360 / prizes.length / 2}deg)` }}
                >
                  {prize.icon}
                </div>
              </div>

            );
          })}
        </div>

        {/* Spinner Indicator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>

      <Button
        variant="contained"
        color="secondary"
        className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow-lg"
        onClick={handleSpin}
        disabled={spinning || hasSpun}
      >
        {hasSpun ? "Already Spun" : "Spin Now"}
      </Button>

      {selectedPrize && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-center">
          {selectedPrize.code !== "NOCASH2024" && selectedPrize.code !== "TRYAGAIN24" ? (
            <>
              <Confetti />
              <h2 className="text-xl font-bold text-yellow-600">🎊 Congratulations! 🎊</h2>
              <p className="text-gray-700">You've won <strong>{selectedPrize.label}</strong>!</p>
              <p className="text-lg font-semibold mt-2 bg-gray-200 p-2 rounded">{selectedPrize.code}</p>
              <p className="text-gray-500 text-sm mt-1">Use this coupon on checkout.</p>

            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-red-500">😢 Better Luck Next Time!</h2>
              <p className="text-gray-700">Don't worry, you can still enjoy our amazing deals!</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Spinner;
