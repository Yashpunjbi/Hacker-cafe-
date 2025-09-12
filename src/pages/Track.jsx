import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Track() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      console.log("❌ No orderId in URL");
      setLoading(false);
      return;
    }

    console.log("🔍 Tracking orderId:", orderId);

    const unsub = onSnapshot(doc(db, "orders", orderId), (snap) => {
      if (snap.exists()) {
        console.log("✅ Order data:", snap.data());
        setOrder({ id: snap.id, ...snap.data() });
      } else {
        console.log("⚠️ No such order found in Firestore");
        setOrder(null);
      }
      setLoading(false);
    }, (err) => {
      console.error("🔥 Firestore error:", err);
      setLoading(false);
    });

    return () => unsub();
  }, [orderId]);

  if (loading) return <div className="p-4">⏳ Loading your order...</div>;

  if (!order) return <div className="p-4">❌ Order not found for ID: {orderId}</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">📦 Order Tracking</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      {order.createdAt && (
        <p>
          <strong>Placed At:</strong>{" "}
          {order.createdAt.toDate
            ? order.createdAt.toDate().toLocaleString()
            : order.createdAt}
        </p>
      )}
    </div>
  );
}