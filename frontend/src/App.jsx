// import Templates from "./pages/Templates";

// function App() {

//     return (
//         <Templates />
//     );

// }

// export default App;
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Templates from "./pages/Templates";
// import LetterEditor from "./pages/LetterEditor";

// function App() {

//     return (

//         <BrowserRouter>

//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Templates />}
//                 />

//                 <Route
//                     path="/editor"
//                     element={<LetterEditor />}
//                 />

//             </Routes>

//         </BrowserRouter>

//     );

// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Templates from "./pages/Templates";
// import LetterEditor from "./pages/LetterEditor";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Templates />}
//                 />

//                 <Route
//                     path="/editor"
//                     element={<LetterEditor />}
//                 />

//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Templates from "./pages/Templates";
import LetterEditor from "./pages/LetterEditor";
import Preview from "./pages/Preview";
import History from "./pages/History";
import DoctorAccess from "./pages/DoctorAccess";
import PatientDetails from "./pages/PatientDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* First page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<DoctorAccess />} />

        {/* Main application */}
        <Route path="/templates" element={<Templates />} />

        <Route
          path="/patient-details"
          element={<PatientDetails />}
        />

        <Route
          path="/editor"
          element={<LetterEditor />}
        />

        <Route
          path="/preview"
          element={<Preview />}
        />

        <Route
          path="/history"
          element={<History />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;