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
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!orderId) {
        setStatus("Invalid order ID");
        setLoading(false);
        return;
      }

      try {
        // Verify payment status
        const paymentRes = await axios.get(
          `http://localhost:3000/api/v1/payment/verify?order_id=${orderId}`,
          { withCredentials: true }
        );
        setStatus(
          paymentRes.data.success ? paymentRes.data.paymentStatus : "Failed"
        );

        // Fetch payment details
        const detailsRes = await axios.get(
          `http://localhost:3000/api/v1/payment/details?order_id=${orderId}`,
          { withCredentials: true }
        );

        if (detailsRes.data.success) {
          setPaymentDetails(detailsRes.data.payment);

          // Create invoice only if payment details exist
          const invoiceRes = await axios.post(
            "http://localhost:3000/api/v1/invoice/create",
            {
              userId: detailsRes.data.payment.userId._id,
              bookingId: detailsRes.data.payment.bookingId._id,
              totalAmount: detailsRes.data.payment.totalAmount,
              advanceAmount: detailsRes.data.payment.advanceAmount,
              remainingAmount: detailsRes.data.payment.remainingAmount,
              dueDate: detailsRes.data.payment.dueDate,
              paymentMethod: detailsRes.data.payment.paymentMethod,
              transactionId: detailsRes.data.payment.transactionId,
            },
            { withCredentials: true }
          );

          if (invoiceRes.data.invoice) {
            const invoice = invoiceRes.data.invoice;
            const invoiceDetailsRes = await axios.get(
              `http://localhost:3000/api/v1/invoice/get-invoice?invoiceId=${invoice._id}&bookingId=${invoice.bookingId}&userId=${invoice.userId}`,
              { withCredentials: true }
            );
            
            setInvoiceDetails(invoiceDetailsRes.data.invoice);

            // If payment is successful, send invoice email automatically
            await axios.post(
              "http://localhost:3000/api/v1/payment/send-invoice-email",
              { transactionId: detailsRes.data.payment.transactionId },
              { withCredentials: true }
            ); 
            console.log("Invoice email sent successfully.");
          }
        }
      } catch (error) {
        console.error("Error fetching payment or invoice details:", error);
        setStatus("Error verifying payment");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [orderId]);

  const generateInvoice = () => {
    if (!invoiceDetails) return;

    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(255, 230, 240);
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(153, 51, 102);
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    doc.text("BlissfulWed Invoice", 105, 20, null, null, "center");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);

    let yPos = 50;
    const details = [
      { label: "Invoice ID:", value: invoiceDetails._id || "N/A" },
      { label: "Booking ID:", value: invoiceDetails.bookingId?._id },
      {
        label: "Event Type:",
        value: invoiceDetails.bookingId?.service?.serviceType,
      },
      { label: "Customer Name:", value: invoiceDetails.userId?.username },
      { label: "Customer Email:", value: invoiceDetails.userId?.email },
      { label: "Customer Contact:", value: invoiceDetails.userId?.contact },
      {
        label: "Event Address:",
        value: doc.splitTextToSize(
          invoiceDetails.bookingId?.address || "N/A",
          100
        ),
      },
      {
        label: "Event Date:",
        value: new Date(invoiceDetails.bookingId.date).toLocaleDateString(),
      },
      { label: "Total Amount:", value: `${invoiceDetails.totalAmount}` },
      { label: "Advance Paid:", value: `${invoiceDetails.advanceAmount}` },
      {
        label: "Remaining Amount:",
        value: `${invoiceDetails.remainingAmount}`,
      },
      { label: "Payment Method:", value: invoiceDetails.paymentMethod },
      { label: "Payment Status:", value: invoiceDetails.paymentStatus },
      {
        label: "Paid At:",
        value: invoiceDetails.paidAt,
      },
      {
        label: "Due Date:",
        value: invoiceDetails.dueDate
          ? new Date(invoiceDetails.dueDate).toLocaleDateString()
          : "N/A",
      },
    ];

    details.forEach(({ label, value }) => {
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "bold");
      doc.text(label, 25, yPos);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);

      if (Array.isArray(value)) {
        value.forEach((line, index) => {
          doc.text(line, 100, yPos + index * 7);
        });
        yPos += value.length * 7;
      } else {
        doc.text(value.toString(), 100, yPos);
        yPos += 10;
      }
    });

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

    let image, message, button;

    if (status === "Paid") {
      image = paidIcon;
      message = "Your payment has been successfully completed!";
      button = (
        <button
          onClick={generateInvoice}
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md"
        >
          Download Invoice
        </button>
      );
    } else if (status === "Failed") {
      image = failedIcon;
      message = "Payment failed. Please try again.";
      button = (
        <a
          href="/booking/payment"
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg mt-4"
        >
          Retry Payment
        </a>
      );
    } else {
      image = pendingIcon;
      message =
        "Your payment is pending. If the amount is deducted but payment is unsuccessful, you will receive a refund within 4-5 business days.";
    }

    return (
      <>
        <div className="flex relative flex-col items-center text-center">
          <img src={image} alt={status} className="w-48 h-48 mb-4" />
          <h1 className="text-3xl font-bold text-pink-700 font-cursive">
            {message}
          </h1>
          {button}
          <a
            href="/"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg mt-4"
          >
            Go to Home
          </a>
        </div>
        <p className="text-[red] absolute bottom-5 text-2xl font-bold">
          Note: Do not refresh this page
        </p>
      </>
    );
  };

  return (
    <div className="flex h-full w-full justify-center items-center bg-pink-50">
      {renderContent()}
    </div>
  );
};

export default PaymentStatus;
