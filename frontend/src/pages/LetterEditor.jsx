// // import { useEffect, useState } from "react";
// // import { useSearchParams } from "react-router-dom";
// // import api from "../services/api";
// // import RichTextEditor from "../components/RichTextEditor";

// // function LetterEditor() {

// //     const [searchParams] = useSearchParams();

// //     const templateId = searchParams.get("templateId");

// //     const [content, setContent] = useState("");
// //     const [templateName, setTemplateName] = useState("");
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {

// //         const fetchTemplate = async () => {

// //             try {

// //                 const response =
// //                     await api.get(`/templates/${templateId}`);

// //                 const template = response.data.template;

// //                 setTemplateName(template.name);

// //                 setContent(template.content_html);

// //             } catch (error) {

// //                 console.error(error);

// //             } finally {

// //                 setLoading(false);

// //             }
// //         };

// //         if (templateId) {
// //             fetchTemplate();
// //         }

// //     }, [templateId]);

// //     if (loading) {
// //         return <h2>Loading editor...</h2>;
// //     }

// //     return (
// //         <div>

// //             <h1>{templateName}</h1>

// //             <RichTextEditor
// //                 content={content}
// //                 onChange={setContent}
// //             />

// //         </div>
// //     );
// // }

// // export default LetterEditor;
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// import api from "../services/api";
// import RichTextEditor from "../components/RichTextEditor";

// function LetterEditor() {
//     const doctorId = 1;
//     const [searchParams] = useSearchParams();

//     const templateId = searchParams.get("templateId");

//     const [content, setContent] = useState("");
//     const [templateName, setTemplateName] = useState("");

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [saveStatus, setSaveStatus] = useState("");

//     useEffect(() => {

//         const fetchTemplate = async () => {

//             try {

//                 const response =
//                     await api.get(`/templates/${templateId}`);

//                 const template = response.data.template;

//                 setTemplateName(template.name);

//                 setContent(template.content_html);

//             } catch (error) {

//                 console.error(error);

//                 setError("Failed to load template");

//             } finally {

//                 setLoading(false);

//             }
//         };

//         if (templateId) {

//             fetchTemplate();

//         } else {

//             setError("No template selected");

//             setLoading(false);

//         }

//         if (!content || !templateId) {
//         return;
//     }

//     // const timer = setTimeout(async () => {

//     //     try {

//     //         setSaveStatus("Saving...");

//     //         await api.post("/drafts", {
//     //             doctor_id: 1,
//     //             template_id: Number(templateId),
//     //             content_html: content
//     //         });

//     //         setSaveStatus("✓ Saved");

//     //     } catch (error) {

//     //         console.error(error);

//     //         setSaveStatus("Save failed");

//     //     }

//     // }, 2000);
// const timer = setTimeout(async () => {

//         try {

//             console.log("SENDING TO BACKEND:", content);

//             setSaveStatus("Saving...");

//             await api.post("/drafts", {
//                 doctor_id: 1,
//                 template_id: Number(templateId),
//                 content_html: content
//             });

//             setSaveStatus("✓ Saved");

//         } catch (error) {

//             console.error(error);

//             setSaveStatus("Save failed");

//         }

//     }, 2000);

//     return () => clearTimeout(timer);

//     }, [content, templateId]);

//     if (loading) {

//         return (
//             <div>
//                 Loading template...
//             </div>
//         );

//     }

//     if (error) {

//         return (
//             <div>
//                 {error}
//             </div>
//         );

//     }

//     return (

//         <div>

//             <h1>
//                 {templateName}
//             </h1>

//             <div>
//             {saveStatus}
//         </div>

//             <RichTextEditor
//                 content={content}
//                 onChange={setContent}
//             />

//         </div>

//     );
// }

// export default LetterEditor;

import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";

function LetterEditor() {
    
  const [searchParams] = useSearchParams();

    const navigate = useNavigate();
  const templateId = searchParams.get("templateId");

  const [content, setContent] = useState("");
  const [templateName, setTemplateName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  // Stores the latest editor content
  const latestContent = useRef("");

  // ========================================
  // LOAD TEMPLATE
  // ========================================

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await api.get(`/templates/${templateId}`);

        const template = response.data.template;

        setTemplateName(template.name);

        setContent(template.content_html);

        // Also store initial content in ref
        latestContent.current = template.content_html;
      } catch (error) {
        console.error(error);

        setError("Failed to load template");
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    } else {
      setError("No template selected");

      setLoading(false);
    }
  }, [templateId]);

  // ========================================
  // AUTO SAVE
  // ========================================

  useEffect(() => {
    if (!templateId) {
      return;
    }

    const timer = setTimeout(async () => {
      const currentContent = latestContent.current;

      if (!currentContent) {
        return;
      }

      try {
        console.log("SENDING TO BACKEND:", currentContent);

        setSaveStatus("Saving...");

        const response = await api.post("/drafts", {
          doctor_id: 1,
          template_id: Number(templateId),
          content_html: currentContent,
        });

        console.log("SAVE RESPONSE:", response.data);

        setSaveStatus("✓ Saved");
      } catch (error) {
        console.error("SAVE ERROR:", error);

        setSaveStatus("Save failed");
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [content, templateId]);

  // ========================================
  // CONTENT CHANGE
  // ========================================

  const handleContentChange = (newContent) => {
    // Update ref immediately
    latestContent.current = newContent;

    // Update React state
    setContent(newContent);
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return <div>Loading template...</div>;
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return <div>{error}</div>;
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <div>
      <h1>{templateName}</h1>

      <div>{saveStatus}</div>

      <RichTextEditor content={content} onChange={handleContentChange} />
      <div className="editor-actions">

    <button
        onClick={() => {
            navigate("/preview", {
                state: {
                    content: latestContent.current
                }
            });
        }}
    >
        Preview
    </button>

</div>
    </div>
  );
}

export default LetterEditor;
