// src/components/Categories.jsx
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Categories = () => {
  const [form, setForm] = useState({ label: "", link: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Upload an image.");
    setLoading(true);

    try {
      const imageRef = ref(storage, `categories/${Date.now()}-${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "categories"), {
        ...form,
        image: imageUrl,
      });

      alert("✅ Category added!");
      setForm({ label: "", link: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          name="label"
          placeholder="Label (e.g., Pizzas@169)"
          className="w-full border p-2"
          value={form.label}
          onChange={handleChange}
        />
        <input
          type="text"
          name="link"
          placeholder="Link (e.g., /category/169)"
          className="w-full border p-2"
          value={form.link}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default Categories;