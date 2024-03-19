import { useRef } from "react";
import { useTheme } from "next-themes";
import { Editor } from "@tinymce/tinymce-react";

export default function RichTextEditor({
  label,
  initialValue,
  onChange,
  error,
  backendError,
}) {
  const { theme } = useTheme();

  const editorRef = useRef(null);

  function getEditorValue() {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  }

  return (
    <div className="form-group flex flex-col gap-y-1 w-full">
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>

      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        onEditorChange={() => onChange(getEditorValue())}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor link | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body {font-family: Helvetica, Arial, sans-serif; font-size: 14px; }",
          skin: theme === "dark" ? "oxide-dark" : "oxide",
          content_css: theme === "dark" ? "dark" : "default",
        }}
      />

      {error && <p className="text-ddanger text-sm">{error.message}</p>}
      {backendError && (
        <p className="text-ddanger text-sm first-letter:uppercase">
          {backendError}
        </p>
      )}
    </div>
  );
}
