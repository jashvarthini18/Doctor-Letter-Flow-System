import { Node, mergeAttributes } from "@tiptap/core";

const DivExtension = Node.create({
    name: "customDiv",

    group: "block",

    content: "block*",

    defining: true,

    addAttributes() {
        return {
            class: {
                default: null,

                parseHTML: (element) =>
                    element.getAttribute("class"),

                renderHTML: (attributes) => {
                    if (!attributes.class) {
                        return {};
                    }

                    return {
                        class: attributes.class,
                    };
                },
            },

            style: {
                default: null,

                parseHTML: (element) =>
                    element.getAttribute("style"),

                renderHTML: (attributes) => {
                    if (!attributes.style) {
                        return {};
                    }

                    return {
                        style: attributes.style,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes),
            0,
        ];
    },
});

export default DivExtension;