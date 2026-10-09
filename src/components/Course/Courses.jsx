import React, { useState } from "react";
import "./Courses.css";
import { ArrowRight, Check, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [ 
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React.js and build interactive UIs.",
    category: "FRONT END",
    image: "https://www.svgrepo.com/show/452092/react.svg"
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JS concepts, ES6+, and async patterns.",
    category: "JAVASCRIPT",
    image: "https://www.svgrepo.com/show/349419/javascript.svg",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Design user-centric interfaces using modern tools.",
    category: "DESIGN",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  },
  {
    id: 4,
    title: "Full Stack Development",
    description: "Become full stack web developer using MERN stack.",
    category: "FULL STACK",
    image: "https://cdn-icons-png.flaticon.com/512/5047/5047036.png",
  },
];

const CoursePage = () => {
  const [addedCourses, setAddedCourses] = useState(() => new Set());
  const navigate = useNavigate();

  const toggleCourse = (courseId) => {
    setAddedCourses(current => {
      const next = new Set(current);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });
  };

  return (
    <div className="course-container">
      <nav className="navbar">
        <button className="course-brand" onClick={() => navigate('/dashboard')}>
          <span className="course-brand__mark"><GraduationCap size={20} /></span>
          <span><strong>StudySpace</strong><small>LEARNING HUB</small></span>
        </button>
        <span className="navbar-label">LEARNING LIBRARY</span>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <p className="course-eyebrow">CURATED FOR YOUR NEXT STEP</p>
          <h1>Find your next course.</h1>
          <p>Build useful skills at your pace, from first concepts to full-stack projects.</p>
        </div>
        <div className="course-count"><strong>04</strong><span>guided paths<br />to explore</span></div>
      </header>

      <main className="course-content">
        <div className="course-list-heading"><h2>Explore courses</h2><span>Choose a subject to get started</span></div>
        <section className="grid" aria-label="Available courses">
        {courses.map((course) => (
          <article key={course.id} className="card">
            <div className={`course-image course-image--${course.id}`}>
              <img src={course.image} alt="" />
              <span>{course.category}</span>
            </div>
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button
                className={addedCourses.has(course.id) ? 'is-added' : ''}
                onClick={() => toggleCourse(course.id)}
                aria-pressed={addedCourses.has(course.id)}
              >
                {addedCourses.has(course.id) ? <>Added to learning list <Check size={16} /></> : <>Add to learning list <ArrowRight size={16} /></>}
              </button>
            </div>
          </article>
        ))}
        </section>
      </main>

      <footer className="footer">
        Keep building your next chapter.
      </footer>
    </div>
  );
};

export default CoursePage;