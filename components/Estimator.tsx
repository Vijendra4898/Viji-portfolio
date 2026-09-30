"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Gauge, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const projectTypes = ["SaaS", "AI App", "Dashboard", "E-commerce", "Business Website"];
const modules = [
  "AI integration",
  "Authentication",
  "Payments",
  "Admin dashboard",
  "Third-party APIs",
];

export default function Estimator() {
  const [type, setType] = useState("AI App");
  const [selected, setSelected] = useState<string[]>(["AI integration"]);

  const complexity = useMemo(() => {
    const score = selected.length + (type === "AI App" ? 2 : 1);
    if (score >= 5) return { label: "Complex", width: "92%" };
    if (score >= 3) return { label: "Advanced", width: "64%" };
    return { label: "Focused", width: "35%" };
  }, [selected, type]);

  const toggle = (item: string) => {
    setSelected((current) =>
      current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item]
    );
  };

  return (
    <section className="section-pad estimator-section" id="estimator">
      <div className="section-heading">
        <div>
          <span className="eyebrow"><Gauge size={14} /> BUILD ESTIMATOR</span>
          <h2>Shape the project<br /><em>before the first call.</em></h2>
        </div>
        <p>A lightweight scope tool that helps a potential client understand what their product may involve.</p>
      </div>

      <div className="estimator glass-panel">
        <div className="estimator-column">
          <span className="mini-label">01 / PRODUCT TYPE</span>
          <div className="type-grid">
            {projectTypes.map((item) => (
              <button
                key={item}
                onClick={() => setType(item)}
                className={type === item ? "type-button active" : "type-button"}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="estimator-column">
          <span className="mini-label">02 / MODULES</span>
          <div className="module-list">
            {modules.map((item) => (
              <button key={item} onClick={() => toggle(item)} className="module-item">
                <span className={selected.includes(item) ? "check active" : "check"}>
                  {selected.includes(item) && <Check size={13} />}
                </span>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="estimate-result">
          <span className="mini-label">SYSTEM COMPLEXITY</span>
          <motion.div
            key={complexity.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="complexity"
          >
            {complexity.label}
          </motion.div>
          <div className="meter"><motion.span animate={{ width: complexity.width }} /></div>
          <p><Sparkles size={15} /> {type} with {selected.length} selected module{selected.length !== 1 ? "s" : ""}.</p>
          <a href="mailto:patelvijendra55@gmail.com?subject=Project%20Inquiry&body=Hi%20Vijendra%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0AThanks" className="primary-button small">
            Discuss this build <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
