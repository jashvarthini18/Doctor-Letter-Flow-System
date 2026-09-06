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

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Templates from "./pages/Templates";
import LetterEditor from "./pages/LetterEditor";
import Preview from "./pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Templates />} />

        <Route path="/editor" element={<LetterEditor />} />

        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
