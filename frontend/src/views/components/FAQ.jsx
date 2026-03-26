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

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
      stroke="#1D293D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">

        <div className="faq-header">
          <p className="faq-label">FAQ's</p>
          <h2 className="faq-title">Looking for answer?</h2>
          <p className="faq-subtitle">
            Find answers to common questions about our properties and services. Can't find what you're looking for? Feel free to contact us.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="faq-item" onClick={() => toggle(index)}>
                <div className="faq-question">
                  <h3 className="question-text">{faq.question}</h3>
                  <span className={`faq-chevron${isOpen ? ' open' : ''}`}>
                    <ChevronIcon />
                  </span>
                </div>
                <div className={`faq-answer-wrap${isOpen ? ' open' : ''}`}>
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-footer">
          <p>Still have questions?</p>
          <a href="#contact" className="contact-link">Contact Us →</a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;