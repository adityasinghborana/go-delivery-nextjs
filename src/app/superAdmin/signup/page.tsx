"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SuperAdminSignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const usercredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(usercredential.user, {
        displayName: form.name,
      });
      const token = await usercredential.user.getIdToken();
      console.log("copy", token);
      const res = await fetch("/api/superAdminUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save user in backend");
      }
      setSuccess("Signup successfully");
    } catch (error) {
      console.error("signup failed", error);
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Signup</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="name"
        required
        value={form.name}
        onChange={changeHandler}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="email"
        required
        value={form.email}
        onChange={changeHandler}
      />
      <label htmlFor="phone">Phone number</label>
      <input
        id="phone"
        name="phone"
        type="text"
        placeholder="phone number"
        value={form.phone}
        onChange={changeHandler}
      />
      <label htmlFor="password">Password</label>
      <input
        id="passowrd"
        name="password"
        type="password"
        value={form.password}
        onChange={changeHandler}
      />
      <button onClick={handleSubmit}>
        {loading ? "Signing ......" : "Signup"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
