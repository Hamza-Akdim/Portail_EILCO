import React, { useState } from "react";

const services = [
  {
    id: 1,
    titre: "Accueil des sites universitaires",
    description: [
      {
        campus: "Dunkerque",
        adresse: "220 Avenue de l'Université, 59140 Dunkerque",
        contact: "03 28 23 70 00",
        horaires: "08h30 - 17h30",
        email: "accueil.dk@univ-littoral.fr",
        details: "Accueil, orientation et information générale pour les visiteurs et étudiants."
      },
      {
        campus: "Calais",
        adresse: "50 Rue Ferdinand Buisson, 62100 Calais",
        contact: "03 21 46 36 00",
        horaires: "08h30 - 17h30",
        email: "accueil.calais@univ-littoral.fr",
        details: "Service d'accueil pour le campus de Calais, avec informations pratiques et orientation."
      },
      {
        campus: "Boulogne-sur-Mer",
        adresse: "21 Rue Saint-Louis, 62200 Boulogne-sur-Mer",
        contact: "03 21 99 41 00",
        horaires: "08h30 - 17h30",
        email: "accueil.bsm@univ-littoral.fr",
        details: "Accueil et orientation pour étudiants et visiteurs, assistance administrative et informations locales."
      },
      {
        campus: "Saint-Omer",
        adresse: "10 Rue du Lycée, 62500 Saint-Omer",
        contact: "03 21 38 87 00",
        horaires: "08h30 - 17h30",
        email: "accueil.so@univ-littoral.fr",
        details: "Service d'accueil dédié au campus de Saint-Omer, fournissant aide et renseignements."
      },
    ],
  },
  {
    id: 2,
    titre: "Bureau des Inscriptions Administratives (BIA)",
    description: [
      {
        campus: "Boulogne-sur-Mer",
        adresse: "21 Rue Saint-Louis, 62200 Boulogne-sur-Mer",
        contact: "03 66 25 64 00",
        horaires: "09h00 - 16h30",
        email: "suaiobg@univ-littoral.fr",
        details: "Gestion des inscriptions et administration des dossiers étudiants pour le campus de Boulogne-sur-Mer."
      },
      {
        campus: "Calais / Saint-Omer",
        adresse: "50 Rue Ferdinand Buisson, 62100 Calais",
        contact: "03 21 46 36 13",
        horaires: "09h00 - 16h30",
        email: "suaioc@univ-littoral.fr",
        details: "Service d'inscription et gestion administrative pour les campus de Calais et Saint-Omer."
      },
      {
        campus: "Dunkerque",
        adresse: "220 Avenue de l'Université, 59140 Dunkerque",
        contact: "03 28 23 75 50",
        horaires: "09h00 - 16h30",
        email: "suaiodk@univ-littoral.fr",
        details: "Inscriptions et suivi administratif dédié au campus de Dunkerque."
      },
    ],
  },
  {
    id: 3,
    titre: "Relations Internationales",
    description: [
      {
        role: "Contact général",
        email: "international@univ-littoral.fr",
        contact: "03 28 23 74 54",
        horaires: "09h00 - 17h00",
        details: "Coordination des échanges, partenariats internationaux et gestion des projets d'études à l'étranger."
      },
      {
        role: "Responsable des Relations Internationales",
        name: "Nicolas WALDHOFF",
        contact: "03 21 17 10 16 (Calais) / 03 21 38 85 15 (Saint-Omer)",
        email: "directionri@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Supervision et développement des programmes internationaux, échanges académiques et projets de recherche."
      },
      {
        role: "Partenariats et Mobilité",
        name: "Sabine CAUCHOIS",
        contact: "03 21 17 10 27 (Calais / Saint-Omer)",
        email: "sabine.cauchois@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Gestion des partenariats académiques, mobilité étudiante et programmes d'échanges internationaux."
      },
      {
        role: "Secrétariat",
        name: "Julie LEMAITRE",
        contact: "03 21 17 10 06 (Calais)",
        email: "secretariatri@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Support administratif et coordination des communications pour le service des relations internationales."
      },
    ],
  },
  {
    id: 4,
    titre: "Bibliothèque Universitaire (BULCO)",
    description: [
      {
        role: "Contact général",
        email: "bulco@univ-littoral.fr",
        horaires: "08h30 - 19h00",
        details: "Gestion des prêts, accès aux ressources numériques, et espaces de travail pour les étudiants."
      },
      {
        campus: "Boulogne-sur-Mer",
        adresse: "21 Rue Saint-Louis, 62200 Boulogne-sur-Mer",
        contact: "03 21 99 41 30",
        horaires: "08h30 - 19h00",
        details: "Bibliothèque du campus de Boulogne-sur-Mer avec un large choix de ressources."
      },
      {
        campus: "Calais",
        adresse: "50 Rue Ferdinand Buisson, 62100 Calais",
        contact: "03 21 46 36 80",
        horaires: "08h30 - 19h00",
        details: "Bibliothèque du campus de Calais proposant des espaces de consultation et de travail."
      },
      {
        campus: "Dunkerque",
        adresse: "220 Avenue de l'Université, 59140 Dunkerque",
        contact: "03 28 23 74 60",
        horaires: "08h30 - 19h00",
        details: "Bibliothèque du campus de Dunkerque, centre d'accès aux ressources académiques."
      },
      {
        campus: "Saint-Omer",
        adresse: "10 Rue du Lycée, 62500 Saint-Omer",
        contact: "03 21 38 87 82",
        horaires: "08h30 - 19h00",
        details: "Bibliothèque du campus de Saint-Omer offrant un environnement studieux et moderne."
      },
    ],
  },
  {
    id: 5,
    titre: "Vie Étudiante et Associations",
    description: [
      {
        role: "Bureau des Étudiants (BDE)",
        details: "Organise des événements et anime la vie étudiante sur tous les campus, facilitant la cohésion et l'intégration."
      },
      {
        role: "Clubs et Associations",
        clubs: [
          "EILTECH' - Club informatique et technologie",
          "EILCORIENTAL - Club de présentation de la culture orienta et nord africaine",
          "Eilco’taku - Club culture asiatique",
          "BDA - Bureau des arts",
          "Ch'tis Gamers - Club jeux vidéo",
          "D10Cassé - Club jeu de rôle"
        ],
        details: "Encourage la participation des étudiants à des activités culturelles, sportives et de loisirs."
      },
      {
        role: "Junior-Entreprise",
        name: "Opale Solutions",
        details: "Propose des prestations de services en ingénierie informatique et industrielle, accompagnant des projets réels et innovants."
      },
      {
        role: "Association des Anciens Élèves",
        name: "Les Opaliens Alumni",
        details: "Rassemble les anciens étudiants pour favoriser le réseautage, le mentorat et l'insertion professionnelle."
      },
    ],
  },
  {
    id: 6,
    titre: "Services Informatiques et Techniques",
    description: [
      {
        role: "Directeur du Service Commun Informatique et Technique",
        name: "Benoît BECQUET",
        contact: "03 21 17 10 04 (Calais) / 03 21 38 85 33 (Saint-Omer)",
        email: "directeurscit@eilco.univ-littoral.fr",
        horaires: "09h00 - 18h00",
        details: "Gestion de l'infrastructure informatique, maintenance des équipements et support technique pour étudiants et enseignants."
      },
      {
        role: "Support Informatique",
        email: "service-info@liste.univ-littoral.fr",
        horaires: "24/7",
        details: "Assistance technique pour les problèmes informatiques, dépannage et support logiciel."
      },
    ],
  },
  {
    id: 7,
    titre: "Alternance et Relations Entreprises",
    description: [
      {
        role: "Secrétariat de l’Alternance et des Relations Entreprises",
        name: "Martine LEHEUDRE",
        contact: "03 21 38 85 56 (Saint-Omer)",
        email: "secretariat-re@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Coordination des stages, contrats en alternance et suivi des relations avec les entreprises partenaires."
      },
      {
        role: "Responsable des Contrats de Professionnalisation",
        name: "Shahram BAHRAMI",
        contact: "03 21 38 85 65 (Saint-Omer)",
        email: "formationalternance@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Suivi, développement et contractualisation des formations en alternance et contrats de professionnalisation."
      },
      {
        role: "Chargé du Développement de l’Apprentissage",
        name: "Christophe DEZEURE",
        contact: "03 21 17 10 08 (Calais)",
        email: "apprentissage-fisea@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Développement des partenariats pour l'apprentissage, organisation de stages et accompagnement des étudiants."
      },
      {
        role: "Secrétaire Pédagogique de l’Apprentissage",
        name: "Anna LHERBIER",
        contact: "03 21 17 10 02 (Calais)",
        email: "anna.lherbier@eilco.univ-littoral.fr",
        horaires: "09h00 - 17h00",
        details: "Support administratif et coordination pédagogique pour les programmes d'apprentissage."
      },
    ],
  }
];

const ServicesPage = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const filteredServices = services
    .map((service) => ({
      ...service,
      description: service.description.filter(
        (desc) => !selectedCity || desc.campus === selectedCity || !desc.campus
      ),
    }))
    .filter((service) => service.description.length > 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Services et Informations utiles</h2>
      <select
        className="p-2 border border-gray-300 rounded mb-4"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Toutes les villes</option>
        <option value="Dunkerque">Dunkerque</option>
        <option value="Calais">Calais</option>
        <option value="Boulogne-sur-Mer">Boulogne-sur-Mer</option>
        <option value="Saint-Omer">Saint-Omer</option>
      </select>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {service.titre}
            </h2>
            <div className="space-y-3">
              {service.description.map((desc, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-md">
                  {desc.campus && (
                    <p className="text-lg font-medium">
                      {desc.campus}
                    </p>
                  )}
                  {desc.adresse && (
                    <p className="text-gray-600">
                      Adresse: {desc.adresse}
                    </p>
                  )}
                  {desc.contact && (
                    <p className="text-gray-600">
                      Contact: {desc.contact}
                    </p>
                  )}
                  {desc.email && (
                    <p className="text-gray-600">
                      Email:{" "}
                      <a
                        href={`mailto:${desc.email}`}
                        className="text-blue-600 underline"
                      >
                        {desc.email}
                      </a>
                    </p>
                  )}
                  {desc.horaires && (
                    <p className="text-gray-600">
                      Horaires: {desc.horaires}
                    </p>
                  )}
                  {desc.name && (
                    <p className="text-gray-700 font-medium">
                      {desc.name}
                    </p>
                  )}
                  {desc.role && (
                    <p className="text-gray-500">
                      {desc.role}
                    </p>
                  )}
                  {desc.details && (
                    <p className="text-gray-500">
                      {desc.details}
                    </p>
                  )}
                  {desc.clubs && (
                    <ul className="list-disc ml-5 text-gray-600">
                      {desc.clubs.map((club, i) => (
                        <li key={i}>{club}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
