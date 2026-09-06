import { useLocation, useNavigate } from "react-router-dom";

import LetterPreview from "../components/LetterPreview";
import api from "../services/api";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();

  const content = location.state?.content || "";

  if (!content) {
    return <div>No letter content available.</div>;
  }
  const generatePDF = async () => {
    try {
      const response = await api.post(
        "/letters/generate",
        {
          doctor_id: 1,
          template_id: 1,
          patient_name: "POOJA",
          letter_type: "Referral",
          content_html: content,
        },
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/pdf",
        }),
      );

      const link = document.createElement("a");

      link.href = url;

      link.download = "letter.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div>
      <h1>Letter Preview</h1>

      <LetterPreview content={content} />

      <div className="preview-actions">
        <button onClick={() => navigate(-1)}>Edit Letter</button>

        {/* <button
                    onClick={() => {
                        console.log("CONFIRM LETTER");
                    }}
                >
                    Confirm & Generate PDF
                </button> */}

        <button onClick={generatePDF}>Confirm & Generate PDF</button>
      </div>
    </div>
  );
}

export default Preview;
