// AddContactPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postContacts } from "../utils/apiFunctions";

const CITY_OPTIONS = [
    "Calais",
    "Longueness",
    "Dunkerque",
    "Boulogne sur Mer"
];

const ACADEMIC_LEVELS = {
    Calais: [
        "1ère Année Préparatoire",
        "2ème Année Préparatoire",
        "1ère Année en Cycle Ingénieur",
        "2ème Année en Cycle Ingénieur",
        "3ème Année en Cycle Ingénieur"
    ],
    default: [
        "1ère Année en Cycle Ingénieur",
        "2ème Année en Cycle Ingénieur",
        "3ème Année en Cycle Ingénieur"
    ]
};

const AddContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        city: "",
        academicLevel: "",
        contacts: [
            { role: "DIRECTOR", name: "", email: "" },
            { role: "SECRETARY", name: "", email: "" }
        ]
    });

    const getLevelOptions = () => {
        if (!formData.city) return [];
        return ["Calais", "Boulogne sur Mer"].includes(formData.city)
            ? ACADEMIC_LEVELS.Calais
            : ACADEMIC_LEVELS.default;
    };
    const handleAddProfessor = () => {
        setFormData({
            ...formData,
            contacts: [
                ...formData.contacts,
                { role: "PROFESSOR", name: "", email: "" }
            ]
        });
    };

    const handleInputChange = (index, field, value) => {
        const newContacts = [...formData.contacts];
        newContacts[index][field] = value;
        setFormData({ ...formData, contacts: newContacts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postContacts(formData);
            alert("Contacts ajoutés !");
            navigate("/espace-eilco");
        } catch (error) {
            alert("Erreur lors de l'ajout");
        }
    };

    return (
        <div className="p-5 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Ajouter des contacts</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ville */}
                <select
                    value={formData.city}
                    onChange={(e) => setFormData({
                        ...formData,
                        city: e.target.value,
                        academicLevel: ""
                    })}
                    className="p-2 border rounded w-full"
                    required
                >
                    <option value="">Choisir une ville</option>
                    {CITY_OPTIONS.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>

                {/* Niveau académique */}
                <select
                    value={formData.academicLevel}
                    onChange={(e) => setFormData({
                        ...formData,
                        academicLevel: e.target.value
                    })}
                    className="p-2 border rounded w-full"
                    disabled={!formData.city}
                    required
                >
                    <option value="">Choisir un niveau</option>
                    {getLevelOptions().map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>

                {/* Directeur */}
                <div className="p-4 bg-gray-50 rounded">
                    <h3 className="font-medium mb-2">Directeur</h3>
                    <input
                        type="text"
                        placeholder="Nom du directeur"
                        value={formData.contacts[0].name}
                        onChange={(e) => handleInputChange(0, "name", e.target.value)}
                        className="p-2 border rounded w-full mb-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email du directeur"
                        value={formData.contacts[0].email}
                        onChange={(e) => handleInputChange(0, "email", e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>

                {/* Secrétaire */}
                <div className="p-4 bg-gray-50 rounded">
                    <h3 className="font-medium mb-2">Secrétaire</h3>
                    <input
                        type="text"
                        placeholder="Nom du secrétaire"
                        value={formData.contacts[1].name}
                        onChange={(e) => handleInputChange(1, "name", e.target.value)}
                        className="p-2 border rounded w-full mb-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email du secrétaire"
                        value={formData.contacts[1].email}
                        onChange={(e) => handleInputChange(1, "email", e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>

                {/* Professeurs */}
                <div className="mt-6">
                    <h3 className="text-xl font-medium mb-4">Professeurs</h3>
                    {formData.contacts
                        .filter(c => c.role === "PROFESSOR")
                        .map((prof, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded mb-4">
                                <h4 className="font-medium mb-2">Professeur {index + 1}</h4>
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={prof.name}
                                    onChange={(e) => handleInputChange(
                                        formData.contacts.findIndex(c =>
                                            c.role === "PROFESSOR" && c.name === prof.name
                                        ),
                                        "name",
                                        e.target.value
                                    )}
                                    className="p-2 border rounded w-full mb-2"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={prof.email}
                                    onChange={(e) => handleInputChange(
                                        formData.contacts.findIndex(c =>
                                            c.role === "PROFESSOR" && c.email === prof.email
                                        ),
                                        "email",
                                        e.target.value
                                    )}
                                    className="p-2 border rounded w-full"
                                    required
                                />
                            </div>
                        ))}
                    <button
                        type="button"
                        onClick={handleAddProfessor}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Ajouter un professeur
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={!formData.city || !formData.academicLevel}
                >
                    Enregistrer
                </button>
            </form>
        </div>
    );
};

export default AddContactPage;