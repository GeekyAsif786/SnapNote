import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update
      dispatch(updateToPastes(paste));
    } else {
      // Create
      dispatch(addToPastes(paste));
    }

    // After creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl w-full min-w-3xl max-w-5xl p-8 border border-gray-200">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h1>

        {/* Title Input & Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            className=" text-xl font-bold text-gray-800 text-center flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition duration-200 shadow"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        {/* Text Area */}
        <textarea
          className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-4 resize-none text-gray-800 placeholder-gray-400 transition duration-200"
          placeholder="Enter Content Here..."
          rows={15}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💾 Your paste will be saved automatically in local storage.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

