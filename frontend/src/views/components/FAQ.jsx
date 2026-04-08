// frontend/src/views/components/FAQ.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/FAQ.css';

const faqs = [
  {
    question: "What types of properties do you offer?",
    answer: "We offer commercial spaces for sale and rent, residential properties for sale and resale, and plotting/land options. Each category is carefully curated to meet diverse investment and living needs.",
  },
  {
    question: "How can I schedule a property visit?",
    answer: "You can schedule a property visit by contacting us through the contact form, calling our office directly, or clicking 'View Details' on any property listing. Our team will arrange a convenient time for you.",
  },
  {
    question: "What documents are required for property purchase?",
    answer: "Typically you'll need identity proof (Aadhar, PAN card), address proof, income proof, and bank statements. Our team will guide you through the complete documentation process.",
  },
  {
    question: "Do you provide home loan assistance?",
    answer: "Yes, we have partnerships with leading banks and financial institutions to help you secure home loans at competitive interest rates. Our team can assist throughout the application process.",
  },
  {
    question: "What is the RERA registration status of your projects?",
    answer: "All our ongoing projects are RERA registered. You can find the RERA number on each project listing, ensuring transparency and protecting your investment as per government regulations.",
  },
  {
    question: "Can I invest in under-construction properties?",
    answer: "Yes, we offer several under-construction projects with attractive payment plans. These often come at better prices and offer customization options. Check our Ongoing Projects section for current opportunities.",
  },
  {
    question: "What are the payment options available?",
    answer: "We offer flexible payment options including one-time payment, installment plans, and construction-linked payment plans. We accept bank transfers, cheques, and online payments.",
  },
  {
    question: "Do you offer property management services?",
    answer: "Yes, we provide comprehensive property management including tenant management, maintenance, rent collection, and legal compliance. Contact us for details about our management packages.",
  },
];

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const FAQItem = ({ faq, index, isOpen, onToggle, visible }) => {
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`faq-item${isOpen ? ' open' : ''}${visible ? ' visible' : ''}`}
      style={{ '--delay': `${index * 80}ms` }}
    >
      <button
        className="faq-question"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-btn-${index}`}
      >
        <span className="faq-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="question-text">{faq.question}</span>
        <span className="faq-icon" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className="faq-answer-wrap"
        style={{ height: `${height}px` }}
      >
        <div className="faq-answer-inner" ref={answerRef}>
          <p className="faq-answer-text">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  return (
    <section id="faq" className="faq-section" ref={sectionRef}>
      {/* Decorative background blobs */}
      <div className="faq-blob faq-blob--1" aria-hidden="true" />
      <div className="faq-blob faq-blob--2" aria-hidden="true" />

      <div className="faq-container">
        <div className={`faq-header${visible ? ' visible' : ''}`}>
          <span className="faq-eyebrow">Got Questions?</span>
          <h2 className="faq-title">Most Asked FAQs</h2>
          <p className="faq-subtitle">
            We're here to help you navigate every step. Find answers to the most
            common questions about our properties and services below.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={activeIndex === index}
              onToggle={handleToggle}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;