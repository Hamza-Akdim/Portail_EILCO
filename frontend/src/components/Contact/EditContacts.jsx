// EditContacts.js
import EditSection from "./EditSection";
import { postContacts } from "../../utils/apiFunctions";

function EditContacts({ data, handleChange }) {
    const handleSave = async () => {
        try {
            await postContacts(data);
            // TODO: Show success message
        } catch (error) {
            console.error("Error saving contacts:", error);
            // TODO: Show error message
        }
    };

    return (
        <div className="space-y-6">
            <EditSection
                title="Directeur"
                data={data.contacts.find(c => c.role === 'DIRECTOR')}
                onChange={(field, value) => {
                    const updatedContacts = data.contacts.map(contact => {
                        if (contact.role === 'DIRECTOR') {
                            return { ...contact, [field]: value };
                        }
                        return contact;
                    });
                    handleChange('contacts', updatedContacts);
                }}
            />

            <EditSection
                title="Secrétaire"
                data={data.contacts.find(c => c.role === 'SECRETARY')}
                onChange={(field, value) => {
                    const updatedContacts = data.contacts.map(contact => {
                        if (contact.role === 'SECRETARY') {
                            return { ...contact, [field]: value };
                        }
                        return contact;
                    });
                    handleChange('contacts', updatedContacts);
                }}
            />

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Enseignants</h2>
                <div className="space-y-4">
                    {data.contacts
                        .filter(c => c.role === 'PROFESSOR')
                        .map((prof, index) => (
                            <EditSection
                                key={index}
                                data={prof}
                                onChange={(field, value) => {
                                    const updatedContacts = data.contacts.map(contact => {
                                        if (contact.role === 'PROFESSOR' && contact === prof) {
                                            return { ...contact, [field]: value };
                                        }
                                        return contact;
                                    });
                                    handleChange('contacts', updatedContacts);
                                }}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default EditContacts;