import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";
import { getLoggedInDoctor } from "../utils/doctor";

function LetterEditor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const patientDetails = location.state || {};

  const templateId = searchParams.get("templateId");
  const letterId = searchParams.get("letterId");

  const [content, setContent] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const [doctorProfile, setDoctorProfile] = useState(null);
  const [doctorProfileLoading, setDoctorProfileLoading] = useState(true);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const latestContent = useRef("");

  const doctor = getLoggedInDoctor();

  const formatLetterDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  const replacePlaceholders = (html, details) => {
    return (
      html
        .replace(/{{patient_name}}/g, details.patientName || "")
        .replace(/{{consulting_doctor}}/g, details.consultingDoctor || "")
        .replace(/{{diagnosis}}/g, details.diagnosis || "")
        .replace(/{{duration}}/g, details.duration || "")
        // .replace(/{{date}}/g, details.date || "")
        .replace(/{{date}}/g, formatLetterDate(details.date))
        .replace(/{{doctor_name}}/g, doctorProfile?.name || doctor?.name || "")
        .replace(
          /{{clinic_name}}/g,
          doctorProfile?.clinic_name || doctor?.clinic_name || "",
        )
        .replace(/{{clinic_address}}/g, doctorProfile?.clinic_address || "")
        .replace(
          /{{logo_url}}/g,
          doctorProfile?.logo_url || doctor?.logo_url
            ? `<img src="${
                doctorProfile?.logo_url || doctor?.logo_url
              }" class="clinic-logo" alt="Clinic Logo" />`
            : "",
        )
        .replace(
          /{{signature_url}}/g,
          doctorProfile?.signature_url || doctor?.signature_url
            ? `<img src="${
                doctorProfile?.signature_url || doctor?.signature_url
              }" class="doctor-signature" alt="Doctor Signature" />`
            : "",
        )
    );
  };


  useEffect(() => {
    const loadEditorContent = async () => {
      if (!doctor || doctorProfileLoading) return;

      try {
        setLoading(true);
        setError("");

        if (letterId) {
          const response = await api.get(`/letters/${letterId}`);
          const letter = response.data.letter;

          setContent(letter.content_html);
          latestContent.current = letter.content_html;

          if (letter.template_id) {
            const templateResponse = await api.get(
              `/templates/${letter.template_id}`,
            );

            setTemplateName(templateResponse.data.template.name);
          } else {
            setTemplateName(letter.letter_type || "Letter");
          }

          return;
        }

        if (templateId) {
          const response = await api.get(`/templates/${templateId}`);

          const template = response.data.template;

          console.log("TEMPLATE FROM API:", template);

          setTemplateName(template.name);

          const finalContent = replacePlaceholders(
            template.content_html,
            patientDetails,
          );

          console.log("FINAL CONTENT SENT TO EDITOR:", finalContent);

          setContent(finalContent);
          latestContent.current = finalContent;

          return;
        }

        setError("No template or letter selected");
      } catch (error) {
        console.error("EDITOR LOAD ERROR:", error);
        setError("Failed to load letter");
      } finally {
        setLoading(false);
      }
    };

    loadEditorContent();
  }, [
    templateId,
    letterId,
    doctorProfile,
    doctorProfileLoading,
    patientDetails,
  ]);

  useEffect(() => {
    const loadDoctorProfile = async () => {
      try {
        if (!doctor) {
          setDoctorProfileLoading(false);
          return;
        }

        const response = await api.get(`/doctors/${doctor.id}/profile`);

        setDoctorProfile(response.data.doctor);
      } catch (error) {
        console.error("DOCTOR PROFILE LOAD ERROR:", error);
      } finally {
        setDoctorProfileLoading(false);
      }
    };

    loadDoctorProfile();
  }, [doctor?.id]);

  useEffect(() => {
    if (!doctor || !templateId || letterId) {
      setDraftLoaded(true);
      return;
    }

    setDraftLoaded(true);
  }, [doctor?.id, templateId, letterId]);

  useEffect(() => {
    if (!doctor || !templateId || letterId) return;

    const saveDraft = async () => {
      if (!latestContent.current) return;

      try {
        setSaveStatus("Saving...");

        await api.post("/drafts", {
          doctor_id: doctor.id,
          template_id: Number(templateId),
          content_html: latestContent.current,
        });

        setSaveStatus("Saved");

        setTimeout(() => setSaveStatus(""), 2000);
      } catch (error) {
        console.error("DRAFT SAVE ERROR:", error);
        setSaveStatus("Save failed");
      }
    };

    const interval = setInterval(saveDraft, 5000);

    return () => clearInterval(interval);
  }, [doctor?.id, templateId, letterId]);

  const handleContentChange = (newContent) => {
    latestContent.current = newContent;
    setContent(newContent);
  };

  const handlePreview = () => {
    if (!doctor) {
      alert("Please login first");
      return;
    }

    navigate("/preview", {
      state: {
        content: latestContent.current,
        templateId: templateId ? Number(templateId) : null,
        letterId: letterId ? Number(letterId) : null,
        templateName: templateName,
        patientName: patientDetails.patientName || "",
        consultingDoctor: patientDetails.consultingDoctor || "",
        diagnosis: patientDetails.diagnosis || "",
        date: patientDetails.date || "",
        duration: patientDetails.duration || "",
      },
    });
  };

  if (!doctor) {
    return (
      <div className="editor-message-page">
        <div className="editor-message-card">
          <div className="editor-message-icon">🔒</div>

          <h2>Please login first</h2>

          <p>You need to login as a doctor before creating a letter.</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading || doctorProfileLoading || !draftLoaded) {
    return (
      <div className="editor-message-page">
        <div className="editor-message-card">
          <div className="editor-loader"></div>

          <h2>Loading letter...</h2>

          <p>Preparing your letter editor.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="editor-message-page">
        <div className="editor-message-card error-card">
          <div className="editor-message-icon">⚠️</div>

          <h2>Unable to load letter</h2>

          <p>{error}</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="letter-editor-page">
      {/* Header */}
      <header className="editor-header">
        <div className="editor-header-left">
          <button
            type="button"
            className="editor-back-button"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div>
            <span className="editor-header-label">Letter Editor</span>

            <h1>{templateName}</h1>
          </div>
        </div>

        <div className="editor-header-right">
          {saveStatus && (
            <div
              className={`save-status ${
                saveStatus === "Saved"
                  ? "save-success"
                  : saveStatus === "Save failed"
                    ? "save-error"
                    : "save-saving"
              }`}
            >
              <span className="save-dot"></span>
              {saveStatus}
            </div>
          )}

          <span className="editor-mode">Editing Mode</span>
        </div>
      </header>

      {/* Editor Content */}
      <main className="editor-main">
        <div className="editor-intro">
          <div>
            <h2>Edit your letter</h2>

            <p>
              Customize the letter content before previewing and generating the
              PDF.
            </p>
          </div>

          <div className="editor-tip">
            <span>✦</span>
            Changes are saved automatically
          </div>
        </div>

        {/* Rich Text Editor */}
        <section className="editor-card">
          <div className="editor-card-header">
            <div className="editor-card-title">
              <span className="editor-document-icon">📄</span>

              <div>
                <strong>{templateName}</strong>
                <span>Professional Letter</span>
              </div>
            </div>
          </div>

          <div className="editor-content-area">
            <RichTextEditor
              key={letterId || templateId}
              content={content}
              onChange={handleContentChange}
            />
          </div>
        </section>

        {/* Actions */}
        <div className="editor-actions">
          <button
            type="button"
            className="secondary-editor-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <button
            type="button"
            className="preview-editor-button"
            onClick={handlePreview}
          >
            Preview Letter
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default LetterEditor;
