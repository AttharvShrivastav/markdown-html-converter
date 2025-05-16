import React, { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";


export default function App() {

  const [markdown, setMarkdown] = useState("# Welcome to Markdown to HTML Converter\n\nType your **Markdown** on the left and see the **HTML output** on the right.");
  const [theme, setTheme] = useState("light");

  const getSanitizedHtml = () => {
    const rawHtml = marked(markdown, { breaks: true });
    return DOMPurify.sanitize(rawHtml);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(getSanitizedHtml());
    alert("HTML copied to clipboard!");
  };

  const downloadHtml = () => {
    const blob = new Blob([getSanitizedHtml()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.html";
    link.click();
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 transition-colors duration-300">
      <header className="p-4 text-center bg-white  shadow">
        <h1 className="text-2xl font-bold text-gray-800 ">Markdown to HTML Converter</h1>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* <MDXEditor markdown={markdown} className="p-4 w-full h-[70vh] rounded border dark:bg-gray-800 text-white dark:text-white resize-none shadow-sm" plugins={[headingsPlugin(), listsPlugin()]} onChange={(e) => setMarkdown(e.target.markdown)}/> */}
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="p-4 w-full h-[70vh] rounded border resize-none shadow-sm"
          placeholder="Write your Markdown here..."
        />

        <div
          className="p-4 w-full h-[70vh] overflow-y-auto rounded border bg-white  text-black shadow-sm prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: getSanitizedHtml() }}
        />
      </main>

      <div className="flex justify-center gap-4 p-4">
        <button onClick={copyHtml} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Copy HTML</button>
        <button onClick={downloadHtml} className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700">Download HTML</button>
        <button onClick={toggleTheme} className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700">Toggle {theme === "light" ? "Dark" : "Light"} Mode</button>
      </div>

      <footer className="text-center p-4 text-gray-500 dark:text-gray-400">
        Built by Attharv Shrivastav • <a href="#" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>
      </footer>
    </div>
  );
}
