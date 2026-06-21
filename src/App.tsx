import { useState, useRef, useEffect } from "react";
import {
  Search,
  TerminalSquare,
  Zap,
  TableProperties,
  Code2,
  Copy,
  Check,
  Trash2,
  Share2,
} from "lucide-react";

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"table" | "interface">("table");
  const [parsedFields, setParsedFields] = useState<any[]>([]);
  const [tsCode, setTsCode] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGenerate = () => {
    setErrors(null);
    try {
      if (!jsonInput) {
        setErrors("Please paste some JSON data first");
        return;
      }

      const parsedData = JSON.parse(jsonInput);
      const extractedFields: any[] = [];
      let generatedInterface = "interface RootObject {\n";

      for (const key in parsedData) {
        const value = parsedData[key];
        let dataType = typeof value;

        if (Array.isArray(value)) {
          dataType = typeof value[0] === "string" ? "string[]" : "any[]";
        } else if (value !== null && dataType === "object") {
          dataType = "object";
        }

        extractedFields.push({
          name: key,
          type: dataType,
          description: `Auto-detected ${dataType} field`,
        });

        generatedInterface += `  ${key}: ${dataType === "object" ? "any" : dataType};\n`;
      }

      generatedInterface += "}";

      setParsedFields(extractedFields);
      setTsCode(generatedInterface);
    } catch (err: any) {
      setErrors(err.message || "Invalid JSON format");
    }
  };

  // Action Handlers
  const handleCopy = async () => {
    if (!tsCode && parsedFields.length === 0) return;
    try {
      // Copies the TypeScript interface or a JSON representation of the table
      const textToCopy =
        activeTab === "interface"
          ? tsCode
          : JSON.stringify(parsedFields, null, 2);
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleDelete = () => {
    setJsonInput("");
    setTsCode("");
    setParsedFields([]);
    setErrors(null);
  };

  const handleShare = async () => {
    if (!tsCode && parsedFields.length === 0) return;

    const textToShare =
      activeTab === "interface"
        ? tsCode
        : JSON.stringify(parsedFields, null, 2);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "CleanDocs Generated Output",
          text: textToShare,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      // Fallback to copy if Web Share API is not supported
      handleCopy();
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "string":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "number":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "object":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "boolean":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      default:
        return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    }
  };

  const filteredFields = parsedFields.filter(
    (field) =>
      field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="w-full h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
        {/* HEADER */}
        <header className="w-full shrink-0 border-b border-zinc-800 flex items-center justify-between px-8 py-4 bg-zinc-900/30">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-1.5 rounded-md border border-emerald-500/30 text-emerald-400">
              <TerminalSquare size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              CleanDocs
            </span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
              Beta
            </span>
          </div>

          <div className="text-sm border border-zinc-800 bg-zinc-900 px-4 py-2 rounded-lg w-[400px] flex justify-between items-center focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
            <div className="flex items-center w-full gap-2 text-zinc-400">
              <Search size={16} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search fields, types, interfaces..."
                className="bg-transparent border-none outline-none w-full text-zinc-300 placeholder-zinc-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <kbd className="text-xs bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border font-mono border-zinc-700 ml-2 whitespace-nowrap">
              Ctrl + K
            </kbd>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 hover:border-emerald-500 text-sm text-zinc-300 px-4 py-2 font-medium rounded-lg transition-all border border-zinc-700">
              Sign in
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel */}
          <section className="w-full h-full border-b md:w-1/2 md:border-b-0 md:border-r border-zinc-800 flex flex-col p-6 bg-zinc-950">
            <h4 className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
                  API JSON Response Input
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">
                  JSON
                </span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                </div>
              </div>
            </h4>

            <textarea
              className={`bg-zinc-900/20 ${errors ? "border-red-500/50" : "border-zinc-900"} border focus:border-zinc-700 rounded-xl flex-1 p-4 font-mono text-sm text-zinc-300 resize-none overflow-y-auto focus:outline-none placeholder-zinc-700`}
              placeholder={`{\n  "status": "success", \n  "code": 200,\n  "verified": true,\n  "data": {}\n}`}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            {errors && (
              <p className="text-xs text-red-400 mt-2 font-mono bg-red-500/5 border border-red-500/10 px-3 py-2 rounded-lg">
                {errors}
              </p>
            )}

            <div className="border border-zinc-800 w-full py-3 bg-zinc-900/40 rounded-xl px-3 flex flex-col mt-4">
              <button
                onClick={handleGenerate}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-3 rounded-lg transition-all tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Zap size={18} fill="currentColor" />
                Generate Typed Docs
              </button>
              <p className="text-zinc-500 text-xs flex justify-center py-1 mt-2">
                Parses JSON → TypeScript interfaces + field documentation
              </p>
            </div>
          </section>

          {/* Right Panel */}
          <section className="w-full md:w-1/2 h-full flex flex-col p-6 bg-zinc-950 relative">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("table")}
                  className={`text-sm font-medium px-4 py-1.5 flex justify-center items-center gap-2 rounded-md transition-colors ${
                    activeTab === "table"
                      ? "text-emerald-400 border border-emerald-700/50 bg-zinc-800/50"
                      : "text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/30"
                  }`}
                >
                  <TableProperties size={16} />
                  Interactive Table
                </button>
                <button
                  onClick={() => setActiveTab("interface")}
                  className={`text-sm font-medium px-4 py-1.5 flex justify-center items-center gap-2 rounded-md transition-colors ${
                    activeTab === "interface"
                      ? "text-emerald-400 border border-emerald-700/50 bg-zinc-800/50"
                      : "text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/30"
                  }`}
                >
                  <Code2 size={16} />
                  TypeScript Interface
                </button>
              </div>

              {/* Action Buttons: Copy, Share, Delete */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 mr-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Live {parsedFields.length} fields
                </span>
                <button
                  onClick={handleShare}
                  disabled={!tsCode && parsedFields.length === 0}
                  className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Share"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!tsCode && parsedFields.length === 0}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCopied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                  {isCopied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!tsCode && parsedFields.length === 0}
                  className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Clear Output"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <section className="flex-1 flex flex-col border border-dashed border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
              {activeTab === "table" ? (
                <div className="w-full h-full flex flex-col overflow-y-auto p-2">
                  <div className="grid grid-cols-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider pb-3 border-b border-zinc-900 px-4 pt-2 sticky top-0 bg-zinc-950 z-10">
                    <div>Field Name</div>
                    <div>Type</div>
                    <div>Description</div>
                  </div>

                  {filteredFields.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center h-full text-zinc-600 text-sm">
                      {parsedFields.length === 0
                        ? "Paste JSON and click generate"
                        : "No matching fields found"}
                    </div>
                  ) : (
                    filteredFields.map((field, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 items-center py-3.5 border-b border-zinc-900/60 hover:bg-zinc-900/20 px-4 text-sm transition-colors group"
                      >
                        <div className="font-mono text-zinc-200">
                          {field.name}
                        </div>
                        <div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded border font-mono ${getTypeStyles(field.type)}`}
                          >
                            {field.type}
                          </span>
                        </div>
                        <div className="text-zinc-500 text-xs">
                          {field.description}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex flex-col font-mono text-sm text-zinc-300 relative overflow-auto p-6 bg-zinc-900/10">
                  {tsCode === "" ? (
                    <div className="flex-1 flex items-center justify-center text-zinc-600 font-sans">
                      Awaiting JSON data...
                    </div>
                  ) : (
                    <pre className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                      {tsCode}
                    </pre>
                  )}
                </div>
              )}
            </section>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="w-full shrink-0 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between px-8 py-3 text-xs text-zinc-600 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              Systems Operational
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <span>
              Built by{" "}
              <span className="text-zinc-400 font-semibold">Cajetan</span>
            </span>
            <span className="text-zinc-700">|</span>
            <span>{currentDate}</span>
          </div>
        </footer>
      </div>
    </>
  );
}
