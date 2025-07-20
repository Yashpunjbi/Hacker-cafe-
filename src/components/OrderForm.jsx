import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

// Call this function on form submit
const addOrderToFirebase = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    alert("Order placed successfully!");
    console.log("Order ID: ", docRef.id);
  } catch (error) {
    alert("Failed to place order!");
    console.error("Error adding document: ", error);
  }
};
