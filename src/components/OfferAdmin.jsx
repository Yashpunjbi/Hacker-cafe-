import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const OfferAdmin = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState("");

  const fetchOffers = async () => {
    const offersRef = collection(db, "offers");
    const snapshot = await getDocs(offersRef);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleAddOffer = async () => {
    if (!newOffer.trim()) return;
    await addDoc(collection(db, "offers"), { text: newOffer });
    setNewOffer("");
    fetchOffers();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "offers", id));
    fetchOffers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">🔥 Manage Offers</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newOffer}
          onChange={(e) => setNewOffer(e.target.value)}
          placeholder="Add new offer..."
          className="flex-1 px-4 py-2 border rounded focus:outline-pink-500"
        />
        <button
          onClick={handleAddOffer}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {offers.map((offer) => (
          <li
            key={offer.id}
            className="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <span className="text-gray-800">{offer.text}</span>
            <button
              onClick={() => handleDelete(offer.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferAdmin;