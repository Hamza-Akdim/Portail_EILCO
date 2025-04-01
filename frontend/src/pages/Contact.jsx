// ContactsPage.js
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getContacts} from "../utils/apiFunctions.js";
import EditContacts from "../components/Contact/EditContacts";
import DisplayContacts from "../components/Contact/DisplayContacts";

// const contactsData = {
//   "Calais": {
//     "1ère Année Préparatoire": {
//       directeur: { nom: "Dr. Ali Ben Salah", email: "prepa1.calais@ecole.com" },
//       secretaire: { nom: "Mme. Salma Toumi", email: "secretariat.prepa1.calais@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Ahmed Khanfir", email: "ahmed.khanfir@ecole.com" },
//         { nom: "Pr. Leila Dridi", email: "leila.dridi@ecole.com" }
//       ]
//     },
//     "2ème Année Préparatoire": {
//       directeur: { nom: "Dr. Yassine Aloui", email: "prepa2.calais@ecole.com" },
//       secretaire: { nom: "Mme. Sana Krichen", email: "secretariat.prepa2.calais@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Nabil Mokaddem", email: "nabil.mokaddem@ecole.com" },
//         { nom: "Pr. Samia Cherif", email: "samia.cherif@ecole.com" }
//       ]
//     },
//     "1ère Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Jean Dupont", email: "ing1.calais@ecole.com" },
//       secretaire: { nom: "Mme. Claire Martin", email: "secretariat.ing1.calais@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Sophie Bernard", email: "sophie.bernard@ecole.com" },
//         { nom: "Pr. Marc Petit", email: "marc.petit@ecole.com" }
//       ]
//     },
//     "2ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Paul Leroy", email: "ing2.calais@ecole.com" },
//       secretaire: { nom: "Mme. Léa Fontaine", email: "secretariat.ing2.calais@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Eric Normand", email: "eric.normand@ecole.com" },
//         { nom: "Pr. Julie Moreau", email: "julie.moreau@ecole.com" }
//       ]
//     },
//     "3ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Marie Laurent", email: "ing3.calais@ecole.com" },
//       secretaire: { nom: "Mme. Eva Roussel", email: "secretariat.ing3.calais@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Damien Michel", email: "damien.michel@ecole.com" },
//         { nom: "Pr. Hélène Garcia", email: "helene.garcia@ecole.com" }
//       ]
//     }
//   },
//   "Longueness": {
//     "1ère Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Luc Dubois", email: "ing1.longueness@ecole.com" },
//       secretaire: { nom: "Mme. Anne Lefèvre", email: "secretariat.ing1.longueness@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Jean-Marc Dupont", email: "jean-marc.dupont@ecole.com" },
//         { nom: "Pr. Isabelle Martin", email: "isabelle.martin@ecole.com" }
//       ]
//     },
//     "2ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. François Moreau", email: "ing2.longueness@ecole.com" },
//       secretaire: { nom: "Mme. Sophie Girard", email: "secretariat.ing2.longueness@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Pierre Durand", email: "pierre.durand@ecole.com" },
//         { nom: "Pr. Marie Dubois", email: "marie.dubois@ecole.com" }
//       ]
//     },
//     "3ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Caroline Lemoine", email: "ing3.longueness@ecole.com" },
//       secretaire: { nom: "Mme. Élodie Rousseau", email: "secretariat.ing3.longueness@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Christophe Moreau", email: "christophe.moreau@ecole.com" },
//         { nom: "Pr. Laurence Dubois", email: "laurence.dubois@ecole.com" }
//       ]
//     }
//   },
//   "Dunkerque": {
//     "1ère Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Philippe Dubois", email: "ing1.dunkerque@ecole.com" },
//       secretaire: { nom: "Mme. Valérie Lefèvre", email: "secretariat.ing1.dunkerque@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Laurent Martin", email: "laurent.martin@ecole.com" },
//         { nom: "Pr. Nathalie Dubois", email: "nathalie.dubois@ecole.com" }
//       ]
//     },
//     "2ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Sébastien Moreau", email: "ing2.dunkerque@ecole.com" },
//       secretaire: { nom: "Mme. Céline Girard", email: "secretariat.ing2.dunkerque@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Olivier Durand", email: "olivier.durand@ecole.com" },
//         { nom: "Pr. Sophie Martin", email: "sophie.martin@ecole.com" }
//       ]
//     },
//     "3ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Isabelle Petit", email: "ing3.dunkerque@ecole.com" },
//       secretaire: { nom: "Mme. Anne-Sophie Rousseau", email: "secretariat.ing3.dunkerque@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Jean-Philippe Dubois", email: "jean-philippe.dubois@ecole.com" },
//         { nom: "Pr. Émilie Lefèvre", email: "emilie.lefevre@ecole.com" }
//       ]
//     }
//   },
//   "Boulogne sur Mer": {
//     "1ère Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Nicolas Girard", email: "ing1.boulogne@ecole.com" },
//       secretaire: { nom: "Mme. Laetitia Dubois", email: "secretariat.ing1.boulogne@ecole.com" },
//       professeurs: [
//         { nom: "Pr. David Martin", email: "david.martin@ecole.com" },
//         { nom: "Pr. Audrey Lefèvre", email: "audrey.lefevre@ecole.com" }
//       ]
//     },
//     "2ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Céline Moreau", email: "ing2.boulogne@ecole.com" },
//       secretaire: { nom: "Mme. Stéphanie Durand", email: "secretariat.ing2.boulogne@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Guillaume Dubois", email: "guillaume.dubois@ecole.com" },
//         { nom: "Pr. Marie-Laure Martin", email: "marie-laure.martin@ecole.com" }
//       ]
//     },
//     "3ème Année en Cycle Ingénieur": {
//       directeur: { nom: "Dr. Julien Lefèvre", email: "ing3.boulogne@ecole.com" },
//       secretaire: { nom: "Mme. Mélanie Rousseau", email: "secretariat.ing3.boulogne@ecole.com" },
//       professeurs: [
//         { nom: "Pr. Thomas Moreau", email: "thomas.moreau@ecole.com" },
//         { nom: "Pr. Sandrine Girard", email: "sandrine.girard@ecole.com" }
//       ]
//     }
//   }
// };


const ContactsPage = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [contactData, setContactData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getContacts("/cities")
            .then(setCities)
            .catch(() => setCities([]));
    }, []);

    useEffect(() => {
        if (selectedCity) {
            getContacts(`/${selectedCity}/levels`)
                .then(setLevels)
                .catch(() => setLevels([]));
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedCity && selectedLevel) {
            getContacts(`/${selectedCity}/${selectedLevel}`)
                .then(setContactData)
                .catch(() => setContactData(null));
        }
    }, [selectedCity, selectedLevel]);

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Contacts de l'École</h1>
            <div className="flex justify-between items-center flex-wrap">
                {/* Sélecteur de ville */}
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="p-2 my-5 w-full max-w-xs border rounded-md border-gray-300"
                >
                    <option value="">Choisir une ville</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                {/* Sélecteur de niveau */}
                {selectedCity && (
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="p-2 my-5 w-full max-w-xs border rounded-md border-gray-300"
                    >
                        <option value="">Choisir un niveau</option>
                        {levels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {contactData && (
                <div className="mt-6 space-y-4">
                    <div className="p-4 border rounded-lg border-gray-200 bg-white shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Directeur</h2>
                        <p className="text-gray-800">{contactData.contacts.find(c => c.role === 'DIRECTOR')?.name}</p>
                        <a href={`mailto:${contactData.contacts.find(c => c.role === 'DIRECTOR')?.email}`}
                           className="text-blue-600 underline">
                            {contactData.contacts.find(c => c.role === 'DIRECTOR')?.email}
                        </a>
                    </div>

                    <div className="p-4 border rounded-lg border-gray-200 bg-white shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Secrétaire</h2>
                        <p className="text-gray-800">{contactData.contacts.find(c => c.role === 'SECRETARY')?.name}</p>
                        <a href={`mailto:${contactData.contacts.find(c => c.role === 'SECRETARY')?.email}`}
                           className="text-blue-600 underline">
                            {contactData.contacts.find(c => c.role === 'SECRETARY')?.email}
                        </a>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Enseignants</h2>
                        {contactData.contacts
                            .filter(c => c.role === 'PROFESSOR')
                            .map((prof, index) => (
                                <div key={index}
                                     className="p-4 border rounded-lg border-gray-200 bg-white shadow-sm mb-3">
                                    <p className="text-gray-800">{prof.name}</p>
                                    <a href={`mailto:${prof.email}`} className="text-blue-600 underline">
                                        {prof.email}
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};
/* ToDo List
* 1- au Cas ou il n y a aucun contact affiche que les contactes ne sonts pas encore renseigner
* 2- Amelioration de design
* 3- Weather en francais
* 4- Photo du login page To do List
* 5-chercher rapidement les vrai contacts
* 6- Ameliorez design du
* */
export default ContactsPage;