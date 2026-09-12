// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { getLoggedInDoctor } from "../utils/doctor";

// function Templates() {
//   const navigate = useNavigate();
//   const doctor = getLoggedInDoctor();

//   if (!doctor) {
//     return <div>Please login first.</div>;
//   }

//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await api.get("/templates");

//         setTemplates(response.data.templates);
//       } catch (error) {
//         console.error(error);

//         setError("Failed to load templates");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   if (loading) {
//     return <h2>Loading templates...</h2>;
//   }

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   return (
//     <div>
//       <h1>Choose a Letter Template</h1>

//       <button type="button" onClick={() => navigate("/history")}>
//         Letter History
//       </button>

//       {templates.map((template) => (
//         <div key={template.id}>
//           <h2>{template.name}</h2>

//           <p>{template.category}</p>

//           <button
//             onClick={() => {
//               // navigate(`/editor?templateId=${template.id}`);
//               navigate(`/patient-details?templateId=${template.id}`);
//             }}
//           >
//             Use Template
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Templates;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { getLoggedInDoctor } from "../utils/doctor";

function Templates() {
  const navigate = useNavigate();
  const doctor = getLoggedInDoctor();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get("/templates");

        setTemplates(response.data.templates || []);
      } catch (error) {
        console.error("TEMPLATES ERROR:", error);

        setError("Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // =========================
  // LOGIN CHECK
  // =========================

  if (!doctor) {
    return (
      <div className="templates-message">
        <div className="templates-message-card">
          <h2>Please login first</h2>

          <p>
            You need to access your doctor account
            before creating a letter.
          </p>

          <button
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="templates-message">
        <div className="templates-loading">
          <span className="templates-spinner"></span>

          <p>Loading templates...</p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="templates-message">
        <div className="templates-message-card">
          <h2>{error}</h2>

          <button
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="templates-page">

      {/* HEADER */}

      <header className="templates-header">

        <div className="templates-brand">

          <div className="templates-brand-icon">
            +
          </div>

          <div>
            <h1>Doctor Letters</h1>

            <p>
              Create professional medical documents
            </p>
          </div>

        </div>


        <div className="templates-header-actions">

          <div className="doctor-welcome">
            <span>Welcome</span>

            <strong>
              {doctor.name || "Doctor"}
            </strong>
          </div>

          <button
            className="history-nav-button"
            onClick={() => navigate("/history")}
          >
            Letter History
          </button>

        </div>

      </header>


      {/* MAIN CONTENT */}

      <main className="templates-main">

        <div className="templates-title">

          <div>
            <h2>Choose a Letter Template</h2>

            <p>
              Select a template to create a new
              medical letter.
            </p>
          </div>

        </div>


        {/* TEMPLATE CARDS */}

        <div className="templates-grid">

          {templates.map((template) => (

            <div
              key={template.id}
              className="template-card"
            >

              {/* Card Icon */}

              <div className="template-icon">
                <span>▤</span>
              </div>


              {/* Card Content */}

              <div className="template-card-content">

                <h3>
                  {template.name}
                </h3>

                <p className="template-category">
                  {template.category}
                </p>

                <p className="template-description">
                  Create a professional{" "}
                  {template.name.toLowerCase()}{" "}
                  using this ready-to-edit template.
                </p>

              </div>


              {/* Card Button */}

              <button
                className="use-template-button"
                onClick={() => {
                  navigate(
                    `/patient-details?templateId=${template.id}`
                  );
                }}
              >
                Use Template
                <span>→</span>
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Templates;