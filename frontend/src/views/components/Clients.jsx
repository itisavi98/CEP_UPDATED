import React from 'react';
import { Quote, Star, ArrowRight } from 'lucide-react';
import '../../styles/Clients.css';

// Replace with your actual import: import { useClients } from '../controllers/useClients';
const useClientsMock = () => {
  return {
    loading: false,
    clients: [
      {
        id: 1,
        name: "The Sterling Family",
        testimonial: "Our transition to the waterfront property was seamless. The attention to detail and market insight provided by the team was simply world-class. We couldn't be happier with our new home.",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=SF",
        years_with_us: "2024",
        featured: true
      },
      {
        id: 2,
        name: "Azure Holdings",
        testimonial: "Exceptional commercial portfolio management. They secured our flagship office space 10% under budget.",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=AH",
        years_with_us: "3 years"
      },
      {
        id: 3,
        name: "Marcus & Elena",
        testimonial: "Sold our penthouse in record time. The digital marketing strategy was breathtaking.",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=ME",
        years_with_us: "2023"
      },
      {
        id: 4,
        name: "Dr. Julian Vance",
        testimonial: "Professionalism at its finest. They understood my specific needs for a quiet, suburban retreat.",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=JV",
        years_with_us: "5 years"
      },
      {
        id: 5,
        name: "The Kapoor Group",
        testimonial: "A truly five-star experience from search to close. They found us the perfect investment property.",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=KG",
        years_with_us: "2022"
      },
      {
        id: 6,
        name: "Priya & Rohan",
        testimonial: "Guided us through every step of buying our first home. Patient, knowledgeable, and genuinely caring.",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=PR",
        years_with_us: "2023"
      },
    ]
  };
};

// ── Marquee Card Component ────────────────────────────────────────────────────
const MarqueeCard = ({ client }) => (
  <div className="marquee-card">
    <div className="marquee-card-header">
      <img
        className="marquee-avatar"
        src={client.logo}
        alt={client.name}
        onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`; }}
      />
      <div className="marquee-card-meta">
        <p className="marquee-card-name">{client.name}</p>
        <span className="marquee-card-year">{client.years_with_us}</span>
      </div>
      <div className="marquee-stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={11} className="star-filled" />
        ))}
      </div>
    </div>
    <p className="marquee-card-text">"{client.testimonial}"</p>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Clients = () => {
  const { clients, loading } = useClientsMock();

  const featuredClient = clients?.find(c => c.featured) || clients?.[0];
  const regularClients = clients?.filter(c => c.id !== featuredClient?.id).slice(0, 3) || [];

  // Duplicate for seamless marquee loop
  const marqueeClients = [...clients, ...clients];

  return (
    <section id="clients" className="bento-clients-section">
      <div className="bento-container">

        {/* ── Header ── */}
        <div className="bento-header">
          <span className="bento-badge">Premium Service</span>
          <h2 className="bento-title">What our clients say</h2>
          <p className="bento-subtitle">
            Our reputation is built on the success stories of the homeowners and
            investors we serve every single day.
          </p>
        </div>

        {loading ? (
          <div className="bento-loader-container">
            <div className="bento-spinner" />
            <p>Loading excellence...</p>
          </div>
        ) : (
          <>
            {/* ── Marquee Section ── */}
            <div className="marquee-section">

              {/* Row 1 — left to right */}
              <div className="marquee-row">
                <div className="marquee-fade marquee-fade-left" />
                <div className="marquee-track">
                  {marqueeClients.map((client, i) => (
                    <MarqueeCard key={`row1-${i}`} client={client} />
                  ))}
                </div>
                <div className="marquee-fade marquee-fade-right" />
              </div>

              {/* Row 2 — right to left */}
              <div className="marquee-row">
                <div className="marquee-fade marquee-fade-left" />
                <div className="marquee-track marquee-track-reverse">
                  {marqueeClients.map((client, i) => (
                    <MarqueeCard key={`row2-${i}`} client={client} />
                  ))}
                </div>
                <div className="marquee-fade marquee-fade-right" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Clients;