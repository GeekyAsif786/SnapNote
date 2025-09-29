import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Find the paste by ID
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-red-500 text-xl font-semibold">
          Paste not found 😢
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl min-w-2xl mx-auto p-6 mt-8 bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        View Paste
      </h2>

      {/* Title Input */}
      <div className="flex flex-row gap-7 mb-5">
        <input
          className="p-3 rounded-2xl w-full bg-gray-800 text-white border border-gray-600 focus:outline-none cursor-not-allowed"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      {/* Content Area */}
      <div>
        <textarea
          className="rounded-2xl w-full p-4 bg-gray-800 text-white border border-gray-600 focus:outline-none cursor-not-allowed resize-none"
          rows={12}
          value={paste.content}
          disabled
        />
      </div>

      {/* Footer */}
      <div className="mt-5 text-gray-400 text-sm text-right">
        Created At: <span className="text-gray-300">{paste.createdAt}</span>
      </div>
    </div>
  );
};

export default ViewPaste;
