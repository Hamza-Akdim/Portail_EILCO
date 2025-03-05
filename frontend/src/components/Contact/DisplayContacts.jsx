import ContactSection from "./ContactSection";

/**
 * Affichage simple des contacts (Mode Lecture)
 */
function DisplayContacts({ data }) {
  return (
    <div className="space-y-4">
      <ContactSection
        title="Directeur"
        name={data.directeur.nom}
        email={data.directeur.email}
      />

      <ContactSection
        title="Secrétaire"
        name={data.secretaire.nom}
        email={data.secretaire.email}
      />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Enseignants</h2>
        <div className="space-y-3">
          {data.professeurs.map((prof, index) => (
            <ContactSection key={index} name={prof.nom} email={prof.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayContacts;
