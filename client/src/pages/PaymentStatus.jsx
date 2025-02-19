import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import paidIcon from "../assets/green-tick.png";
import failedIcon from "../assets/red-cross.png";
import pendingIcon from "../assets/yellow-exclamation.png";
import jsPDF from "jspdf";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
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

    axios
      .get(`http://localhost:3000/api/v1/payment/details?order_id=${orderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setPaymentDetails(res.data.payment);
        } else {
          setStatus("Payment verification failed");
        }
      })
      .catch((error) => {
        console.error("Payment verification error:", error);
        setStatus("Error verifying payment");
      });
  }, [orderId]);
  const generateInvoice = () => {
    if (!paymentDetails) return;

    const doc = new jsPDF();

    // Set background color (light pink)
    doc.setFillColor(255, 230, 240); // Soft pink
    doc.rect(0, 0, 210, 297, "F"); // Covers the full A4 page

    // Set brand colors
    doc.setTextColor(153, 51, 102); // Soft pinkish-purple for branding
    doc.setFont("times", "italic"); // Cursive-style font for elegance
    doc.setFontSize(20);

    // Title
    doc.text("BlissfulWed Invoice", 105, 20, null, null, "center");

    // Reset font for details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);

    // Invoice details
    let yPos = 50; // Initial y position for text
    const lineHeight = 10; // Spacing between lines

    const boxStartY = 50;
    const boxPadding = 5;
    const boxWidth = 170;
    const boxHeight = 8;
    const labelX = 25;
    const valueX = 100;

    // Invoice details array
    const details = [
      { label: "Invoice ID:", value: paymentDetails.transactionId || "N/A" },
      { label: "Booking ID:", value: paymentDetails.bookingId?._id },
      { label: "Total Amount:", value: `${paymentDetails.totalAmount}` },
      { label: "Advance Paid:", value: `${paymentDetails.advanceAmount}` },
      {
        label: "Remaining Amount:",
        value: `${paymentDetails.remainingAmount}`,
      },
      { label: "Payment Method:", value: paymentDetails.paymentMethod },
      { label: "Payment Status:", value: paymentDetails.paymentStatus },
      {
        label: "Paid At:",
        value: new Date(paymentDetails.paidAt).toLocaleString(),
      },
      {
        label: "Due Date:",
        value: paymentDetails.dueDate
          ? new Date(paymentDetails.dueDate).toLocaleDateString()
          : "N/A",
      },
    ];

    yPos = boxStartY;

    details.forEach(({ label, value }) => {
      // Draw a light gray background box
      doc.setFillColor(255, 230, 240); // Light gray
      doc.rect(20, yPos - boxPadding, boxWidth, boxHeight, "F");

      // Draw label
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 50);
      doc.text(label, labelX, yPos);

      // Draw value
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(value.toString(), valueX, yPos);

      yPos += lineHeight + 5; // Extra spacing for readability
    });

    // Booking & Cancellation details
    if (paymentDetails.bookingDate) {
      doc.text(
        `Booking Date: ${new Date(
          paymentDetails.bookingDate
        ).toLocaleDateString()}`,
        20,
        yPos
      );
      yPos += lineHeight;
    }

    if (paymentDetails.cancellationStatus !== "Not Cancelled") {
      doc.text(
        `Cancellation Status: ${paymentDetails.cancellationStatus}`,
        20,
        yPos
      );
      yPos += lineHeight;
      if (paymentDetails.cancellationReason) {
        doc.text(`Reason: ${paymentDetails.cancellationReason}`, 20, yPos);
        yPos += lineHeight;
      }
    }

    if (paymentDetails.refundStatus !== "Not Requested") {
      doc.text(`Refund Status: ${paymentDetails.refundStatus}`, 20, yPos);
      yPos += lineHeight;
      if (paymentDetails.refundAmount > 0) {
        doc.text(`Refund Amount: ${paymentDetails.refundAmount}`, 20, yPos);
        yPos += lineHeight;
      }
    }

    // Footer message
    doc.setTextColor(153, 51, 102);
    doc.setFont("times", "italic");
    doc.text(
      "Thank you for choosing BlissfulWed!",
      105,
      280,
      null,
      null,
      "center"
    );

    doc.save("BlissfulWed_Invoice.pdf");
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loader"></div>;
    }

    let image, message, button, a;

    if (status === "Paid") {
      image = paidIcon;
      message = "Your payment has been successfully done!";
      a = (
        <button
          onClick={generateInvoice}
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md"
        >
          Download Invoice
        </button>
      );
      button = (
        <a
          href="/"
          className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg mt-4"
        >
          Go to Home
        </a>
      );
    } else if (status === "Failed") {
      image = failedIcon;
      message = "Payment failed. Please try again.";
      button,
        (a = (
          <a
            href="/booking/payment"
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg mt-4"
          >
            Retry Payment
          </a>
        ));
    } else {
      image = pendingIcon;
      message =
        "Your payment is pending. If the amount is deducted and payment is unsuccessful, no worries—you will receive your refund within 4-5 business days.";
    }

    return (
      <div className="flex flex-col items-center text-center">
        <img src={image} alt={status} className="w-48 h-48 mb-4" />
        <h1 className="text-3xl font-bold text-pink-700 font-cursive">
          {message}
        </h1>
        {a}
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
