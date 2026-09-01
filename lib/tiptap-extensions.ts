import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";

// Mismas extensiones en el editor (cliente) y en el renderizado a HTML en
// el servidor (@tiptap/html), para que el JSON guardado se interprete igual
// en ambos sitios.
export const tiptapExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3, 4] },
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    autolink: true,
    HTMLAttributes: {
      rel: "noopener noreferrer",
      class: "text-electric-600 underline decoration-electric-300 hover:text-electric-700",
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: "rounded-tr-2xl rounded-bl-2xl",
    },
  }),
  Youtube.configure({
    width: 640,
    height: 360,
    HTMLAttributes: {
      class: "w-full aspect-video rounded-tr-2xl rounded-bl-2xl",
    },
  }),
];

export const emptyDoc = {
  type: "doc",
  content: [{ type: "paragraph" }],
};
