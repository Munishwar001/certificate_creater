import styles from "./uploadPage.module.css";
import { useState } from "react";
import apiService from "../../../services/apiService";
export default function UploadPage() {
    const [excelFile, setExcelFile] = useState(null);
    const [templateFile, setTemplateFile] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('excelFile', excelFile);
      formData.append("templateFile", templateFile);
      console.log(formData);
      await apiService.uploadFile(formData);
      console.log("Files to upload:", formData);
      alert("request sended");
  };

  return (
    <div className={`${styles.container} ${styles.uploadContainer}`}>
      <h1 className={styles.title}>File Upload</h1>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="excelFile" className={styles.inputLabel}>
            Excel File
          </label>
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            className={styles.fileInput}
            onChange={(e) => setExcelFile(e.target.files[0])}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="templateFile" className={styles.inputLabel}>
            Template File
          </label>
          <input
            type="file"
            id="templateFile"
            name="templateFile"
            className={styles.fileInput}
            onChange={(e) => setTemplateFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Upload Files
        </button>
      </form>
    </div>
  );
}
