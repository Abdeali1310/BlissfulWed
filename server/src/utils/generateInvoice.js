const { jsPDF } = require("jspdf");

const generateInvoicePdf = async (invoiceDetails) => {
  try {
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(255, 230, 240);
    doc.rect(0, 0, 210, 297, "F");

    // Title
    doc.setTextColor(153, 51, 102);
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    doc.text("BlissfulWed Invoice", 105, 20, null, null, "center");

    // Invoice details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);

    let yPos = 50;
    const details = [
      { label: "Invoice ID:", value: invoiceDetails._id || "N/A" },
      { label: "Booking ID:", value: invoiceDetails.bookingId?._id || "N/A" },
      {
        label: "Event Type:",
        value: invoiceDetails.bookingId?.service?.serviceType || "N/A",
      },
      { label: "Customer Name:", value: invoiceDetails.userId?.username || "N/A" },
      { label: "Customer Email:", value: invoiceDetails.userId?.email || "N/A" },
      { label: "Customer Contact:", value: invoiceDetails.userId?.contact || "N/A" },
      {
        label: "Event Address:",
        value: invoiceDetails.bookingId?.address
          ? doc.splitTextToSize(invoiceDetails.bookingId.address, 100)
          : "N/A",
      },
      {
        label: "Event Date:",
        value: invoiceDetails.bookingId?.date
          ? new Date(invoiceDetails.bookingId.date).toLocaleDateString()
          : "N/A",
      },
      { label: "Total Amount:", value: `${invoiceDetails.totalAmount || 0}` },
      { label: "Advance Paid:", value: `${invoiceDetails.advanceAmount || 0}` },
      {
        label: "Remaining Amount:",
        value: `${invoiceDetails.remainingAmount || 0}`,
      },
      { label: "Payment Method:", value: invoiceDetails.paymentMethod || "N/A" },
      { label: "Payment Status:", value: invoiceDetails.paymentStatus || "N/A" },
      {
        label: "Paid At:",
        value: invoiceDetails.paidAt || "N/A",
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

    // Thank You message
    doc.setTextColor(153, 51, 102);
    doc.setFont("times", "italic");
    doc.text("Thank you for choosing BlissfulWed!", 105, 280, null, null, "center");

    // Return PDF buffer
    return doc.output("arraybuffer");
  } catch (error) {
    console.error("❌ Error generating invoice PDF:", error);
    throw new Error("Invoice PDF generation failed.");
  }
};

module.exports = generateInvoicePdf;
