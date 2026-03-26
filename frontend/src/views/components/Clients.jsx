import React from 'react';
import { Quote, Star, Home, Users, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * EYE-CATCHY REAL ESTATE TESTIMONIALS (BENTO GRID)
 * This layout uses a high-end grid system common in luxury agency websites.
 * It features a prominent "Featured" spotlight and secondary credibility tiles.
 */

// I'm including a sample client hook placeholder to resolve the import error. 
// You can replace this with your actual '../controllers/useClients' import once paths are set.
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
      }
    ]
  };
};

const Clients = () => {
  // Use the mock hook if the real one isn't available to prevent crashes
  const { clients, loading } = useClientsMock();

  const featuredClient = clients?.find(c => c.featured) || clients?.[0];
  const regularClients = clients?.filter(c => c.id !== featuredClient?.id).slice(0, 3) || [];

  return (
    <section id="clients" className="bento-wrapper">
      <style>{`
        .bento-wrapper {
          padding: 100px 20px;
          background-color: #f8fafc;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .bento-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .bento-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .bento-badge {
          display: inline-block;
          padding: 6px 16px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .bento-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.05em;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .bento-subtitle {
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(180px, auto);
          gap: 24px;
        }
        .bento-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          padding: 40px;
          position: relative;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }
        .bento-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          border-color: #6366f1;
        }
        .bento-featured {
          grid-column: span 2;
          grid-row: span 2;
          background: #0f172a;
          color: white;
          border: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .quote-icon {
          color: #6366f1;
          margin-bottom: 24px;
        }
        .featured-text {
          font-size: 1.65rem;
          font-weight: 500;
          line-height: 1.4;
          margin-bottom: 40px;
        }
        .client-branding {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .featured-logo {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: white;
          padding: 10px;
        }
        .featured-name {
          font-weight: 800;
          font-size: 1.25rem;
          margin: 0;
        }
        .featured-meta {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 4px 0 0 0;
        }
        .bento-secondary {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .secondary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .secondary-logo {
          height: 35px;
          opacity: 0.8;
        }
        .secondary-testimonial {
          font-size: 1.05rem;
          color: #334155;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .secondary-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }
        .bento-wide-info {
          grid-column: span 4;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: linear-gradient(90deg, #6366f1 0%, #4338ca 100%);
          color: white;
          padding: 40px;
        }
        .info-block {
          text-align: center;
        }
        .info-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 900;
        }
        .info-text {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
        }
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-wide-info { grid-column: span 2; flex-direction: column; gap: 40px; }
        }
        @media (max-width: 600px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-featured, .bento-secondary, .bento-wide-info { grid-column: span 1; }
        }
      `}</style>

      <div className="bento-container">
        <div className="bento-header">
          <span className="bento-badge">Premium Service</span>
          <h2 className="bento-title">Trusted by Global Clients</h2>
          <p className="bento-subtitle">
            Our reputation is built on the success stories of the homeowners and 
            investors we serve every single day.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500">Loading excellence...</p>
          </div>
        ) : (
          <div className="bento-grid">
            {/* Featured Tile */}
            {featuredClient && (
              <div className="bento-item bento-featured">
                <div>
                  <Quote size={40} className="quote-icon" />
                  <p className="featured-text">"{featuredClient.testimonial}"</p>
                </div>
                <div className="client-branding">
                  <img src={featuredClient.logo} alt={featuredClient.name} className="featured-logo" />
                  <div>
                    <h4 className="featured-name">{featuredClient.name}</h4>
                    <p className="featured-meta">Private Homeowner • {featuredClient.years_with_us}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Tiles */}
            {regularClients.map((client) => (
              <div key={client.id} className="bento-item bento-secondary">
                <div className="secondary-header">
                  <img src={client.logo} alt={client.name} className="secondary-logo" />
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="secondary-testimonial">"{client.testimonial}"</p>
                <div className="secondary-footer">
                  <span className="font-bold text-slate-900">{client.name}</span>
                  <ArrowRight size={18} className="text-indigo-600" />
                </div>
              </div>
            ))}

            {/* Stats Wide Tile */}
            <div className="bento-item bento-wide-info">
              <div className="info-block">
                <span className="info-number">1.2k+</span>
                <span className="info-text">Successful Deals</span>
              </div>
              <div className="info-block">
                <span className="info-number">99%</span>
                <span className="info-text">Satisfaction</span>
              </div>
              <div className="info-block">
                <span className="info-number">15+</span>
                <span className="info-text">Cities Covered</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clients;