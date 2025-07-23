"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Firebase create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Firebase update name
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      // Get ID Token from Firebase
      const token = await userCredential.user.getIdToken();
      console.log("COPY THIS TOKEN:", token);
      // Call backend API to store additional user data
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token
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

      setSuccess("Signup successful!");
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
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
