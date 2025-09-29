import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Edit3, Eye, Trash2, Copy, Share2 } from "lucide-react";


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Filter pastes based on search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete paste
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="min-h-screen rounded-2xl w-full bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10 flex justify-center">
      <div className="w-full min-w-3xl max-w-5xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Your Saved Pastes
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            className="p-3 w-full max-w-xl border text-gray-800 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            type="search"
            placeholder="Search pastes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Paste List */}
        <div className="flex flex-col gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
                key={paste?._id}
              >
                {/* Title & Content */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {paste.title}
                </h2>
                <p className="text-gray-600 whitespace-pre-wrap mb-4">
                  {paste.content}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-between md:justify-evenly mb-4">
  {/* Edit Button */}
  <a
    href={`/?pasteId=${paste?._id}`}
    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition duration-200"
    title="Edit"
  >
    <Edit3 className="w-5 h-5" />
  </a>

  {/* View Button */}
  <a
    href={`/pastes/${paste?._id}`}
    className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 active:scale-95 transition duration-200"
    title="View"
  >
    <Eye className="w-5 h-5" />
  </a>

  {/* Delete Button */}
  <button
    onClick={() => handleDelete(paste._id)}
    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-95 transition duration-200"
    title="Delete"
  >
    <Trash2 className="w-5 h-5" />
  </button>

  {/* Copy Button */}
  <button
    onClick={() => {
      navigator.clipboard.writeText(paste.content);
      alert("Copied to Clipboard!");
    }}
    className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95 transition duration-200"
    title="Copy"
  >
    <Copy className="w-5 h-5" />
  </button>

  {/* Share Button */}
  <button
    onClick={() => {
      navigator.clipboard.writeText(
        `${window.location.origin}/pastes/${paste._id}`
      );
      alert("Paste link copied to clipboard!");
    }}
    className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition duration-200"
    title="Share"
  >
    <Share2 className="w-5 h-5" />
  </button>
</div>


                {/* Timestamp */}
                <div className="text-xs text-gray-500 text-right">
                  Created on:{" "}
                  {new Date(paste.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No pastes found. Try creating a new one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
