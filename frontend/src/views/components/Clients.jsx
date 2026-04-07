import React from 'react';
import { Quote, Star, ArrowRight } from 'lucide-react';
import '../../styles/Clients.css';
import { useClients } from '../../controllers/useClients';
// ── Marquee Card Component ────────────────────────────────────────────────────
const MarqueeCard = ({ client }) => (
  <div className="marquee-card">
    <div className="marquee-card-header">
      <img
        className="marquee-avatar"
        src={client.logo || null}
        alt={client.name}
        onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`; }}
      />
      <div className="marquee-card-meta">
        <p className="marquee-card-name">{client.name}</p>
        <span className="marquee-card-year">{client.years_with_us}</span>
      </div>
      <div className="marquee-stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={11}
            className={i < (client.rating || 5) ? "star-filled" : "star-empty"}
          />
        ))}
      </div>
    </div>
    <p className="marquee-card-text">"{client.testimonial}"</p>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Clients = () => {
  const { clients, loading } = useClients();

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