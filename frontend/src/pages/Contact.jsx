// ContactsPage.js
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getContacts, getUserDetails, updateContacts} from "../utils/apiFunctions.js";
import EditContacts from "../components/Contact/EditContacts";
import DisplayContacts from "../components/Contact/DisplayContacts";

const ContactsPage = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [contactData, setContactData] = useState(null);
    const [role, setRole] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails()
            .then((result) => {
                setRole(result.role);
            })
            .catch((err) =>
                console.log(`Error while fetching the user data : ${err}`)
            );
    }, []);

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

    const handleEdit = () => {
        setIsEditing(true);
        setError("");
        setSuccess("");
    };

    const handleSave = async () => {
        try {
            await updateContacts(selectedCity, selectedLevel, contactData);
            setSuccess("Contacts mis à jour avec succès!");
            setIsEditing(false);
            setError("");
        } catch (err) {
            setError("Erreur lors de la mise à jour des contacts. Veuillez réessayer.");
            console.error("Error saving contacts:", err);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError("");
        setSuccess("");
        // Reload the current contacts to discard changes
        if (selectedCity && selectedLevel) {
            getContacts(`/${selectedCity}/${selectedLevel}`)
                .then(setContactData)
                .catch(() => setContactData(null));
        }
    };

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Contacts de l'École</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}
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
                    {isEditing ? (
                        <EditContacts 
                            data={contactData} 
                            handleChange={(field, value) => {
                                setContactData(prev => ({
                                    ...prev,
                                    [field]: value
                                }));
                            }}
                        />
                    ) : (
                        <DisplayContacts data={contactData} />
                    )}
                    
                    {(role === "ADMIN" || role === "EDITEUR") && (
                        <div className="flex justify-end space-x-4 mt-4">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Modifier
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Enregistrer
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    >
                                        Annuler
                                    </button>
                                </>
                            )}
                        </div>
                    )}
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