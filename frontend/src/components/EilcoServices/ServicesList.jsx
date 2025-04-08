const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <h3>{service.titre}</h3>
      <div className="service-details">
        {service.description.map((detail, index) => (
          <div key={index} className="detail-item">
            {detail.campus && (
              <>
                <h4>{detail.campus}</h4>
                <p><strong>Adresse :</strong> {detail.adresse}</p>
                <p><strong>Contact :</strong> {detail.contact}</p>
                <p><strong>Horaires :</strong> {detail.horaires}</p>
                <p><strong>Email :</strong> {detail.email}</p>
                <p><strong>Détails :</strong> {detail.details}</p>
              </>
            )}
            {detail.role && (
              <>
                <h4>{detail.role}</h4>
                {detail.name && <p><strong>Nom :</strong> {detail.name}</p>}
                {detail.contact && <p><strong>Contact :</strong> {detail.contact}</p>}
                {detail.email && <p><strong>Email :</strong> {detail.email}</p>}
                {detail.horaires && <p><strong>Horaires :</strong> {detail.horaires}</p>}
                {detail.details && <p><strong>Détails :</strong> {detail.details}</p>}
                {detail.clubs && (
                  <div className="clubs-list">
                    <strong>Clubs :</strong>
                    <ul>
                      {detail.clubs.map((club, clubIndex) => (
                        <li key={clubIndex}>{club}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ServicesList = ({ services }) => {
  return (
    <div className="services-list">
      <h2>Services de l'EILCO</h2>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}; 