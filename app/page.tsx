"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchData = async () => {
    const data = await axios.get(
      "https://dummyjson.com/recipes/search?q=" + input,
    );
    setResults(data.data.recipes);
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <div className="text-center p-5">
      <h1 className="font-semibold mb-4">AUTO-COMPLETE SEARCHBAR</h1>
      <input
        type="text"
        placeholder="Enter Recipie Here"
        value={input}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        onChange={(e) => setInput(e.target.value)}
        className="w-[500px] border p-2 rounded-t"
      />
      {showResults && (
        <div className="w-[500px] max-h-[400px] overflow-scroll overflow-x-hidden m-auto border p-2 rounded-b text-left">
          {results.map((r) => (
            <span className="block hover:bg-slate-50 cursor-pointer" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
