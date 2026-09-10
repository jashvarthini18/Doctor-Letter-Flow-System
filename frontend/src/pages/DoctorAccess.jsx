// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function DoctorAccess() {
//   const navigate = useNavigate();

//   const [mobileNumber, setMobileNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (!mobileNumber) {
//       setError("Please enter your mobile number");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/doctors/access", {
//         mobile_number: mobileNumber,
//       });

//       const doctor = response.data.doctor;

//       // Store doctor information
//       localStorage.setItem("doctor", JSON.stringify(doctor));

//       console.log("Doctor logged in:", doctor);

//       // Go to template gallery
//       navigate("/templates");
//     } catch (error) {
//       console.error("DOCTOR ACCESS ERROR:", error);

//       if (error.response?.status === 404) {
//         setError("Doctor not found");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="doctor-access-page">
//       <div className="doctor-access-card">
//         <h1>Doctor Access</h1>

//         <p>Enter your registered mobile number</p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="tel"
//             placeholder="Mobile Number"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//           />

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit" disabled={loading}>
//             {loading ? "Checking..." : "Continue"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default DoctorAccess;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function DoctorAccess() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!mobileNumber) {
      setError("Please enter your mobile number");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/doctors/access", {
        mobile_number: mobileNumber,
      });

      const doctor = response.data.doctor;

      localStorage.setItem("doctor", JSON.stringify(doctor));

      console.log("Doctor logged in:", doctor);

      navigate("/templates");
    } catch (error) {
      console.error("DOCTOR ACCESS ERROR:", error);

      if (error.response?.status === 404) {
        setError("Doctor not found");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-access-page">

      {/* Left / Top branding area */}

      <div className="doctor-access-brand">
        <div className="brand-icon">
          +
        </div>

        <h1>Doctor Letters</h1>

        <p>
          Create professional medical letters
          quickly and securely.
        </p>
      </div>


      {/* Login Card */}

      <div className="doctor-access-card">

        <div className="doctor-access-card-header">

          <h2>Doctor Access</h2>

          <p>
            Enter your registered mobile number
            to continue.
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="doctor-input-group">

            <label htmlFor="mobileNumber">
              Mobile Number
            </label>

            <div className="mobile-input-wrapper">

              <span className="country-code">
                +91
              </span>

              <input
                id="mobileNumber"
                type="tel"
                placeholder="Enter mobile number"
                value={mobileNumber}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(
                    /\D/g,
                    ""
                  );

                  setMobileNumber(value);
                }}
              />

            </div>

          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="doctor-access-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Checking...
              </>
            ) : (
              "Continue"
            )}
          </button>

        </form>


        <div className="doctor-access-footer">
          <span>Secure access for registered doctors</span>
        </div>

      </div>

    </div>
  );
}

export default DoctorAccess;