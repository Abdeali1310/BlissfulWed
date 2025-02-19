import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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
          setStatus(`Payment ${res.data.paymentStatus}`);
        } else {
          setStatus("Payment verification failed");
        }
      })
      .catch(() => setStatus("Error verifying payment"))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div style={styles.container} className="h-full w-full">
      {loading ? (
        <div style={styles.loader}></div>
      ) : (
        <h1 style={styles.text}>{status}</h1>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    backgroundColor: "#fff5f7",
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff69b4",
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #ffb6c1",
    borderTop: "5px solid #ff69b4",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default PaymentStatus;
