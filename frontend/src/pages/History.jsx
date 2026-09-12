// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../services/api";
// // // import { getLoggedInDoctor } from "../utils/doctor";

// // // function History() {
// // //   const navigate = useNavigate();

// // //   const [letters, setLetters] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchHistory = async () => {
// // //       try {
// // //         // const response = await api.get(
// // //         //     "/letters?doctor_id=1"
// // //         // );
// // //         const doctor = getLoggedInDoctor();

// // //         if (!doctor) {
// // //           setError("Please login first");
// // //           return;
// // //         }

// // //         const response = await api.get(`/letters?doctor_id=${doctor.id}`);

// // //         setLetters(response.data.letters);
// // //       } catch (error) {
// // //         console.error(error);
// // //         setError("Failed to load letter history");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchHistory();
// // //   }, []);

// // //   const downloadLetter = async (letterId) => {
// // //     try {
// // //       const response = await api.get(`/letters/${letterId}/download`);

// // //       const downloadUrl = response.data.download_url;

// // //       window.open(downloadUrl, "_blank");
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("Failed to download letter");
// // //     }
// // //   };

// // //   if (loading) {
// // //     return <div>Loading history...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>{error}</div>;
// // //   }

// // //   return (
// // //     <div className="history-page">
// // //       <h1>Letter History</h1>

// // //       {letters.length === 0 ? (
// // //         <p>No letters found.</p>
// // //       ) : (
// // //         <div className="history-list">
// // //           {letters.map((letter) => (
// // //             <div className="history-card" key={letter.id}>
// // //               <div>
// // //                 <h3>{letter.patient_name || "Unnamed Patient"}</h3>

// // //                 <p>Type: {letter.letter_type}</p>

// // //                 <p>Created: {new Date(letter.created_at).toLocaleString()}</p>
// // //               </div>

// // //               <div className="history-actions">
// // //                 <button onClick={() => downloadLetter(letter.id)}>
// // //                   Download
// // //                 </button>

// // //                 <button
// // //                   onClick={() => navigate(`/editor?letterId=${letter.id}`)}
// // //                 >
// // //                   Reuse
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default History;
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../services/api";
// // import { getLoggedInDoctor } from "../utils/doctor";

// // function History() {
// //   const navigate = useNavigate();

// //   const [letters, setLetters] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // =========================
// //   // LOAD HISTORY
// //   // =========================

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       try {
// //         const doctor = getLoggedInDoctor();

// //         if (!doctor) {
// //           setError("Please login first");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await api.get(
// //           `/letters?doctor_id=${doctor.id}`
// //         );

// //         setLetters(response.data.letters);

// //       } catch (error) {
// //         console.error(
// //           "HISTORY ERROR:",
// //           error
// //         );

// //         setError(
// //           "Failed to load letter history"
// //         );

// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHistory();
// //   }, []);

// //   // =========================
// //   // DOWNLOAD LETTER
// //   // =========================

// //   const downloadLetter = async (letterId) => {
// //     try {
// //       const response = await api.get(
// //         `/letters/${letterId}/download`
// //       );

// //       const downloadUrl =
// //         response.data.download_url;

// //       window.open(
// //         downloadUrl,
// //         "_blank"
// //       );

// //     } catch (error) {
// //       console.error(
// //         "DOWNLOAD ERROR:",
// //         error
// //       );

// //       alert(
// //         "Failed to download letter"
// //       );
// //     }
// //   };

// //   // =========================
// //   // REUSE LETTER
// //   // =========================

// //   const reuseLetter = (letterId) => {
// //     navigate(
// //       `/editor?letterId=${letterId}`
// //     );
// //   };

// //   // =========================
// //   // LOGIN CHECK
// //   // =========================

// //   if (error === "Please login first") {
// //     return (
// //       <div>
// //         <h2>Please login first</h2>

// //         <button
// //           onClick={() =>
// //             navigate("/login")
// //           }
// //         >
// //           Go to Login
// //         </button>
// //       </div>
// //     );
// //   }

// //   // =========================
// //   // LOADING
// //   // =========================

// //   if (loading) {
// //     return (
// //       <div>
// //         Loading history...
// //       </div>
// //     );
// //   }

// //   // =========================
// //   // ERROR
// //   // =========================

// //   if (error) {
// //     return (
// //       <div>
// //         {error}
// //       </div>
// //     );
// //   }

// //   // =========================
// //   // UI
// //   // =========================

// //   return (
// //     <div className="history-page">

// //       <h1>Letter History</h1>

// //       {letters.length === 0 ? (
// //         <p>
// //           No letters found.
// //         </p>
// //       ) : (
// //         <div className="history-list">

// //           {letters.map((letter) => (

// //             <div
// //               className="history-card"
// //               key={letter.id}
// //             >

// //               <div>

// //                 <h3>
// //                   {letter.patient_name ||
// //                     "Unnamed Patient"}
// //                 </h3>

// //                 <p>
// //                   Type:{" "}
// //                   {letter.letter_type ||
// //                     "Letter"}
// //                 </p>

// //                 <p>
// //                   Created:{" "}
// //                   {new Date(
// //                     letter.created_at
// //                   ).toLocaleString()}
// //                 </p>

// //               </div>

// //               <div className="history-actions">

// //                 <button
// //                   onClick={() =>
// //                     downloadLetter(
// //                       letter.id
// //                     )
// //                   }
// //                 >
// //                   Download
// //                 </button>

// //                 <button
// //                   onClick={() =>
// //                     reuseLetter(
// //                       letter.id
// //                     )
// //                   }
// //                 >
// //                   Reuse
// //                 </button>

// //               </div>

// //             </div>

// //           ))}

// //         </div>
// //       )}

// //     </div>
// //   );
// // }

// // export default History;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { getLoggedInDoctor } from "../utils/doctor";

// function History() {
//   const navigate = useNavigate();

//   const [letters, setLetters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const doctor = getLoggedInDoctor();

//         if (!doctor) {
//           setError("Please login first");
//           setLoading(false);
//           return;
//         }

//         const response = await api.get(`/letters?doctor_id=${doctor.id}`);

//         setLetters(response.data.letters);
//       } catch (error) {
//         console.error("HISTORY ERROR:", error);
//         setError("Failed to load letter history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const downloadLetter = async (letterId) => {
//     try {
//       const response = await api.get(`/letters/${letterId}/download`);

//       const downloadUrl = response.data.download_url;

//       if (!downloadUrl) {
//         throw new Error("Download URL not returned");
//       }

//       window.open(downloadUrl, "_blank");
//     } catch (error) {
//       console.error("DOWNLOAD ERROR:", error);
//       alert("Failed to download letter");
//     }
//   };

//   const deleteLetter = async (letterId) => {
//   const confirmed = window.confirm(
//     "Are you sure you want to delete this letter?"
//   );

//   if (!confirmed) {
//     return;
//   }

//   try {
//     await api.delete(`/letters/${letterId}`);

//     // Remove the deleted letter from the current list
//     setLetters((currentLetters) =>
//       currentLetters.filter((letter) => letter.id !== letterId)
//     );

//     alert("Letter deleted successfully");
//   } catch (error) {
//     console.error("DELETE ERROR:", error);
//     alert("Failed to delete letter");
//   }
// };

//   // const reuseLetter = (letterId) => {
//   //     navigate(`/editor?letterId=${letterId}`);
//   // };

//   const reuseLetter = (letter) => {
//     navigate(`/patient-details?templateId=${letter.template_id}`);
//   };

//   if (loading) {
//     return <div>Loading letter history...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <h2>{error}</h2>

//         <button onClick={() => navigate("/login")}>Go to Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="history-page">
//       <div className="history-header">
//         <h1>Letter History</h1>

//         <button onClick={() => navigate("/templates")}>Create New Letter</button>
//       </div>

//       {letters.length === 0 ? (
//         <div>
//           <p>No letters generated yet.</p>
//         </div>
//       ) : (
//         <div className="history-list">
//           {letters.map((letter) => (
//             <div key={letter.id} className="history-card">
//               <div className="history-info">
//                 <h3>{letter.letter_type || "Letter"}</h3>

//                 <p>
//                   <strong>Patient:</strong>{" "}
//                   {letter.patient_name || "Not specified"}
//                 </p>

//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(letter.created_at).toLocaleDateString()}
//                 </p>
//               </div>

//               <div className="history-actions">
//   <button onClick={() => downloadLetter(letter.id)}>
//     Download
//   </button>

//   <button onClick={() => reuseLetter(letter)}>
//     Reuse
//   </button>

//   <button onClick={() => deleteLetter(letter.id)}>
//     Delete
//   </button>
// </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default History;

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../services/api";
// import { getLoggedInDoctor } from "../utils/doctor";

// function History() {
//   const navigate = useNavigate();

//   const [letters, setLetters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Search / filter / sort
//   const [searchTerm, setSearchTerm] = useState("");
//   const [letterTypeFilter, setLetterTypeFilter] = useState("All");
//   const [sortOrder, setSortOrder] = useState("newest");

//   // Delete confirmation
//   const [deleteLetterId, setDeleteLetterId] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   // =========================
//   // FETCH HISTORY
//   // =========================

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const doctor = getLoggedInDoctor();

//         if (!doctor) {
//           setError("Please login first");
//           setLoading(false);
//           return;
//         }

//         const response = await api.get(
//           `/letters?doctor_id=${doctor.id}`
//         );

//         setLetters(response.data.letters || []);
//       } catch (error) {
//         console.error("HISTORY ERROR:", error);
//         setError("Failed to load letter history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   // =========================
//   // DOWNLOAD
//   // =========================

//   const downloadLetter = async (letterId) => {
//     try {
//       const response = await api.get(
//         `/letters/${letterId}/download`
//       );

//       const downloadUrl = response.data.download_url;

//       if (!downloadUrl) {
//         throw new Error("Download URL not returned");
//       }

//       window.open(downloadUrl, "_blank");
//     } catch (error) {
//       console.error("DOWNLOAD ERROR:", error);
//       alert("Failed to download letter");
//     }
//   };

//   // =========================
//   // REUSE
//   // =========================

//   const reuseLetter = (letter) => {
//     navigate(
//       `/patient-details?templateId=${letter.template_id}`
//     );
//   };

//   // =========================
//   // DELETE
//   // =========================

//   const confirmDelete = (letterId) => {
//     setDeleteLetterId(letterId);
//   };

//   const cancelDelete = () => {
//     setDeleteLetterId(null);
//   };

//   const deleteLetter = async () => {
//     if (!deleteLetterId) {
//       return;
//     }

//     try {
//       setDeleting(true);

//       await api.delete(`/letters/${deleteLetterId}`);

//       setLetters((currentLetters) =>
//         currentLetters.filter(
//           (letter) => letter.id !== deleteLetterId
//         )
//       );

//       setDeleteLetterId(null);

//     } catch (error) {
//       console.error("DELETE ERROR:", error);
//       alert("Failed to delete letter");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // =========================
//   // UNIQUE LETTER TYPES
//   // =========================

//   const letterTypes = useMemo(() => {
//     const types = letters
//       .map((letter) => letter.letter_type)
//       .filter(Boolean);

//     return ["All", ...new Set(types)];
//   }, [letters]);

//   // =========================
//   // FILTER + SEARCH + SORT
//   // =========================

//   const filteredLetters = useMemo(() => {
//     let result = [...letters];

//     // Search by patient name
//     if (searchTerm.trim()) {
//       const search = searchTerm.toLowerCase();

//       result = result.filter((letter) =>
//         (letter.patient_name || "")
//           .toLowerCase()
//           .includes(search)
//       );
//     }

//     // Filter by letter type
//     if (letterTypeFilter !== "All") {
//       result = result.filter(
//         (letter) =>
//           letter.letter_type === letterTypeFilter
//       );
//     }

//     // Sort
//     result.sort((a, b) => {
//       const dateA = new Date(a.created_at).getTime();
//       const dateB = new Date(b.created_at).getTime();

//       if (sortOrder === "newest") {
//         return dateB - dateA;
//       }

//       return dateA - dateB;
//     });

//     return result;
//   }, [
//     letters,
//     searchTerm,
//     letterTypeFilter,
//     sortOrder,
//   ]);

//   // =========================
//   // DATE FORMAT
//   // =========================

//   const formatDate = (dateString) => {
//     if (!dateString) {
//       return "—";
//     }

//     const date = new Date(dateString);

//     if (Number.isNaN(date.getTime())) {
//       return "—";
//     }

//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) {
//       return "";
//     }

//     const date = new Date(dateString);

//     if (Number.isNaN(date.getTime())) {
//       return "";
//     }

//     return date.toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // =========================
//   // LOGIN
//   // =========================

//   if (!getLoggedInDoctor()) {
//     return (
//       <div className="history-message">
//         <h2>Please login first</h2>

//         <button
//           onClick={() => navigate("/login")}
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {
//     return (
//       <div className="history-message">
//         <h2>Loading letter history...</h2>
//       </div>
//     );
//   }

//   // =========================
//   // ERROR
//   // =========================

//   if (error) {
//     return (
//       <div className="history-message">
//         <h2>{error}</h2>

//         <button
//           onClick={() => navigate("/login")}
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   // =========================
//   // UI
//   // =========================

//   return (
//     <div className="history-page">

//       {/* HEADER */}

//       <div className="history-header">
//         <div>
//           <h1>Letter History</h1>

//           <p>
//             View and manage your previously generated letters.
//           </p>
//         </div>

//         <button
//           className="create-letter-button"
//           onClick={() => navigate("/")}
//         >
//           + Create New Letter
//         </button>
//       </div>

//       {/* FILTER BAR */}

//       {letters.length > 0 && (
//         <div className="history-filters">

//           {/* SEARCH */}

//           <div className="history-search">
//             <label>Search Patient</label>

//             <input
//               type="text"
//               placeholder="Enter patient name..."
//               value={searchTerm}
//               onChange={(e) =>
//                 setSearchTerm(e.target.value)
//               }
//             />
//           </div>

//           {/* LETTER TYPE */}

//           <div className="history-filter">
//             <label>Letter Type</label>

//             <select
//               value={letterTypeFilter}
//               onChange={(e) =>
//                 setLetterTypeFilter(e.target.value)
//               }
//             >
//               {letterTypes.map((type) => (
//                 <option
//                   key={type}
//                   value={type}
//                 >
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* SORT */}

//           <div className="history-filter">
//             <label>Sort By</label>

//             <select
//               value={sortOrder}
//               onChange={(e) =>
//                 setSortOrder(e.target.value)
//               }
//             >
//               <option value="newest">
//                 Newest First
//               </option>

//               <option value="oldest">
//                 Oldest First
//               </option>
//             </select>
//           </div>

//         </div>
//       )}

//       {/* NO LETTERS */}

//       {letters.length === 0 ? (
//         <div className="empty-history">
//           <h2>No letters generated yet</h2>

//           <p>
//             Your generated letters will appear here.
//           </p>

//           <button
//             onClick={() => navigate("/")}
//           >
//             Create Your First Letter
//           </button>
//         </div>
//       ) : filteredLetters.length === 0 ? (
//         <div className="empty-history">
//           <h2>No matching letters</h2>

//           <p>
//             Try changing your search or filter.
//           </p>

//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setLetterTypeFilter("All");
//             }}
//           >
//             Clear Filters
//           </button>
//         </div>
//       ) : (

//         /* HISTORY TABLE */

//         <div className="history-table-container">

//           <table className="history-table">

//             <thead>
//               <tr>
//                 <th>Letter Type</th>
//                 <th>Patient</th>
//                 <th>Generated On</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>

//               {filteredLetters.map((letter) => (

//                 <tr key={letter.id}>

//                   <td>
//                     <span className="letter-type-badge">
//                       {letter.letter_type || "Letter"}
//                     </span>
//                   </td>

//                   <td>
//                     <strong>
//                       {letter.patient_name ||
//                         "Not specified"}
//                     </strong>
//                   </td>

//                   <td>
//                     <div className="date-container">
//                       <span>
//                         {formatDate(letter.created_at)}
//                       </span>

//                       <small>
//                         {formatTime(letter.created_at)}
//                       </small>
//                     </div>
//                   </td>

//                   <td>
//                     <div className="history-actions">

//                       <button
//                         className="download-button"
//                         onClick={() =>
//                           downloadLetter(letter.id)
//                         }
//                       >
//                         Download
//                       </button>

//                       <button
//                         className="reuse-button"
//                         onClick={() =>
//                           reuseLetter(letter)
//                         }
//                       >
//                         Reuse
//                       </button>

//                       <button
//                         className="delete-button"
//                         onClick={() =>
//                           confirmDelete(letter.id)
//                         }
//                       >
//                         Delete
//                       </button>

//                     </div>
//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>
//       )}

//       {/* DELETE CONFIRMATION */}

//       {deleteLetterId && (
//         <div className="delete-modal-overlay">

//           <div className="delete-modal">

//             <h2>Delete Letter?</h2>

//             <p>
//               Are you sure you want to delete this
//               letter? This action cannot be undone.
//             </p>

//             <div className="delete-modal-actions">

//               <button
//                 className="cancel-delete-button"
//                 onClick={cancelDelete}
//                 disabled={deleting}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="confirm-delete-button"
//                 onClick={deleteLetter}
//                 disabled={deleting}
//               >
//                 {deleting
//                   ? "Deleting..."
//                   : "Yes, Delete"}
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default History;

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { getLoggedInDoctor } from "../utils/doctor";

function History() {
  const navigate = useNavigate();

  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search / filter / sort
  const [searchTerm, setSearchTerm] = useState("");
  const [letterTypeFilter, setLetterTypeFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // Delete confirmation
  const [deleteLetterId, setDeleteLetterId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // FETCH HISTORY
  // =========================

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const doctor = getLoggedInDoctor();

        if (!doctor) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const response = await api.get(
          `/letters?doctor_id=${doctor.id}`
        );

        setLetters(response.data.letters || []);
      } catch (error) {
        console.error("HISTORY ERROR:", error);
        setError("Failed to load letter history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // =========================
  // DOWNLOAD
  // =========================

  const downloadLetter = async (letterId) => {
    try {
      const response = await api.get(
        `/letters/${letterId}/download`
      );

      const downloadUrl = response.data.download_url;

      if (!downloadUrl) {
        throw new Error("Download URL not returned");
      }

      // window.open(downloadUrl, "_blank");
      window.location.href = downloadUrl;
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
      alert("Failed to download letter");
    }
  };

  // =========================
  // REUSE
  // =========================

  const reuseLetter = (letter) => {
    navigate(
      `/patient-details?templateId=${letter.template_id}`
    );
  };

  // =========================
  // DELETE
  // =========================

  const confirmDelete = (letterId) => {
    setDeleteLetterId(letterId);
  };

  const cancelDelete = () => {
    setDeleteLetterId(null);
  };

  const deleteLetter = async () => {
    if (!deleteLetterId) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(
        `/letters/${deleteLetterId}`
      );

      setLetters((currentLetters) =>
        currentLetters.filter(
          (letter) => letter.id !== deleteLetterId
        )
      );

      setDeleteLetterId(null);
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Failed to delete letter");
    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // UNIQUE LETTER TYPES
  // =========================

  const letterTypes = useMemo(() => {
    const types = letters
      .map((letter) => letter.letter_type)
      .filter(Boolean);

    return ["All", ...new Set(types)];
  }, [letters]);

  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredLetters = useMemo(() => {
    let result = [...letters];

    // Search by patient name
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((letter) =>
        (letter.patient_name || "")
          .toLowerCase()
          .includes(search)
      );
    }

    // Filter by letter type
    if (letterTypeFilter !== "All") {
      result = result.filter(
        (letter) =>
          letter.letter_type === letterTypeFilter
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return result;
  }, [
    letters,
    searchTerm,
    letterTypeFilter,
    sortOrder,
  ]);

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (dateString) => {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // LOGIN
  // =========================

  if (!getLoggedInDoctor()) {
    return (
      <div className="history-message-page">
        <div className="history-message-card">

          <div className="history-message-icon">
            🔒
          </div>

          <h2>Please login first</h2>

          <p>
            You need to login as a doctor to
            view your letter history.
          </p>

          <button
            type="button"
            className="history-primary-button"
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
      <div className="history-message-page">
        <div className="history-message-card">

          <div className="history-loader"></div>

          <h2>
            Loading letter history...
          </h2>

          <p>
            Please wait while we fetch your
            generated letters.
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="history-message-page">
        <div className="history-message-card">

          <div className="history-message-icon error-icon">
            ⚠️
          </div>

          <h2>{error}</h2>

          <button
            type="button"
            className="history-primary-button"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="history-page">

      {/* HEADER */}

      <header className="history-header">

        <div className="history-header-left">

          <button
            type="button"
            className="history-back-button"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div>
            <span className="history-header-label">
              Documents
            </span>

            <h1>
              Letter History
            </h1>

            <p>
              View and manage your previously
              generated letters.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="create-letter-button"
          onClick={() => navigate("/templates")}
        >
          <span>+</span>
          Create New Letter
        </button>

      </header>


      {/* CONTENT */}

      <main className="history-main">

        {/* SUMMARY */}

        <div className="history-summary">

          <div className="summary-card">

            <div className="summary-icon">
              📄
            </div>

            <div>
              <span>
                Total Letters
              </span>

              <strong>
                {letters.length}
              </strong>
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon">
              ✓
            </div>

            <div>
              <span>
                Showing
              </span>

              <strong>
                {filteredLetters.length}
              </strong>
            </div>

          </div>

        </div>


        {/* FILTER BAR */}

        {letters.length > 0 && (
          <div className="history-filters">

            {/* SEARCH */}

            <div className="history-search">

              <label>
                Search Patient
              </label>

              <div className="search-input-wrapper">

                <span className="search-icon">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Enter patient name..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() =>
                      setSearchTerm("")
                    }
                  >
                    ×
                  </button>
                )}

              </div>

            </div>


            {/* LETTER TYPE */}

            <div className="history-filter">

              <label>
                Letter Type
              </label>

              <select
                value={letterTypeFilter}
                onChange={(e) =>
                  setLetterTypeFilter(e.target.value)
                }
              >
                {letterTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

            </div>


            {/* SORT */}

            <div className="history-filter">

              <label>
                Sort By
              </label>

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>
              </select>

            </div>

          </div>
        )}


        {/* NO LETTERS */}

        {letters.length === 0 ? (

          <div className="empty-history">

            <div className="empty-history-icon">
              📄
            </div>

            <h2>
              No letters generated yet
            </h2>

            <p>
              Your generated letters will
              appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
            >
              Create Your First Letter
              <span>→</span>
            </button>

          </div>

        ) : filteredLetters.length === 0 ? (

          <div className="empty-history">

            <div className="empty-history-icon">
              🔍
            </div>

            <h2>
              No matching letters
            </h2>

            <p>
              Try changing your search or
              filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setLetterTypeFilter("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          /* HISTORY TABLE */

          <div className="history-table-container">

            <div className="history-table-header">

              <div>
                <h2>
                  Generated Letters
                </h2>

                <span>
                  {filteredLetters.length}{" "}
                  {filteredLetters.length === 1
                    ? "letter"
                    : "letters"}
                </span>
              </div>

            </div>

            <div className="history-table-scroll">

              <table className="history-table">

                <thead>
                  <tr>
                    <th>Letter Type</th>
                    <th>Patient</th>
                    <th>Generated On</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredLetters.map(
                    (letter) => (

                      <tr key={letter.id}>

                        <td>
                          <span className="letter-type-badge">
                            <span className="badge-dot"></span>
                            {letter.letter_type ||
                              "Letter"}
                          </span>
                        </td>

                        <td>

                          <div className="patient-cell">

                            <div className="patient-avatar">
                              {(letter.patient_name ||
                                "P")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {letter.patient_name ||
                                  "Not specified"}
                              </strong>

                              <small>
                                Patient
                              </small>
                            </div>

                          </div>

                        </td>

                        <td>

                          <div className="date-container">

                            <span>
                              {formatDate(
                                letter.created_at
                              )}
                            </span>

                            <small>
                              {formatTime(
                                letter.created_at
                              )}
                            </small>

                          </div>

                        </td>

                        <td>

                          <div className="history-actions">

                            <button
                              type="button"
                              className="download-button"
                              onClick={() =>
                                downloadLetter(
                                  letter.id
                                )
                              }
                            >
                              <span>↓</span>
                              Download
                            </button>

                            <button
                              type="button"
                              className="reuse-button"
                              onClick={() =>
                                reuseLetter(
                                  letter
                                )
                              }
                            >
                              <span>↻</span>
                              Reuse
                            </button>

                            <button
                              type="button"
                              className="delete-button"
                              onClick={() =>
                                confirmDelete(
                                  letter.id
                                )
                              }
                            >
                              <span>×</span>
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </main>


      {/* DELETE CONFIRMATION */}

      {deleteLetterId && (
        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <div className="delete-modal-icon">
              ⚠
            </div>

            <h2>
              Delete Letter?
            </h2>

            <p>
              Are you sure you want to delete
              this letter? This action cannot
              be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                type="button"
                className="cancel-delete-button"
                onClick={cancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-button"
                onClick={deleteLetter}
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default History;