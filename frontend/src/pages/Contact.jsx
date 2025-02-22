import React, { useState } from "react";
import EditContacts from "../components/Contact/EditContacts";
import DisplayContacts from "../components/Contact/DisplayContacts";
// -- Mock complet pour chaque niveau --
const contactsData = {
  "1ere_annee_prepa": {
    directeur: {
      nom: "Dr. Ali Ben Salah",
      email: "directeur.prepa1@ecole.com",
    },
    secretaire: {
      nom: "Mme. Salma Toumi",
      email: "secretariat.prepa1@ecole.com",
    },
    professeurs: [
      { nom: "Pr. Ahmed Khanfir", email: "ahmed.khanfir@ecole.com" },
      { nom: "Pr. Leila Dridi", email: "leila.dridi@ecole.com" },
    ],
  },
  "2ere_annee_prepa": {
    directeur: {
      nom: "Dr. Yassine Aloui",
      email: "directeur.prepa2@ecole.com",
    },
    secretaire: {
      nom: "Mme. Sana Krichen",
      email: "secretariat.prepa2@ecole.com",
    },
    professeurs: [
      { nom: "Pr. Nabil Mokaddem", email: "nabil.mokaddem@ecole.com" },
      { nom: "Pr. Samia Cherif", email: "samia.cherif@ecole.com" },
    ],
  },
  "1ere_annee_ing": {
    directeur: { nom: "Dr. Jean Dupont", email: "directeur.ing1@ecole.com" },
    secretaire: {
      nom: "Mme. Claire Martin",
      email: "secretariat.ing1@ecole.com",
    },
    professeurs: [
      { nom: "Pr. Sophie Bernard", email: "sophie.bernard@ecole.com" },
      { nom: "Pr. Marc Petit", email: "marc.petit@ecole.com" },
    ],
  },
  "2eme_annee_ing": {
    directeur: { nom: "Dr. Paul Leroy", email: "directeur.ing2@ecole.com" },
    secretaire: {
      nom: "Mme. Léa Fontaine",
      email: "secretariat.ing2@ecole.com",
    },
    professeurs: [
      { nom: "Pr. Eric Normand", email: "eric.normand@ecole.com" },
      { nom: "Pr. Julie Moreau", email: "julie.moreau@ecole.com" },
    ],
  },
  "3eme_annee_ing": {
    directeur: { nom: "Dr. Marie Laurent", email: "directeur.ing3@ecole.com" },
    secretaire: {
      nom: "Mme. Eva Roussel",
      email: "secretariat.ing3@ecole.com",
    },
    professeurs: [
      { nom: "Pr. Damien Michel", email: "damien.michel@ecole.com" },
      { nom: "Pr. Hélène Garcia", email: "helene.garcia@ecole.com" },
    ],
  },
};

// -- Pour la démonstration, on suppose que vous êtes admin --
const isAdmin = true;

/**
 * Composant principal de la page Contacts
 */
const ContactsPage = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Lors du clic sur "Modifier"
  const handleEditClick = () => {
    // On copie les données actuelles pour les éditer
    setEditData(contactsData[selectedLevel]);
    setIsEditing(true);
  };

  // Lors du clic sur "Enregistrer"
  const handleSave = () => {
    // On réinjecte les données modifiées dans l'objet global
    contactsData[selectedLevel] = editData;
    setIsEditing(false);
  };

  // Gestion du changement dans les champs d'édition
  const handleChange = (section, field, value, index = null) => {
    const newData = { ...editData };

    if (section === "professeurs" && index !== null) {
      newData.professeurs[index][field] = value;
    } else {
      newData[section][field] = value;
    }
    setEditData(newData);
  };

  // Récupère les données du niveau sélectionné
  const levelData = contactsData[selectedLevel];

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-eilco-blue mb-6">
        Contacts de l&apos;École
      </h1>

      {/* Sélecteur de niveau */}
      <select
        value={selectedLevel}
        onChange={(e) => {
          setSelectedLevel(e.target.value);
          setIsEditing(false); // On quitte le mode édition quand on change de niveau
        }}
        className="p-2 my-5 w-full max-w-xs border rounded-md border-gray-300">
        <option value="">Choisir un niveau</option>
        <option value="1ere_annee_prepa">1 ère Année Préparatoire</option>
        <option value="2ere_annee_prepa">2 éme Année Préparatoire</option>
        <option value="1ere_annee_ing">1 ère Année en Cycle Ingénieur</option>
        <option value="2eme_annee_ing">2 éme Année en Cycle Ingénieur</option>
        <option value="3eme_annee_ing">3 éme Année en Cycle Ingénieur</option>
      </select>

      {/* Affichage conditionnel selon le niveau sélectionné */}
      {selectedLevel && (
        <div className="space-y-6">
          {/* Si le niveau n'existe pas dans contactsData, on affiche un message */}
          {levelData ? (
            <>
              {/* Bouton Modifier (uniquement si admin et pas en édition) */}
              {isAdmin && !isEditing && (
                <button
                  onClick={handleEditClick}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Modifier les contacts
                </button>
              )}

              {/* Mode Lecture vs Mode Édition */}
              {!isEditing ? (
                // -- Mode Lecture --
                <DisplayContacts data={levelData} />
              ) : (
                // -- Mode Édition --
                <>
                  <EditContacts data={editData} handleChange={handleChange} />
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                      Annuler
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-red-500">
              Les contacts ne sont pas encore renseignés.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
