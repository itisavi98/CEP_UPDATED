// frontend/src/views/components/FAQ.jsx
import React, { useState } from 'react';
import '../../styles/FAQ.css';

const faqs = [
  { question: "What types of properties do you offer?", answer: "We offer commercial spaces for sale and rent, residential properties for sale and resale, and plotting/land options. Each category is carefully curated to meet diverse investment and living needs." },
  { question: "How can I schedule a property visit?", answer: "You can schedule a property visit by contacting us through the contact form, calling our office directly, or clicking 'View Details' on any property listing. Our team will arrange a convenient time for you." },
  { question: "What documents are required for property purchase?", answer: "Typically you'll need identity proof (Aadhar, PAN card), address proof, income proof, and bank statements. Our team will guide you through the complete documentation process." },
  { question: "Do you provide home loan assistance?", answer: "Yes, we have partnerships with leading banks and financial institutions to help you secure home loans at competitive interest rates. Our team can assist throughout the application process." },
  { question: "What is the RERA registration status of your projects?", answer: "All our ongoing projects are RERA registered. You can find the RERA number on each project listing, ensuring transparency and protecting your investment as per government regulations." },
  { question: "Can I invest in under-construction properties?", answer: "Yes, we offer several under-construction projects with attractive payment plans. These often come at better prices and offer customization options. Check our Ongoing Projects section for current opportunities." },
  { question: "What are the payment options available?", answer: "We offer flexible payment options including one-time payment, installment plans, and construction-linked payment plans. We accept bank transfers, cheques, and online payments." },
  { question: "Do you offer property management services?", answer: "Yes, we provide comprehensive property management including tenant management, maintenance, rent collection, and legal compliance. Contact us for details about our management packages." },
];

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
  </svg>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">

        <div className="faq-header">
          <h2 className="faq-title">Most asked FAQ's</h2>
          <p className="faq-subtitle">
            We're here to help you and solve doubts. Find answers to the most common questions below.
          </p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`faq-item${isOpen ? ' open' : ''}`}
                onClick={() => toggle(index)}
              >
                <div className="faq-question">
                  <span className="question-text">{faq.question}</span>
                  <div className={`faq-icon${isOpen ? ' open' : ''}`}>
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </div>
                <div className={`faq-answer-wrap${isOpen ? ' open' : ''}`}>
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;