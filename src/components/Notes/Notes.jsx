import React, { useState } from "react";

const notes = [
  {
    id: 1,
    subject: "Computer Networks",
    icon: "🌐",
    color: "bg-blue-100",
    content: "Master the OSI model, TCP/IP, and real-world networking scenarios.",
    details: (
      <>
        <b>OSI Layers:</b> Physical, Data Link, Network, Transport, Session, Presentation, Application.<br />
        <b>Key Protocols:</b> HTTP, TCP, UDP, IP, Ethernet.<br />
        <b>Tip:</b> Use Wireshark to visualize packet flow.<br />
        <b>Practice:</b> Draw the OSI model and map protocols to each layer.
      </>
    ),
  },
  {
    id: 2,
    subject: "DBMS Fundamentals",
    icon: "🗄️",
    color: "bg-yellow-100",
    content: "Understand SQL, normalization, and database design best practices.",
    details: (
      <>
        <b>Normalization:</b> 1NF, 2NF, 3NF to reduce redundancy.<br />
        <b>SQL:</b> SELECT, JOIN, GROUP BY, subqueries.<br />
        <b>ER Diagrams:</b> Visualize entities and relationships.<br />
        <b>Tip:</b> Practice writing queries for real-world datasets.
      </>
    ),
  },
  {
    id: 3,
    subject: "Signal Processing",
    icon: "📈",
    color: "bg-green-100",
    content: "Explore Fourier Transforms, filters, and signal analysis.",
    details: (
      <>
        <b>Fourier Transform:</b> Converts time to frequency domain.<br />
        <b>Applications:</b> Audio, image, and communication systems.<br />
        <b>Tip:</b> Use Python’s NumPy for FFT demos.<br />
        <b>Practice:</b> Plot signals before and after filtering.
      </>
    ),
  },
  {
    id: 4,
    subject: "Operating Systems",
    icon: "💻",
    color: "bg-purple-100",
    content: "Dive into process management, memory, and scheduling algorithms.",
    details: (
      <>
        <b>Scheduling:</b> FCFS, SJF, Round Robin.<br />
        <b>Memory:</b> Paging, segmentation, virtual memory.<br />
        <b>Tip:</b> Simulate scheduling with Gantt charts.<br />
        <b>Practice:</b> Compare preemptive vs non-preemptive scheduling.
      </>
    ),
  },
  {
    id: 5,
    subject: "Data Structures",
    icon: "🌳",
    color: "bg-pink-100",
    content: "Learn stacks, queues, trees, graphs, and their real uses.",
    details: (
      <>
        <b>Stacks/Queues:</b> LIFO/FIFO, browser history, task scheduling.<br />
        <b>Trees:</b> Binary, BST, AVL, heaps.<br />
        <b>Graphs:</b> BFS, DFS, shortest path.<br />
        <b>Tip:</b> Visualize with diagrams and code snippets.
      </>
    ),
  },
  {
    id: 6,
    subject: "Web Technologies",
    icon: "🌐",
    color: "bg-orange-100",
    content: "HTML, CSS, JS, and the modern web ecosystem.",
    details: (
      <>
        <b>HTML:</b> Structure, semantics.<br />
        <b>CSS:</b> Flexbox, Grid, responsive design.<br />
        <b>JS:</b> DOM, events, fetch API.<br />
        <b>Tip:</b> Build a simple portfolio site as practice.
      </>
    ),
  },
  {
    id: 7,
    subject: "Machine Learning",
    icon: "🤖",
    color: "bg-teal-100",
    content: "Intro to ML concepts, algorithms, and Python tools.",
    details: (
      <>
        <b>Concepts:</b> Supervised, unsupervised, overfitting.<br />
        <b>Algorithms:</b> Linear regression, k-means, decision trees.<br />
        <b>Tools:</b> scikit-learn, pandas, matplotlib.<br />
        <b>Tip:</b> Try a Kaggle Titanic competition for hands-on learning.
      </>
    ),
  },
  {
    id: 8,
    subject: "Cybersecurity",
    icon: "🔒",
    color: "bg-red-100",
    content: "Basics of security, encryption, and safe coding.",
    details: (
      <>
        <b>Principles:</b> Confidentiality, integrity, availability.<br />
        <b>Encryption:</b> Symmetric, asymmetric, hashing.<br />
        <b>Tip:</b> Use password managers and 2FA.<br />
        <b>Practice:</b> Find vulnerabilities in sample code.
      </>
    ),
  },
];

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-10 tracking-tight text-center drop-shadow">
          📚 Study Notes Library
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-200 border-t-4 ${note.color}`}
              onClick={() => setSelectedNote(note)}
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{note.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">{note.subject}</h2>
              </div>
              <p className="text-gray-700">{note.content}</p>
              <button
                className="mt-4 text-sm text-blue-700 underline hover:text-blue-900"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedNote(note);
                }}
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Modal for note details */}
        {selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-blue-600 text-3xl font-bold"
                onClick={() => setSelectedNote(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{selectedNote.icon}</span>
                <h2 className="text-2xl font-extrabold text-blue-700">{selectedNote.subject}</h2>
              </div>
              <div className="text-gray-800 text-lg mb-6">{selectedNote.details}</div>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelectedNote(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Optional: Add a subtle animation */}
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

export default Notes;