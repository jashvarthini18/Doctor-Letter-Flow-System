import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { getLoggedInDoctor } from "../utils/doctor";

function PatientDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const templateId = searchParams.get("templateId");

  const [template, setTemplate] = useState(null);

  const [patientName, setPatientName] = useState("");
  const [consultingDoctor, setConsultingDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD TEMPLATE
  // =========================

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        if (!templateId) {
          setError("No template selected");
          setLoading(false);
          return;
        }

        const doctor = getLoggedInDoctor();

        if (!doctor) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const response = await api.get(
          `/templates/${templateId}`
        );

        setTemplate(response.data.template);
      } catch (error) {
        console.error(
          "TEMPLATE LOAD ERROR:",
          error
        );

        setError("Failed to load template");
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [templateId]);

  // =========================
  // TEMPLATE TYPE
  // =========================

  const category = template?.category || "";

  const isReferral =
    category === "Referral";

  const isThankYou =
    category === "Thank You";

  const isMedicalCertificate =
    category === "Medical Certificate";

  // =========================
  // CONTINUE TO EDITOR
  // =========================

  const handleContinue = (e) => {
    e.preventDefault();

    setError("");

    if (!patientName.trim()) {
      setError("Patient name is required");
      return;
    }

    if (
      isReferral &&
      !diagnosis.trim()
    ) {
      setError("Diagnosis is required");
      return;
    }

    if (
      isMedicalCertificate &&
      !diagnosis.trim()
    ) {
      setError("Diagnosis is required");
      return;
    }

    if (
      (isReferral || isThankYou) &&
      !consultingDoctor.trim()
    ) {
      setError(
        "Consulting doctor is required"
      );
      return;
    }

    if (
      isMedicalCertificate &&
      !duration.trim()
    ) {
      setError("Duration is required");
      return;
    }

    navigate(
      `/editor?templateId=${templateId}`,
      {
        state: {
          patientName,
          consultingDoctor,
          diagnosis,
          duration,
          date
        }
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="patient-details-message">
        <span className="patient-details-spinner"></span>

        <p>Loading template...</p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error && !template) {
    return (
      <div className="patient-details-message">
        <div className="patient-details-message-card">
          <h2>{error}</h2>

          <button
            onClick={() => navigate("/")}
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="patient-details-message">
        <div className="patient-details-message-card">
          <h2>Template not found</h2>

          <button
            onClick={() => navigate("/")}
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="patient-details-page">

      {/* HEADER */}

      <header className="patient-details-header">

        <div className="patient-details-brand">

          <div className="patient-details-brand-icon">
            +
          </div>

          <div>
            <h1>Doctor Letters</h1>

            <p>
              Create professional medical documents
            </p>
          </div>

        </div>

        <button
          className="patient-history-button"
          onClick={() => navigate("/history")}
        >
          Letter History
        </button>

      </header>


      {/* CONTENT */}

      <main className="patient-details-main">

        <div className="patient-details-card">

          {/* TITLE */}

          <div className="patient-details-title">

            <div className="patient-details-title-icon">
              ✎
            </div>

            <div>
              <h2>Patient Information</h2>

              <p>
                Enter the details required to
                prepare this letter.
              </p>
            </div>

          </div>


          {/* SELECTED TEMPLATE */}

          <div className="selected-template">

            <span>Letter Type</span>

            <strong>
              {template.name}
            </strong>

          </div>


          {/* FORM */}

          <form onSubmit={handleContinue}>

            {/* PATIENT NAME */}

            <div className="form-field">

              <label htmlFor="patientName">
                Patient Name
                <span className="required">*</span>
              </label>

              <input
                id="patientName"
                type="text"
                value={patientName}
                onChange={(e) =>
                  setPatientName(e.target.value)
                }
                placeholder="Enter patient name"
              />

            </div>


            {/* CONSULTING DOCTOR */}

            {(isReferral || isThankYou) && (
              <div className="form-field">

                <label htmlFor="consultingDoctor">
                  Consulting Doctor
                  <span className="required">*</span>
                </label>

                <input
                  id="consultingDoctor"
                  type="text"
                  value={consultingDoctor}
                  onChange={(e) =>
                    setConsultingDoctor(
                      e.target.value
                    )
                  }
                  placeholder="Enter consulting doctor's name"
                />

              </div>
            )}


            {/* DIAGNOSIS */}

            {(isReferral ||
              isMedicalCertificate) && (
              <div className="form-field">

                <label htmlFor="diagnosis">
                  Diagnosis
                  <span className="required">*</span>
                </label>

                <input
                  id="diagnosis"
                  type="text"
                  value={diagnosis}
                  onChange={(e) =>
                    setDiagnosis(
                      e.target.value
                    )
                  }
                  placeholder="Enter diagnosis"
                />

              </div>
            )}


            {/* DURATION */}

            {isMedicalCertificate && (
              <div className="form-field">

                <label htmlFor="duration">
                  Duration
                  <span className="required">*</span>
                </label>

                <input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      e.target.value
                    )
                  }
                  placeholder="Example: 3 days"
                />

              </div>
            )}


            {/* DATE */}

            <div className="form-field">

              <label htmlFor="date">
                Date
              </label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>


            {/* ERROR */}

            {error && (
              <div className="patient-form-error">
                {error}
              </div>
            )}


            {/* ACTIONS */}

            <div className="patient-details-actions">

              <button
                type="button"
                className="patient-back-button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              <button
                type="submit"
                className="patient-continue-button"
              >
                Continue to Editor
                <span>→</span>
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default PatientDetails;