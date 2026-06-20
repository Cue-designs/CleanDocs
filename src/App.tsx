import { useState } from "react";

export default function App() {
  const [jsonInput, setJsonInput]: string = useState("");
  const [errors, setErrors]: string | null = useState(null);
  const handleGenerate = () => {
    setErrors(null);
    try {
      if (!jsonInput) {
        setErrors("Please paste some JSON data first");
        return;
      }
      JSON.parse(jsonInput);
      alert("Vaild JSON  detected. Ready  to  parse");
    } catch (err: any) {
      {
        setErrors(err.message || "Invalid JSON format");
      }
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
        <header className="w-full h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/30">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight text-white ">
              CleanDocs
            </span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20font-medium ">
              Beta
            </span>
          </div>
          <div className="text-sm text-zinc-400 border  border-zinc-800 bg-zinc-900 px-4 py-1.5 rounded-lg w-96 flex justify-between items-center">
            <span>Search fields, types, interfaces...</span>
            <kbd className="text-xs bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border font-monospaced border-zinc-800">
              Ctrl + K
            </kbd>
          </div>
          <button className=" bg-zinc-800 hover:bg-zinc-700  hover:border-emerald-500 text-sm text-zinc-400 hover:text-zinc-200 px-4 py-1.5 font-monospaced  rounded-lg transition-all  ">
            Sign in
          </button>
        </header>

        <main className="flex-1 flex  flex-col md:flex-row w-full overflow hidden"></main>
        <section className="w-full md:w-1/2 h-full border-b md: border-b-0 md:border-r border-zinc-800 flex  flex-cols  p-4 bg-zinc-950"></section>
      </div>
    </>
  );
}
