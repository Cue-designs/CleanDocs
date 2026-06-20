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
      alert("Valid JSON detected. Ready to parse");
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

        <main className="flex-1 flex  flex-col md:flex-row w-full overflow hidden">
          <section className="w-full md:w-1/2 h-full border-b md: border-b-0 md:border-r border-zinc-800 flex flex-col  p-4 bg-zinc-950">
            <h4 className="flex justify-between items-center mb-2">
              <div className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                <span className="text-xs font-semibold  text-zinc-500 tracking-wider  uppercase">
                  API JSON Response Input
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                <p className="text-xs text-zinc-500 font-semibold tracking-wider uppercase cursor-pointer ">
                  json
                </p>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
              </div>
            </h4>
            {/* Here is the input field for the  Users  */}
            <textarea
              className={`bg-zinc-900/20 ${errors ? "border-red-500/50" : "border-zinc-900"} focus:border-zinc-800  rounded-xl  p-4 font-mono  text-sm  text-zinc-300 resize-none overflow-y-auto  focus:outline-none placeholder-zinc-700`}
              placeholder={`{\n "status":"sucess", \n "code": 200\n}`}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            {errors && (
              <p className="text-xs  text-red-400  mt-2  font-mono  bg-red-500/5  border  border-red-500/10 px-3 -y-2  rounded-lg">
                {errors}{" "}
              </p>
            )}
            <button
              onClick={handleGenerate}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-3 rounded-xl mt-4 transition-all  tracking-wide  shadow-lg  shadow-emerald-500/10"
            >
              Generate Typed Docs
            </button>
          </section>
          {/* This is the output section for the generated typed docs */}
          <section className=" w-full md:w-1/2 h-full  flex  flex-col p-4  bg-zinc-950">
            <div className="flex  gap-6  border-b  border-zinc-900 pb-2  mb-4">
              <button className="text-sm font-medium text-emerald-400  border-b-2  border-emerald-500  hover:text-zinc-300 pb-2  px-1 transition-colors">
                {" "}
                TypeScript Interface
              </button>
            </div>
            <section className="flex-1  flex  items-center  justify-center  border border-dashed  border-zinc-600  text-sm  text-zinc-600 rounded-xl ">
              Generated TypeScript interface will be shown here
            </section>
          </section>
        </main>
      </div>
    </>
  );
}
