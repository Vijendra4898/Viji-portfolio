"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Layers3,
  Menu,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import Scene from "./Scene";
import ProjectAssistant from "./ProjectAssistant";
import Estimator from "./Estimator";

const services: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    number: "01",
    title: "AI Web Applications",
    description: "AI workflows, assistants, API integrations and polished streaming experiences.",
    icon: BrainCircuit,
  },
  {
    number: "02",
    title: "SaaS & Dashboards",
    description: "Scalable product interfaces, dashboards, reusable components and data-heavy UX.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Premium Websites",
    description: "Fast, responsive marketing experiences with motion, visual systems and conversion-focused UX.",
    icon: Rocket,
  },
];

const projects = [
  {
    index: "01",
    category: "TRAVEL / E-COMMERCE",
    title: "Cordelia Cruises",
    description: "High-throughput B2C booking and e-commerce experience with complex booking funnels, payment reconciliation and automated E2E testing.",
    tags: ["Next.js", "Node.js", "TypeScript", "GraphQL"],
    accent: "violet",
  },
  {
    index: "02",
    category: "HEALTHCARE / ENTERPRISE",
    title: "Centerwell",
    description: "Accessible, performance-focused healthcare platform built with Next.js SSR, WCAG standards and backend microservice integrations.",
    tags: ["Next.js", "React", "WCAG", "Microservices"],
    accent: "cyan",
  },
  {
    index: "03",
    category: "B2B / NETWORK",
    title: "Spectrum Enterprise",
    description: "Scalable B2B network portal with adaptive dashboards, state-management pipelines and complex real-time enterprise data.",
    tags: ["React.js", "Redux", "TypeScript", "Docker"],
    accent: "pink",
  },
];

const process = [
  ["01", "DISCOVER", "Understand the business, users, goals and technical constraints."],
  ["02", "DESIGN", "Turn the idea into a visual system and intuitive product experience."],
  ["03", "BUILD", "Develop the system with reusable components and production-ready architecture."],
  ["04", "SHIP", "Polish, test, optimize and deploy the experience for real users."],
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  const navItems = ["Portfolio", "Services", "Assistant", "Process", "Contact"];

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <nav className="navbar">
        <a href="#top" className="brand">
          <span className="brand-mark">V</span>
          <span>VIJENDRA<span className="brand-dim">.DEV</span></span>
        </a>

        <div className={menuOpen ? "nav-links mobile-open" : "nav-links"}>
          {navItems.map((item) => (
            <a key={item} href={item === "Portfolio" ? "#portfolio" : `#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <a className="resume-link" href="/Vijendra_Patel_Lead.pdf" download>
            RESUME <ArrowDown size={13} />
          </a>
          <a className="nav-cta" href="mailto:patelvijendra55@gmail.com?subject=Project%20Inquiry">LET&apos;S TALK <ArrowUpRight size={14} /></a>
        </div>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-noise" />
        <motion.div className="hero-content" style={{ y: heroY }}>
          <motion.div
            className="availability"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="pulse" /> AVAILABLE FOR SELECT PROJECTS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            BUILD DIGITAL
            <span>EXPERIENCES</span>
            <strong>THAT FEEL ALIVE.</strong>
          </motion.h1>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            I build premium AI products, SaaS platforms and futuristic web experiences
            where engineering meets visual storytelling.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a className="primary-button" href="#portfolio">VIEW MY PORTFOLIO <ArrowRight size={17} /></a>
            <a className="secondary-button" href="/Vijendra_Patel_Lead.pdf" download>DOWNLOAD RESUME <ArrowDown size={16} /></a>
          </motion.div>

          <div className="hero-meta">
            <span><Code2 size={14} /> NEXT.JS / REACT</span>
            <span><BrainCircuit size={14} /> AI SYSTEMS</span>
            <span><Sparkles size={14} /> MOTION UI</span>
          </div>
        </motion.div>

        <Scene />

        <a href="#portfolio" className="scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} />
        </a>
      </section>

      <section className="ticker">
        {["NEXT.JS", "REACT", "AI", "THREE.JS", "TYPESCRIPT", "FRAMER MOTION", "SAAS", "NEXT.JS"].map((item, i) => (
          <span key={`${item}-${i}`}>{item}<b>✦</b></span>
        ))}
      </section>

      <section className="section-pad" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CAPABILITIES / 01</span>
            <h2>Not just websites.<br /><em>Digital systems.</em></h2>
          </div>
          <p>From the first interaction to the final API call, every layer is designed to feel intentional, fast and memorable.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <motion.article
                key={service.number}
                className="service-card"
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="service-top"><span>{service.number}</span><ServiceIcon size={24} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="card-arrow"><ArrowUpRight size={18} /></span>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section-pad work-section" id="portfolio">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SELECTED WORK / 02</span>
            <h2>Enterprise work.<br /><em>Real systems.</em></h2>
          </div>
          <p>Selected enterprise projects from my professional experience, presented as focused case studies so clients can quickly understand the systems I build.</p>
        </div>

        <div className="projects">
          {projects.map((project, index) => (
            <motion.article
              className={`project-card ${project.accent}`}
              key={project.index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.12 }}
              whileHover={{ scale: 0.99 }}
            >
              <div className="project-visual">
                <div className="project-grid" />
                <div className="project-orb" />
                <div className="project-lines" />
                <span className="project-number">{project.index}</span>
                <span className="project-open"><ArrowUpRight size={20} /></span>
              </div>
              <div className="project-info">
                <span className="mini-label">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="resume-section section-pad" id="resume">
        <div className="resume-card glass-panel">
          <div>
            <span className="eyebrow"><ShieldCheck size={14} /> PROFILE / RESUME</span>
            <h2>Lead Software Engineer<br /><em>AI & Frontend Architecture.</em></h2>
            <p>8+ years across React.js, Next.js, TypeScript, enterprise SaaS, performance engineering and AI workflows.</p>
            <div className="resume-pills">
              <span>React.js</span><span>Next.js</span><span>TypeScript</span><span>AI Systems</span><span>Web Performance</span>
            </div>
          </div>
          <a className="primary-button" href="/Vijendra_Patel_Lead.pdf" download>
            DOWNLOAD FULL RESUME <ArrowDown size={17} />
          </a>
        </div>
      </section>

      <ProjectAssistant />

      <section className="section-pad process-section" id="process">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE PROCESS / 04</span>
            <h2>Simple process.<br /><em>Serious execution.</em></h2>
          </div>
        </div>

        <div className="process-list">
          {process.map(([num, title, text], index) => (
            <motion.div
              className="process-row"
              key={num}
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <CheckCircle2 size={18} />
            </motion.div>
          ))}
        </div>
      </section>

      <Estimator />

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="contact-inner">
          <span className="eyebrow"><ShieldCheck size={14} /> FINAL TRANSMISSION</span>
          <h2>Have an idea worth<br /><em>building?</em></h2>
          <p>Tell me what you&apos;re trying to build. I&apos;ll help turn the rough idea into a clear digital product.</p>
          <a className="primary-button huge" href="mailto:patelvijendra55@gmail.com?">
            LET&apos;S BUILD SOMETHING <ArrowUpRight size={20} />
          </a>
          <div className="contact-email">patelvijendra55@gmail.com</div>
        </div>
      </section>

      <footer>
        <div>© {new Date().getFullYear()} VIJENDRA.DEV</div>
        
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
