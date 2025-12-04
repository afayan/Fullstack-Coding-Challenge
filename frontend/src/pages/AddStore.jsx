import React, { useState } from "react";
import url from "../components/url";

function AddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function addStore(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("jwtToken");

    try {
      const res = await fetch(`${url}/addstore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // add JWT token
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setMessage(data.message);

      if (!res.ok) return;

      // Reset form after success
      setForm({ name: "", email: "", address: "" });
    } catch (error) {
      setMessage("Something went wrong");
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>

      <form className="loginform" onSubmit={addStore}>
      <h2>Add Store</h2>
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={form.address}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Add Store
        </button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default AddStore;
