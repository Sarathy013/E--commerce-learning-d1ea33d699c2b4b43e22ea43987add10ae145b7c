
import React, { useState } from "react";


const exams = [
  {
    id: 1,
    title: "Midterm Exam",
    icon: "📝",
    color: "bg-yellow-100",
    summary: "Covers Units 1-3. Date: 10 Apr 2025.",
    details: (
      <>
        <b>Subjects:</b> Computer Networks, DBMS, OS<br />
        <b>Time:</b> 10:00 AM - 1:00 PM<br />
        <b>Venue:</b> Main Hall<br />
        <b>Tip:</b> Revise previous year question papers.<br />
        <b>Resources:</b> <a href='https://www.geeksforgeeks.org/previous-year-papers/' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>Sample Papers</a>
      </>
    ),
  },
  {
    id: 2,
    title: "Final Exam",
    icon: "🎓",
    color: "bg-green-100",
    summary: "Covers all units. Date: 20 May 2025.",
    details: (
      <>
        <b>Subjects:</b> All course subjects<br />
        <b>Time:</b> 10:00 AM - 2:00 PM<br />
        <b>Venue:</b> Main Hall<br />
        <b>Tip:</b> Focus on revision notes and group study.<br />
        <b>Resources:</b> <a href='https://www.khanacademy.org/' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>Khan Academy</a>
      </>
    ),
  },
  {
    id: 3,
    title: "Quiz Series",
    icon: "❓",
    color: "bg-pink-100",
    summary: "Weekly quizzes every Friday.",
    details: (
      <>
        <b>Format:</b> MCQs and short answers<br />
        <b>Time:</b> 4:00 PM - 5:00 PM<br />
        <b>Venue:</b> Online Portal<br />
        <b>Tip:</b> Practice with online quizzes.<br />
        <b>Resources:</b> <a href='https://quizlet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>Quizlet</a>
      </>
    ),
  },
];

const ExamSchedule = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-yellow-700 mb-10 text-center drop-shadow">
          📅 Exam Schedule
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className={`rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-200 border-t-4 ${exam.color}`}
              onClick={() => setSelected(exam)}
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{exam.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">{exam.title}</h2>
              </div>
              <p className="text-gray-700">{exam.summary}</p>
              <button
                className="mt-4 text-sm text-yellow-700 underline hover:text-yellow-900"
                onClick={e => {
                  e.stopPropagation();
                  setSelected(exam);
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
                className="absolute top-3 right-4 text-gray-400 hover:text-yellow-600 text-3xl font-bold"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{selected.icon}</span>
                <h2 className="text-2xl font-extrabold text-yellow-700">{selected.title}</h2>
              </div>
              <div className="text-gray-800 text-lg mb-6">{selected.details}</div>
              <button
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
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

export default ExamSchedule;