import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import paidIcon from "../assets/green-tick.png";
import failedIcon from "../assets/red-cross.png";
import pendingIcon from "../assets/yellow-exclamation.png";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!orderId) {
      setStatus("Invalid order ID");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/api/v1/payment/verify?order_id=${orderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setStatus(res.data.paymentStatus);
        } else {
          setStatus("Failed");
        }
      })
      .catch(() => setStatus("Error verifying payment"))
      .finally(() => setLoading(false));
  }, [orderId]);

  const renderContent = () => {
    if (loading) {
      return <div className="loader"></div>;
    }

    let image, message, button;

    if (status === "Paid") {
      image = paidIcon;
      message = "Your payment has been successfully done!";
      button = (
        <a href="/" className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg mt-4">
          Go to Home
        </a>
      );
    } else if (status === "Failed") {
      image = failedIcon;
      message = "Payment failed. Please try again.";
      button = (
        <a href="/booking/payment" className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg mt-4">
          Retry Payment
        </a>
      );
    } else {
      image = pendingIcon;
      message = "Your payment is pending. If the amount is deducted and payment is unsuccessful, no worries—you will receive your refund within 4-5 business days.";
    }

    return (
      <div className="flex flex-col items-center text-center">
        <img src={image} alt={status} className="w-48 h-48 mb-4" />
        <h1 className="text-3xl font-bold text-pink-700 font-cursive">{message}</h1>
        {button}
      </div>
    );
  };

  return (
    <div className="flex h-full w-full justify-center items-center h-screen bg-pink-50">
      {renderContent()}
    </div>
  );
};

export default PaymentStatus;
