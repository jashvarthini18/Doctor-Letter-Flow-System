// // // import { useEditor, EditorContent } from "@tiptap/react";
// // // import StarterKit from "@tiptap/starter-kit";

// // // function RichTextEditor({ content, onChange }) {

// // //     const editor = useEditor({
// // //         extensions: [
// // //             StarterKit
// // //         ],

// // //         content: content,

// // //         onUpdate: ({ editor }) => {

// // //             const html = editor.getHTML();

// // //             onChange(html);

// // //         }
// // //     });


// // //     if (!editor) {
// // //         return null;
// // //     }


// // //     return (
// // //         <div>

// // //             <div>

// // //                 <button
// // //                     onClick={() =>
// // //                         editor.chain().focus().toggleBold().run()
// // //                     }
// // //                 >
// // //                     Bold
// // //                 </button>

// // //                 <button
// // //                     onClick={() =>
// // //                         editor.chain().focus().toggleItalic().run()
// // //                     }
// // //                 >
// // //                     Italic
// // //                 </button>

// // //                 <button
// // //                     onClick={() =>
// // //                         editor.chain().focus().toggleBulletList().run()
// // //                     }
// // //                 >
// // //                     Bullet List
// // //                 </button>

// // //             </div>


// // //             <EditorContent editor={editor} />

// // //         </div>
// // //     );
// // // }

// // // export default RichTextEditor;
// // import { useEditor, EditorContent } from "@tiptap/react";
// // import StarterKit from "@tiptap/starter-kit";

// // function RichTextEditor({ content, onChange }) {

// //     const editor = useEditor({
// //         extensions: [
// //             StarterKit
// //         ],

// //         content: content,

// //         onUpdate: ({ editor }) => {

// //             const html = editor.getHTML();

// //             onChange(html);

// //         }
// //     });

// //     if (!editor) {
// //         return null;
// //     }

// //     return (
// //         <div className="editor-container">

// //             {/* Toolbar */}
// //             <div className="toolbar">

// //                 <button
// //                     type="button"
// //                     onClick={() =>
// //                         editor.chain().focus().toggleBold().run()
// //                     }
// //                 >
// //                     Bold
// //                 </button>

// //                 <button
// //                     type="button"
// //                     onClick={() =>
// //                         editor.chain().focus().toggleItalic().run()
// //                     }
// //                 >
// //                     Italic
// //                 </button>

// //                 <button
// //                     type="button"
// //                     onClick={() =>
// //                         editor.chain().focus().toggleHeading({
// //                             level: 1
// //                         }).run()
// //                     }
// //                 >
// //                     H1
// //                 </button>

// //                 <button
// //                     type="button"
// //                     onClick={() =>
// //                         editor.chain().focus().toggleHeading({
// //                             level: 2
// //                         }).run()
// //                     }
// //                 >
// //                     H2
// //                 </button>

// //                 <button
// //                     type="button"
// //                     onClick={() =>
// //                         editor.chain().focus().toggleBulletList().run()
// //                     }
// //                 >
// //                     Bullet List
// //                 </button>

// //                 <button
// //                     type="button"
// //                     onClick={() =>
// //                         editor.chain().focus().toggleOrderedList().run()
// //                     }
// //                 >
// //                     Numbered List
// //                 </button>

// //             </div>


// //             {/* Editor */}
// //             <div className="editor-content">

// //                 <EditorContent editor={editor} />

// //             </div>

// //         </div>
// //     );
// // }

// // export default RichTextEditor;

// import { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// function RichTextEditor({ content, onChange }) {

//     const editor = useEditor({
//         extensions: [
//             StarterKit
//         ],

//         content: content,

//         onUpdate: ({ editor }) => {
//             const html = editor.getHTML();

//             console.log("EDITOR CONTENT:", html);

//             onChange(html);
//         }
//     });

//     useEffect(() => {

//         if (!editor) {
//             return;
//         }

//         if (content && editor.getHTML() !== content) {
//             editor.commands.setContent(content, false);
//         }

//     }, [editor, content]);


//     if (!editor) {
//         return null;
//     }


//     return (
//         <div className="editor-container">

//             <div className="toolbar">

//                 <button
//                     type="button"
//                     onClick={() =>
//                         editor.chain().focus().toggleBold().run()
//                     }
//                 >
//                     Bold
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() =>
//                         editor.chain().focus().toggleItalic().run()
//                     }
//                 >
//                     Italic
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() =>
//                         editor.chain().focus().toggleHeading({
//                             level: 1
//                         }).run()
//                     }
//                 >
//                     H1
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() =>
//                         editor.chain().focus().toggleHeading({
//                             level: 2
//                         }).run()
//                     }
//                 >
//                     H2
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() =>
//                         editor.chain().focus().toggleBulletList().run()
//                     }
//                 >
//                     Bullet List
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() =>
//                         editor.chain().focus().toggleOrderedList().run()
//                     }
//                 >
//                     Numbered List
//                 </button>

//             </div>

//             <div className="editor-content">

//                 <EditorContent editor={editor} />

//             </div>

//         </div>
//     );
// }

// export default RichTextEditor;

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function RichTextEditor({ content, onChange }) {

    const editor = useEditor({
        extensions: [
            StarterKit
        ],

        content: content,

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();

            console.log("EDITOR CONTENT:", html);

            onChange(html);
        }
    });


    // Load content from the API only when the editor
    // is not currently being edited.
    useEffect(() => {

        if (!editor) {
            return;
        }

        if (!content) {
            return;
        }

        // Do not reset the editor while the doctor is typing
        if (editor.isFocused) {
            return;
        }

        if (editor.getHTML() !== content) {
            editor.commands.setContent(content, false);
        }

    }, [editor, content]);


    if (!editor) {
        return null;
    }


    return (
        <div className="editor-container">

            {/* Toolbar */}
            <div className="toolbar">

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({
                            level: 1
                        }).run()
                    }
                >
                    H1
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({
                            level: 2
                        }).run()
                    }
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    Numbered List
                </button>

            </div>


            {/* Editor */}
            <div className="editor-content">

                <EditorContent editor={editor} />

            </div>

        </div>
    );
}

export default RichTextEditor;