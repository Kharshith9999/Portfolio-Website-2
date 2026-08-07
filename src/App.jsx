import { useEffect, useState } from 'react';

const projects = [
  {
    number: '01', type: 'Machine learning / FinTech', category: 'Fraud intelligence', name: 'CreditGaurd', notebook: 'notebooks/creditguard.ipynb',
    description: 'A real-time fraud detection and anomaly intelligence engine, designed for high-recall decisions at the edge.', tags: ['PyTorch', 'C++', 'FastAPI', 'MLflow'], visual: 'visual-credit',
  },
  {
    number: '02', type: 'Deep learning / Industry 4.0', category: 'Predictive maintenance', name: 'PredictAI', notebook: 'notebooks/predictai.ipynb',
    description: 'An LSTM-based maintenance system turning noisy sensor streams into early failure alerts and remaining-life estimates.', tags: ['LSTM', 'NumPy', 'DVC', 'Streamlit'], visual: 'visual-predict',
  },
  {
    number: '03', type: 'NLP / Business intelligence', category: 'Voice of customer', name: 'PulseBoard', notebook: 'notebooks/pulseboard.ipynb',
    description: 'A multilingual feedback intelligence platform translating customer language into sentiment, themes, and churn-risk signals.', tags: ['Transformers', 'NLTK', 'MySQL', 'Tableau'], visual: 'visual-pulse',
  },
  {
    number: '04', type: 'LLM systems / Retrieval', category: 'Agentic RAG', name: 'AgentIQ', notebook: 'notebooks/agentiq.ipynb',
    description: 'A self-correcting research assistant that evaluates retrieval quality, adapts its path, and invokes the right tool for each question.', tags: ['LangGraph', 'RAGAS', 'MCP', 'Hybrid search'], visual: 'visual-agent', dark: true,
  },
];

function Visual({ type }) {
  if (type === 'visual-predict') return <div className="project-visual visual-predict"><svg viewBox="0 0 440 180" preserveAspectRatio="none"><path d="M0,124 C28,125 30,88 55,94 S90,145 112,127 S143,52 171,91 S204,114 229,107 S255,154 286,107 S323,44 350,72 S381,119 440,22" /><path className="predict-faint" d="M0,150 C38,122 63,156 106,104 S173,116 207,83 S270,122 310,78 S384,133 440,52" /></svg><span className="chart-number">87.4<span>%</span></span><span className="chart-caption">Failure confidence</span></div>;
  if (type === 'visual-pulse') return <div className="project-visual visual-pulse"><div className="pulse-bars">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div><div className="pulse-orb orb-cyan" /><div className="pulse-orb orb-brass" /><div className="pulse-orb orb-red" /><span className="pulse-word">SENTIMENT</span></div>;
  if (type === 'visual-agent') return <div className="project-visual visual-agent"><div className="agent-node node-root">QUERY</div><div className="agent-node node-a">RETRIEVE</div><div className="agent-node node-b">GRADE</div><div className="agent-node node-c">TOOLS</div><div className="agent-node node-d">ANSWER</div><span className="agent-line line-a" /><span className="agent-line line-b" /><span className="agent-line line-c" /><span className="agent-line line-d" /></div>;
  return <div className="project-visual visual-credit"><div className="credit-stream stream-one" /><div className="credit-stream stream-two" /><div className="credit-stream stream-three" /><span className="signal signal-a" /><span className="signal signal-b" /><span className="signal signal-c" /><span className="risk-label">RISK<br />SIGNAL</span></div>;
}

function ProjectCard({ project, onOpen }) {
  return <button className={`project-card ${project.dark ? 'project-card-dark' : ''} reveal`} type="button" onClick={() => onOpen(project)}>
    <div className="project-topline"><span>{project.number} / {project.category}</span><span className="open-mark" aria-hidden="true">↗</span></div>
    <Visual type={project.visual} />
    <div className="project-content"><div><p className="project-type">{project.type}</p><h3>{project.name}</h3></div><p className="project-description">{project.description}</p><ul className="project-tags" aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><span className="project-link">Open technical notebook <b aria-hidden="true">→</b></span></div>
  </button>;
}

export default function App() {
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element, index) => { element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`; revealObserver.observe(element); });
    const onScroll = () => { const total = document.documentElement.scrollHeight - window.innerHeight; const progress = document.querySelector('.scroll-indicator span'); if (progress) progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`; };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { revealObserver.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const openNotebook = async (project) => {
    try {
      const response = await fetch(project.notebook, { cache: 'no-store' });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && !contentType.includes('text/html')) { window.open(project.notebook, '_blank', 'noopener'); return; }
    } catch { /* Local file previews show the guided state below. */ }
    setDialog(project);
  };

  return <>
    <div className="page-grain" aria-hidden="true" /><div className="scroll-indicator" aria-hidden="true"><span /></div>
    <header className="site-header" id="top"><a className="monogram" href="#top" aria-label="Koneti Harshith - top of page">KH</a><nav className="site-nav" aria-label="Primary navigation"><a href="#work">Selected work</a><a href="#profile">Profile</a><a href="#experience">Experience</a><a href="#credentials">Credentials</a></nav><a className="header-status" href="#work"><span /> Open to build</a></header>
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="hero-gridline gridline-one" /><div className="hero-gridline gridline-two" /><div className="hero-content"><p className="eyebrow reveal">Portfolio / 2026</p><h1 className="reveal" id="hero-title">Engineering<br />intelligent <em>systems.</em></h1><p className="hero-copy reveal">I’m <strong>Koneti Harshith</strong>, an IIT Kharagpur student building AI products that move from data to decisive action.</p><div className="hero-actions reveal"><a className="button button-primary" href="#work">Explore selected work <span>↓</span></a><a className="text-link" href="#profile">About me <span>↗</span></a></div></div><aside className="hero-fact reveal"><span className="fact-index">01 / 04</span><p>Data intelligence, machine learning, and agentic systems for consequential decisions.</p><div className="fact-rule" /><span className="fact-location">IIT Kharagpur · India</span></aside><div className="hero-orbit" aria-hidden="true"><div className="orbit-ring orbit-ring-large" /><div className="orbit-ring orbit-ring-small" /><div className="orbit-core">AI<br />×<br />DATA</div><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /></div><p className="hero-side-label">KONETI HARSHITH / SYSTEMS PORTFOLIO</p></section>
      <section className="intro section-shell" id="profile" aria-labelledby="profile-title"><div className="section-kicker reveal"><span>01</span> The profile</div><div className="intro-main reveal"><h2 id="profile-title">Built for the point where <em>signal</em> becomes strategy.</h2><p>I combine rigorous engineering with practical product thinking - designing applied machine-learning systems, data pipelines, and intelligent interfaces that are clear, accountable, and useful in the real world.</p></div><div className="stats-grid reveal"><div className="stat"><strong>2028</strong><span>B.Tech expected</span></div><div className="stat"><strong>7.45</strong><span>Current CGPA / 10</span></div><div className="stat"><strong>04</strong><span>AI systems showcased</span></div><div className="stat"><strong>IIT</strong><span>Kharagpur</span></div></div></section>
      <section className="work section-shell" id="work" aria-labelledby="work-title"><div className="section-heading"><div className="section-kicker reveal"><span>02</span> Selected work</div><p className="section-note reveal">Click a case study to open its technical notebook.</p></div><div className="work-heading reveal"><h2 id="work-title">Systems that make<br /><em>complexity legible.</em></h2><p>From fraud signals and industrial telemetry to customer sentiment and self-correcting retrieval.</p></div><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} onOpen={openNotebook} />)}</div></section>
      <section className="craft section-shell" aria-labelledby="craft-title"><div className="section-kicker reveal"><span>03</span> Technical repertoire</div><div className="craft-header reveal"><h2 id="craft-title">A considered stack<br />for <em>real-world AI.</em></h2><p>Tools selected to make models robust, deployable, and easy to understand.</p></div><div className="capability-list">{[['Intelligence','PyTorch, TensorFlow, scikit-learn, Hugging Face, LangChain, LangGraph, RAG, MCP'],['Data & analysis','Python, C++, MySQL, NumPy, Pandas, SciPy, NLTK, probability and statistics'],['Production','FastAPI, Streamlit, Docker, GitHub Actions, MLflow, DVC, REST APIs'],['Communication','Power BI, Tableau, Matplotlib, Seaborn, Excel - turning analysis into decisions.']].map(([title, description], index) => <article className="capability reveal" key={title}><span className="capability-number">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><span className="capability-symbol">{['⌁','⌘','◌','↗'][index]}</span></article>)}</div></section>
      <section className="experience section-shell" id="experience" aria-labelledby="experience-title"><div className="section-kicker reveal"><span>04</span> Beyond the notebook</div><div className="experience-grid"><div className="experience-copy reveal"><h2 id="experience-title">A builder in<br /><em>every room.</em></h2><p>Technical work is strongest when it’s paired with ownership, communication, and team play.</p></div><article className="role-card reveal"><p className="role-label">2025 - Present / IIT Kharagpur</p><h3>Sub-Head,<br />Web Team</h3><p>Shaurya, IIT Kharagpur</p><ul><li>Built official web experiences with React and Tailwind CSS.</li><li>Delivered responsive team and event pages in a six-person web team.</li><li>Coordinated participant transportation and inter-team communication during the fest.</li></ul></article><div className="personal-notes reveal"><p className="note-label">Off the screen</p><p>Silver medalist in IIT Kharagpur Inter-Hall Cricket. BGMI tournament captain. NSO Volleyball trainee.</p><div className="note-rule" /><p className="note-small">Team sport has shaped how I listen, prioritize, and lead under pressure.</p></div></div></section>
      <section className="credentials section-shell" id="credentials" aria-labelledby="credentials-title"><div className="credentials-card reveal"><div><p className="eyebrow">Education / foundation</p><h2 id="credentials-title">Mechanical engineering<br />with a <em>digital instinct.</em></h2></div><div className="education-list">{[['2024 - 2028','B.Tech (Hons.) in Mechanical Engineering','Indian Institute of Technology Kharagpur · CGPA 7.45 / 10'],['2024','Board of Intermediate Education','Sri Chaitanya College · 98.6%'],['2022','Board of Secondary Education, Andhra Pradesh','VSSC Holy Cross School · 93.8%']].map(([year, degree, details]) => <article key={year}><span>{year}</span><div><h3>{degree}</h3><p>{details}</p></div></article>)}</div><div className="certification-note"><span>Also certified</span><p>Prompt Engineering · AutoCAD · Ansys</p></div></div></section>
      <section className="closing section-shell"><p className="eyebrow reveal">Let’s make useful intelligence</p><h2 className="reveal">Looking for the next<br /><em>meaningful problem.</em></h2><a className="closing-link reveal" href="#top">Back to top <span>↑</span></a></section>
    </main>
    <footer className="site-footer"><a className="monogram" href="#top" aria-label="Koneti Harshith - top of page">KH</a><p>© {new Date().getFullYear()} Koneti Harshith</p><p>Designed for clarity · Built with intent</p></footer>
    {dialog && <dialog className="notebook-dialog" open aria-labelledby="dialog-title"><button className="dialog-close" type="button" aria-label="Close notebook message" onClick={() => setDialog(null)}>×</button><div className="dialog-icon" aria-hidden="true">⌘</div><p className="eyebrow">Notebook pending</p><h2 id="dialog-title">{dialog.name} is ready for its technical deep dive.</h2><p>The {dialog.name} notebook has not been added yet.</p><code>{dialog.notebook}</code><p className="dialog-note">Add the `.ipynb` file at this exact path, then click this project again.</p><button className="button button-primary dialog-action" type="button" onClick={() => setDialog(null)}>Understood <span>→</span></button></dialog>}
  </>;
}
