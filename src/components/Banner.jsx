// src/components/Banners.jsx
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Banners = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image.");
    setLoading(true);

    try {
      const imageRef = ref(storage, `banners/${Date.now()}-${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "banners"), {
        ...form,
        image: imageUrl,
      });

      alert("✅ Banner uploaded successfully!");
      setForm({ title: "", subtitle: "", buttonText: "", buttonLink: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          className="w-full border p-2"
          value={form.subtitle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          className="w-full border p-2"
          value={form.buttonText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="buttonLink"
          placeholder="Button Link"
          className="w-full border p-2"
          value={form.buttonLink}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Banner"}
        </button>
      </form>
    </div>
  );
};

export default Banners;
