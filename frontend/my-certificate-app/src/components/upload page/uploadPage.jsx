import styles from "./uploadPage.module.css";
import { useState ,useEffect} from "react";
import apiService from "../../../services/apiService";
import socket from "../../../Socket/connection";
import { FaEye } from "react-icons/fa";
export default function UploadPage() {
    const [excelFile, setExcelFile] = useState(null);
    const [templateFile, setTemplateFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [previewLink, setPreviewLink] = useState(null);
 
  useEffect(() => {
    socket.on("output", (message) => {
      console.log("message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('excelFile', excelFile);
      formData.append("templateFile", templateFile);
      formData.append("socket",socket.id);
      console.log(formData);
      await apiService.uploadFile(formData);
      console.log("Files to upload:", formData);
  };
  const handleDownload =  async (link,name) => {
    const endpoint = new URL(link).pathname;
    console.log(endpoint);
    await apiService.download(endpoint,name);
    
 }
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

      <div className={styles.messageContainer}>
        <h2 className={styles.messageTitle}>Generated :</h2>
        <ul className={styles.messageList}>
          {messages.map((msg, index) => (
            <li key={index} className={styles.messageItem}>
              <strong>{msg.name + "  "}</strong>
              <button onClick={() => setPreviewLink(msg.link)}>
                <FaEye />
              </button>
              <button onClick={() => handleDownload(msg.link,msg.name)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
      {previewLink && (
        <div className={styles.previewContainer}>
          <h3>PDF Preview</h3>
          <iframe
            src={previewLink}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            title="Certificate Preview"
          />
        </div>
      )}
    </div>
  );
}

