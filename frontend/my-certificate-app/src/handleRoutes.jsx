import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailVerification from "./components/verifyUser/EmailVerification";
import UploadPage from "./components/upload page/uploadPage";

export default function HandleRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmailVerification />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </BrowserRouter>
    );
}