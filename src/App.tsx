import { useState, useRef, useEffect } from "react";

export default function App() {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"table" | "interface">("table");
  const [parsedFields, setParsedFields] = useState<any[]>([]);
  const [tsCode, setTsCode] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Dynamic date formatting for your footer
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="w-full h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
        {/* HEADER: Added py-4, px-8 and shrink-0 for better spacing */}
        <header className="w-full shrink-0 border-b border-zinc-800 flex items-center justify-between px-8 py-4 bg-zinc-900/30">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight text-white">
              CleanDocs
            </span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
              Beta
            </span>
          </div>

          <div className="text-sm border border-zinc-800 bg-zinc-900 px-4 py-2 rounded-lg w-[400px] flex justify-between items-center focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search fields, types, interfaces..."
              className="bg-transparent border-none outline-none w-full text-zinc-300 placeholder-zinc-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="text-xs bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border font-mono border-zinc-700 ml-2 whitespace-nowrap">
              Ctrl + K
            </kbd>
          </div>

          <button className="bg-zinc-800 hover:bg-zinc-700 hover:border-emerald-500 text-sm text-zinc-400 hover:text-zinc-200 px-5 py-2 font-mono rounded-lg transition-all">
            Sign in
          </button>
        </header>

        {/* MAIN CONTENT: Added flex-1 and overflow-hidden to perfectly constrain the middle section */}
        <main className="flex-1 flex overflow-hidden">
          <section className="w-full h-full border-b md:w-1/2 md:border-b-0 md:border-r border-zinc-800 flex flex-col p-6 bg-zinc-950">
            <h4 className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">
                  API JSON Response Input
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                <p className="text-xs text-zinc-500 font-semibold tracking-wider uppercase cursor-pointer hover:text-zinc-400 transition-colors">
                  json
                </p>
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
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-3 rounded-lg transition-all tracking-wide shadow-lg shadow-emerald-500/10"
              >
                Generate Typed Docs
              </button>
              <p className="text-zinc-500 text-xs flex justify-center py-1 mt-2">
                Parses JSON → TypeScript interfaces + field documentation
              </p>
            </div>
          </section>

          <section className="w-full md:w-1/2 h-full flex flex-col p-6 bg-zinc-950">
            <div className="flex gap-6 border-b border-zinc-900 pb-3 mb-4">
              <button
                onClick={() => setActiveTab("table")}
                className={`text-sm font-medium px-4 py-1 flex justify-center items-center rounded-md transition-colors ${
                  activeTab === "table"
                    ? "text-emerald-400 border border-emerald-700/50 bg-zinc-800/50"
                    : "text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/30"
                }`}
              >
                Interactive Table
              </button>
              <button
                onClick={() => setActiveTab("interface")}
                className={`text-sm font-medium px-4 py-1 flex justify-center items-center rounded-md transition-colors ${
                  activeTab === "interface"
                    ? "text-emerald-400 border border-emerald-700/50 bg-zinc-800/50"
                    : "text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/30"
                }`}
              >
                TypeScript Interface
              </button>
            </div>

            <section className="flex-1 flex flex-col border border-dashed border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
              {activeTab === "table" ? (
                <div className="w-full h-full flex flex-col overflow-y-auto p-2">
                  <div className="grid grid-cols-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider pb-3 border-b border-zinc-900 px-4 pt-2 sticky top-0 bg-zinc-950">
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
                        className="grid grid-cols-3 items-center py-3.5 border-b border-zinc-900/60 hover:bg-zinc-900/20 px-4 text-sm transition-colors"
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

        {/* FOOTER: New section added with shrink-0 */}
        <footer className="w-full shrink-0 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between px-8 py-3 text-xs text-zinc-600 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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
