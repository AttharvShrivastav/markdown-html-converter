import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function App() {
  const [markdown, setMarkdown] = useState(`# Welcome! ✨

Type your **Markdown** on the left and see the **HTML preview** on the right.

---

- Live preview
- Copy or download the output

Enjoy!
`);

  const getSanitizedHtml = () => {
    const rawHtml = marked(markdown, { breaks: true });
    return DOMPurify.sanitize(rawHtml);
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(getSanitizedHtml());
    alert("✅ HTML copied to clipboard!");
  };

  const downloadHtml = () => {
    const blob = new Blob([getSanitizedHtml()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.html";
    link.click();
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-all duration-300 font-[Roboto]"
      style={{ backgroundColor: "#020122ff", color: "#f2f3ae" }}
    >
      {/* Header */}
      <header
        className="p-6 text-center shadow-md"
        style={{ backgroundColor: "#1e1e2f", color: "#fc9e4f" }}
      >
        <h1 className="text-4xl font-[Poppins] font-bold">
          Markdown → HTML Converter
        </h1>
        <p className="text-md mt-1 opacity-80" style={{ color: "#bcc1baff" }}>
          Real-time markdown preview with export features
        </p>
      </header>

      {/* Main */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Markdown Input */}
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="p-5 w-full h-[75vh] rounded-lg border shadow focus:outline-none focus:ring-2 transition-all font-[Roboto]"
          style={{
            backgroundColor: "#1e1e2f",
            color: "#f2f3ae",
            borderColor: "#bcc1baff",
            placeholderColor: "#bcc1baff",
          }}
          placeholder="Write your markdown here..."
        />

        {/* HTML Preview */}
        <div
          className="p-5 w-full h-[75vh] overflow-y-auto rounded-lg border shadow prose prose-invert font-[Roboto]"
          style={{
            backgroundColor: "#1e1e2f",
            color: "#f2f3ae",
            borderColor: "#bcc1baff",
          }}
          dangerouslySetInnerHTML={{ __html: getSanitizedHtml() }}
        />
      </main>

      {/* Buttons */}
      <div className="flex justify-center flex-wrap gap-4 p-6">
        <button
          onClick={copyHtml}
          className="px-6 py-2 font-[Poppins] rounded-lg shadow hover:brightness-110 transition"
          style={{ backgroundColor: "#ff521bff", color: "#f2f3ae" }}
        >
          📋 Copy HTML
        </button>
        <button
          onClick={downloadHtml}
          className="px-6 py-2 font-[Poppins] rounded-lg shadow hover:brightness-110 transition"
          style={{ backgroundColor: "#edd382ff", color: "#020122ff" }}
        >
          💾 Download HTML
        </button>
      </div>

      {/* Footer */}
      <footer
        className="text-center p-4 text-sm opacity-70"
        style={{ color: "#f2f3ae" }}
      >
        Built by Attharv Shrivastav •{" "}
        <a
          href="https://github.com/AttharvShrivastav/markdown-html-converter"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:brightness-110"
          style={{ color: "#fc9e4f" }}
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
