import React, { useState } from "react";

const syllabusSections = [
  {
    id: 1,
    title: "Unit 1: Introduction to Computing",
    icon: "💡",
    color: "bg-blue-100",
    summary: "History, generations, and basics of computers.",
    details: (
      <>
        <b>Topics:</b> Computer evolution, types, architecture.<br />
        <b>Outcome:</b> Understand the foundation of modern computing.<br />
        <b>Tip:</b> Draw a block diagram of a computer system.<br />
        <b>Resource:</b> <a href='https://www.tutorialspoint.com/computer_fundamentals/index.htm' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>TutorialsPoint</a>
      </>
    ),
  },
  {
    id: 2,
    title: "Unit 2: Programming Fundamentals",
    icon: "💻",
    color: "bg-green-100",
    summary: "Variables, data types, and control structures.",
    details: (
      <>
        <b>Topics:</b> Variables, loops, conditionals, functions.<br />
        <b>Outcome:</b> Write simple programs in C/Python.<br />
        <b>Practice:</b> Try basic coding exercises online.<br />
        <b>Resource:</b> <a href='https://www.hackerrank.com/domains/tutorials/10-days-of-javascript' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>HackerRank</a>
      </>
    ),
  },
  {
    id: 3,
    title: "Unit 3: Data Structures",
    icon: "🗂️",
    color: "bg-yellow-100",
    summary: "Arrays, stacks, queues, and linked lists.",
    details: (
      <>
        <b>Topics:</b> Arrays, stacks, queues, linked lists.<br />
        <b>Outcome:</b> Implement basic data structures.<br />
        <b>Resource:</b> <a href='https://visualgo.net/en' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>VisuAlgo</a>
      </>
    ),
  },
  {
    id: 4,
    title: "Unit 4: Web Technologies",
    icon: "🌐",
    color: "bg-purple-100",
    summary: "HTML, CSS, JavaScript basics.",
    details: (
      <>
        <b>Topics:</b> HTML tags, CSS styling, JS basics.<br />
        <b>Outcome:</b> Build a simple web page.<br />
        <b>Resource:</b> <a href='https://www.freecodecamp.org/' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>freeCodeCamp</a>
      </>
    ),
  },
];

const Syllabus = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center drop-shadow">
          📋 Syllabus Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {syllabusSections.map((section) => (
            <div
              key={section.id}
              className={`rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-200 border-t-4 ${section.color}`}
              onClick={() => setSelected(section)}
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{section.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <p className="text-gray-700">{section.summary}</p>
              <button
                className="mt-4 text-sm text-blue-700 underline hover:text-blue-900"
                onClick={e => {
                  e.stopPropagation();
                  setSelected(section);
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-blue-600 text-3xl font-bold"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{selected.icon}</span>
                <h2 className="text-2xl font-extrabold text-blue-700">{selected.title}</h2>
              </div>
              <div className="text-gray-800 text-lg mb-6">{selected.details}</div>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.25s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: none;}
          }
        `}
      </style>
    </div>
  );
};

export default Syllabus;