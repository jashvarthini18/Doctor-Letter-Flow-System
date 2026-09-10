// import { useLocation, useNavigate } from "react-router-dom";
// import LetterPreview from "../components/LetterPreview";
// import api from "../services/api";
// import { getLoggedInDoctor } from "../utils/doctor";

// function Preview() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const content = location.state?.content;
//   const templateId = location.state?.templateId;
//   const letterId = location.state?.letterId;
//   const templateName = location.state?.templateName || "Letter";

//   // Patient details received from LetterEditor
//   const patientName = location.state?.patientName || "";
//   const consultingDoctor = location.state?.consultingDoctor || "";
//   const diagnosis = location.state?.diagnosis || "";
//   const date = location.state?.date || "";

//   const generatePDF = async () => {
//     try {
//       const doctor = getLoggedInDoctor();

//       if (!doctor) {
//         alert("Please login first");
//         return;
//       }

//       console.log("Generating letter...");

//       const response = await api.post("/letters/generate", {
//         doctor_id: doctor.id,

//         template_id: templateId || null,

//         patient_name: patientName,

//         // letter_type: templateId ? getLetterType(templateId) : "Letter",
//         letter_type: templateName,

//         content_html: content,
//       });

//       console.log("Letter generated:", response.data);

//       const downloadUrl = response.data.download_url;

//       if (!downloadUrl) {
//         throw new Error("Download URL was not returned");
//       }

//       window.open(downloadUrl, "_blank");
//     } catch (error) {
//       console.error("PDF generation failed:", error);

//       alert("Failed to generate PDF");
//     }
//   };

//   // =========================
//   // GET LETTER TYPE
//   // =========================

//   const getLetterType = (id) => {
//     // Temporary mapping based on
//     // your current template IDs.

//     if (Number(id) === 1) {
//       return "Referral";
//     }

//     if (Number(id) === 2) {
//       return "Thank You";
//     }

//     if (Number(id) === 3) {
//       return "Medical Certificate";
//     }

//     return "Other";
//   };

//   // =========================
//   // NO CONTENT
//   // =========================

//   if (!content) {
//     return <div>No letter content available.</div>;
//   }

//   return (
//     <div>
//       <LetterPreview content={content} />

//       <div className="preview-actions">
//         <button onClick={() => navigate(-1)}>Edit Letter</button>

//         <button onClick={generatePDF}>Confirm & Generate PDF</button>
//       </div>
//     </div>
//   );
// }

// export default Preview;

// import { useLocation, useNavigate } from "react-router-dom";
// import LetterPreview from "../components/LetterPreview";
// import api from "../services/api";
// import { getLoggedInDoctor } from "../utils/doctor";

// function Preview() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const content = location.state?.content;

//   const templateId =
//     location.state?.templateId;

//   const letterId =
//     location.state?.letterId;

//   const templateName =
//     location.state?.templateName || "Letter";

//   const patientName =
//     location.state?.patientName || "";

//   const generatePDF = async () => {
//     try {
//       const doctor =
//         getLoggedInDoctor();

//       if (!doctor) {
//         alert("Please login first");
//         return;
//       }

//       console.log(
//         "Generating letter..."
//       );
// console.log(
//   "CONTENT BEING SENT TO BACKEND:",
//   content
// );
//       const response = await api.post(
//         "/letters/generate",
//         {
//           doctor_id: doctor.id,

//           template_id:
//             templateId || null,

//           patient_name:
//             patientName,

//           letter_type:
//             templateName,

//           content_html:
//             content,
//         }
//       );

//       console.log(
//         "Letter generated:",
//         response.data
//       );

//       const downloadUrl =
//         response.data.download_url;

//       if (!downloadUrl) {
//         throw new Error(
//           "Download URL was not returned"
//         );
//       }

//       window.open(
//         downloadUrl,
//         "_blank"
//       );

//     } catch (error) {
//       console.error(
//         "PDF generation failed:",
//         error
//       );

//       alert(
//         "Failed to generate PDF"
//       );
//     }
//   };

//   if (!content) {
//     return (
//       <div>
//         No letter content available.
//       </div>
//     );
//   }

//   return (
//     <div>

//       <LetterPreview
//         content={content}
//       />

//       <div className="preview-actions">

//         <button
//           onClick={() =>
//             navigate(-1)
//           }
//         >
//           Edit Letter
//         </button>

//         <button
//           onClick={generatePDF}
//         >
//           Confirm & Generate PDF
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Preview;

import { useLocation, useNavigate } from "react-router-dom";
import LetterPreview from "../components/LetterPreview";
import api from "../services/api";
import { getLoggedInDoctor } from "../utils/doctor";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();

  const content = location.state?.content;

  const templateId =
    location.state?.templateId;

  const letterId =
    location.state?.letterId;

  const templateName =
    location.state?.templateName || "Letter";

  const patientName =
    location.state?.patientName || "";

  const generatePDF = async () => {
    try {
      const doctor =
        getLoggedInDoctor();

      if (!doctor) {
        alert("Please login first");
        return;
      }

      console.log(
        "Generating letter..."
      );

      console.log(
        "CONTENT BEING SENT TO BACKEND:",
        content
      );

      const response = await api.post(
        "/letters/generate",
        {
          doctor_id: doctor.id,

          template_id:
            templateId || null,

          patient_name:
            patientName,

          letter_type:
            templateName,

          content_html:
            content,
        }
      );

      console.log(
        "Letter generated:",
        response.data
      );

      const downloadUrl =
        response.data.download_url;

      if (!downloadUrl) {
        throw new Error(
          "Download URL was not returned"
        );
      }

      window.open(
        downloadUrl,
        "_blank"
      );

    } catch (error) {
      console.error(
        "PDF generation failed:",
        error
      );

      alert(
        "Failed to generate PDF"
      );
    }
  };

  if (!content) {
    return (
      <div className="preview-message-page">
        <div className="preview-message-card">

          <div className="preview-message-icon">
            📄
          </div>

          <h2>
            No Letter Available
          </h2>

          <p>
            No letter content is available
            for preview.
          </p>

          <button
            type="button"
            className="preview-primary-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="preview-page">

      {/* Header */}
      <header className="preview-header">

        <div className="preview-header-left">

          <button
            type="button"
            className="preview-back-button"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div>
            <span className="preview-header-label">
              Letter Preview
            </span>

            <h1>
              {templateName}
            </h1>
          </div>

        </div>

        <div className="preview-header-badge">
          A4 Document
        </div>

      </header>


      {/* Main Content */}
      <main className="preview-main">

        <div className="preview-intro">

          <div>
            <h2>
              Review your letter
            </h2>

            <p>
              Check the document carefully before
              generating the final PDF.
            </p>
          </div>

          <div className="preview-info">
            <span>✓</span>
            Ready to generate
          </div>

        </div>


        {/* A4 Preview */}
        <section className="preview-card">

          <div className="preview-card-header">

            <div className="preview-card-title">

              <span className="preview-document-icon">
                📄
              </span>

              <div>
                <strong>
                  {templateName}
                </strong>

                <span>
                  A4 Preview
                </span>
              </div>

            </div>

            <span className="preview-status">
              Preview
            </span>

          </div>

          <div className="preview-document-area">

            <LetterPreview
              content={content}
            />

          </div>

        </section>


        {/* Actions */}
        <div className="preview-actions">

          <button
            type="button"
            className="preview-edit-button"
            onClick={() => navigate(-1)}
          >
            <span>←</span>
            Edit Letter
          </button>

          <button
            type="button"
            className="preview-generate-button"
            onClick={generatePDF}
          >
            Confirm & Generate PDF
            <span>→</span>
          </button>

        </div>

      </main>

    </div>
  );
}

export default Preview;