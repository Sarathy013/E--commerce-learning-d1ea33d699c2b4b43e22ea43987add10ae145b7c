import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import learningIllustration from "../../assets/login-bg.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent form reload
    // Add your login logic here
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <header className="login-brand">
        <span className="login-brand__mark"><GraduationCap size={22} /></span>
        <span><strong>StudySpace</strong><small>LEARNING HUB</small></span>
      </header>

      <main className="login-main">
        <section className="login-intro">
          <p className="login-kicker">LEARN WITH PURPOSE</p>
          <h1>Build your<br /><span>next chapter.</span></h1>
          <p className="login-intro__copy">Your courses, notes, and study progress in one place. Find your rhythm and keep moving forward.</p>
          <div className="login-illustration">
            <img src={learningIllustration} alt="Students learning together" />
          </div>
        </section>

        <section className="login-panel" aria-labelledby="login-title">
          <div className="login-panel__heading">
            <p className="login-kicker">WELCOME BACK</p>
            <h2 id="login-title">Sign in to continue</h2>
            <p>Pick up where your learning left off.</p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Enter your username" autoComplete="username" required />
            </div>
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" required />
            </div>
            <button type="submit" className="login-submit">
              Continue to dashboard <ArrowRight size={17} />
            </button>
          </form>
          <div className="login-demo-note">
            <BookOpen size={17} />
            <p>Demo access: any non-empty username and password will continue.</p>
          </div>
        </section>
      </main>
      <footer className="login-footer">A calmer place to learn, one step at a time.</footer>
    </div>
  );
};

export default Login;
