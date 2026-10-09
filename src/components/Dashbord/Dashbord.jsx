import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Play,
  Settings,
  Sparkles,
  Video,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './Dashbord.css';

const data = [
  { name: 'Week 1', attendance: 90, quiz: 70 },
  { name: 'Week 2', attendance: 92, quiz: 80 },
  { name: 'Week 3', attendance: 91, quiz: 75 },
  { name: 'Week 4', attendance: 93, quiz: 85 },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Courses', icon: BookOpen, route: '/courses' },
  { label: 'Notes', icon: FileText, route: '/notes' },
  { label: 'Syllabus', icon: ClipboardList, route: '/syllabus' },
  { label: 'Exam schedule', icon: CalendarDays, route: '/exam-schedule' },
  { label: 'Video library', icon: Video, route: '/videolibrary' },
  { label: 'Recommendations', icon: Sparkles, route: '/videorecommender' },
  { label: 'Discussion', icon: MessageCircle, route: '/discussion' },
  { label: 'Settings', icon: Settings, route: '/settings' },
];

const SummaryCard = ({ title, subtitle, detail, icon: Icon, actionLabel, onAction, tone }) => (
  <Motion.article
    className={`summary-card summary-card--${tone}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
  >
    <div className="summary-card__icon">{React.createElement(Icon, { size: 18, strokeWidth: 1.8 })}</div>
    <div className="summary-card__body">
      <p className="summary-card__eyebrow">{title}</p>
      <h3>{subtitle}</h3>
      <p className="summary-card__detail">{detail}</p>
    </div>
    {actionLabel && (
      <button className="summary-card__action" onClick={onAction} aria-label={actionLabel}>
        <ArrowUpRight size={18} />
      </button>
    )}
  </Motion.article>
);

const StudentDashboard = () => {
  const [learnerMode, setLearnerMode] = useState('slow');
  const navigate = useNavigate();
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="dashboard-shell">
      <Motion.aside className="dashboard-sidebar" initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <div className="dashboard-brand">
          <span className="dashboard-brand__mark"><GraduationCap size={23} /></span>
          <span><strong>StudySpace</strong><small>LEARNING HUB</small></span>
        </div>

        <div className="dashboard-profile">
          <div className="dashboard-profile__avatar">S</div>
          <div><strong>Sarathy</strong><span>Student account</span></div>
          <span className="dashboard-profile__status" aria-label="Online" />
        </div>

        <nav className="dashboard-nav" aria-label="Main navigation">
          <p className="dashboard-nav__label">WORKSPACE</p>
          <ul>
            {navItems.map(({ label, icon: Icon, route }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => route && navigate(route)}
                  className={`dashboard-nav__item${route ? '' : ' is-active'}`}
                  aria-current={route ? undefined : 'page'}
                >
                  {React.createElement(Icon, { size: 18, strokeWidth: 1.8 })}
                  <span>{label}</span>
                  {!route && <span className="dashboard-nav__indicator" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dashboard-sidebar__footer">
          <div className="streak-mark"><Flame size={17} /></div>
          <div><strong>15 day streak</strong><span>Keep your momentum</span></div>
        </div>
      </Motion.aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb"><span>Learning space</span><span>/</span><strong>Overview</strong></div>
          <div className="dashboard-date"><span className="dashboard-date__dot" />{today}</div>
        </header>

        <Motion.section
          className="welcome-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="welcome-panel__copy">
            <p className="eyebrow eyebrow--light">YOUR LEARNING OVERVIEW</p>
            <h1>Good to see you,<br /><span>Sarathy.</span></h1>
            <p className="welcome-panel__message">A little progress each day adds up. Pick up where you left off.</p>
            <button className="welcome-panel__button" onClick={() => navigate('/courses')}>
              Browse courses <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="welcome-visual" aria-label="Current course progress: 78 percent">
            <div className="welcome-visual__top"><span>THIS WEEK</span><span><Sparkles size={15} /> ON TRACK</span></div>
            <div className="welcome-visual__score">78<span>%</span></div>
            <p>Course progress</p>
            <div className="welcome-visual__bars" aria-hidden="true">
              {[34, 53, 42, 71, 58, 86, 68, 100, 76, 91, 65, 82].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="welcome-panel__spark" aria-hidden="true">✳</div>
        </Motion.section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div><p className="eyebrow">AT A GLANCE</p><h2>Your progress</h2></div>
            <button className="text-action" onClick={() => navigate('/courses')}>All courses <ArrowUpRight size={16} /></button>
          </div>
          <div className="summary-grid">
            <SummaryCard title="Attendance" subtitle="92%" detail="You’re showing up consistently" icon={CalendarDays} tone="mint" />
            <SummaryCard title="Average quiz score" subtitle="78%" detail="Up 5% from last month" icon={ChartNoAxesCombined} tone="peach" />
            <SummaryCard title="Next class" subtitle="Computer Networks" detail="Today · 11:00 AM" icon={Clock3} tone="yellow" />
          </div>
        </section>

        <div className="dashboard-content-grid">
          <section className="dashboard-panel analytics-panel">
            <div className="panel-heading">
              <div><p className="eyebrow">RECENT ACTIVITY</p><h2>Performance</h2></div>
              <span className="panel-period">Last 4 weeks</span>
            </div>
            <div className="chart-grid">
              <div className="chart-block">
                <div className="chart-block__heading"><span className="chart-key chart-key--green" />Attendance<span className="chart-block__value">92%</span></div>
                <ResponsiveContainer width="100%" height={190}>
                  <LineChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -24 }}>
                    <CartesianGrid vertical={false} stroke="#e9eee9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#84928c', fontSize: 11 }} />
                    <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: '#84928c', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 10, borderColor: '#e2e9e3', fontSize: 12 }} />
                    <Line type="monotone" dataKey="attendance" stroke="#247563" strokeWidth={3} dot={{ r: 3, fill: '#247563', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-block chart-block--divided">
                <div className="chart-block__heading"><span className="chart-key chart-key--coral" />Quiz scores<span className="chart-block__value">78%</span></div>
                <ResponsiveContainer width="100%" height={190}>
                  <BarChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -24 }}>
                    <CartesianGrid vertical={false} stroke="#e9eee9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#84928c', fontSize: 11 }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#84928c', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 10, borderColor: '#e2e9e3', fontSize: 12 }} />
                    <Bar dataKey="quiz" fill="#e88361" radius={[5, 5, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="dashboard-panel tasks-panel">
            <div className="panel-heading">
              <div><p className="eyebrow">KEEP MOVING</p><h2>Coming up</h2></div>
              <span className="task-count">2 items</span>
            </div>
            <SummaryCard
              title="UPCOMING QUIZ"
              subtitle="Computer Networks"
              detail="Unit 3 · Apr 10"
              icon={ClipboardList}
              actionLabel="Prepare for Computer Networks quiz"
              onAction={() => navigate('/notes')}
              tone="task"
            />
            <SummaryCard
              title="ASSIGNMENT DUE"
              subtitle="DBMS Lab"
              detail="Problem Set 4 · Apr 8"
              icon={FileText}
              actionLabel="Open DBMS notes"
              onAction={() => navigate('/notes')}
              tone="task"
            />
            <button className="tasks-footer" onClick={() => navigate('/exam-schedule')}>
              View exam schedule <ArrowUpRight size={16} />
            </button>
          </section>
        </div>

        <section className="dashboard-panel notes-panel">
          <div className="notes-panel__intro">
            <div className="notes-panel__icon"><BookOpen size={20} /></div>
            <div><p className="eyebrow">STUDY YOUR WAY</p><h2>Learning notes</h2><p>Choose the format that fits your focus today.</p></div>
          </div>
          <div className="learner-toggle" role="group" aria-label="Learning note style">
            <button className={learnerMode === 'slow' ? 'is-selected' : ''} onClick={() => setLearnerMode('slow')} aria-pressed={learnerMode === 'slow'}>Deep dive</button>
            <button className={learnerMode === 'fast' ? 'is-selected' : ''} onClick={() => setLearnerMode('fast')} aria-pressed={learnerMode === 'fast'}>Quick review</button>
          </div>
          <div className="learner-summary">
              <span className="learner-summary__icon">{learnerMode === 'slow' ? <BookOpen size={17} /> : <Play size={17} />}</span>
              <p>{learnerMode === 'slow'
                ? 'Detailed explanations, worked examples, and visual guides for a deeper understanding.'
                : 'Concise summaries and practice questions for a focused refresher.'}</p>
              <button onClick={() => navigate('/notes')}>Open notes <ArrowUpRight size={15} /></button>
          </div>
          <div className="note-links">
            <button onClick={() => navigate('/notes')}><span><BookOpen size={16} /></span>Computer Networks<ArrowUpRight size={15} /></button>
            <button onClick={() => navigate('/notes')}><span><CheckCircle2 size={16} /></span>DBMS Fundamentals<ArrowUpRight size={15} /></button>
            <button onClick={() => navigate('/notes')}><span><Flame size={16} /></span>Signal Processing<ArrowUpRight size={15} /></button>
          </div>
        </section>
        <footer className="dashboard-footer"><GraduationCap size={16} />Keep showing up. Your future self will thank you.</footer>
      </main>
    </div>
  );
};

export default StudentDashboard;
