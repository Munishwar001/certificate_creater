import React, { useState } from "react";
import styles from "./EmailVerification.module.css";
import apiService from "../../../services/apiService";
const EmailVerification = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiService.verify(email);
    console.log("Email submitted:", email);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify Your Email</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Send Verification
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
