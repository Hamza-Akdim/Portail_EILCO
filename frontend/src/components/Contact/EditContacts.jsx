// EditContacts.js
import EditSection from "./EditSection";

function EditContacts({ data, handleChange }) {
    return (
        <div className="space-y-6">
            <EditSection
                title="Directeur"
                data={data.directeur}
                onChange={(field, value) =>
                    handleChange("directeur", field, value)
                }
            />

            <EditSection
                title="Secrétaire"
                data={data.secretaire}
                onChange={(field, value) =>
                    handleChange("secretaire", field, value)
                }
            />

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Enseignants</h2>
                <div className="space-y-4">
                    {data.professeurs.map((prof, index) => (
                        <EditSection
                            key={index}
                            data={prof}
                            onChange={(field, value) =>
                                handleChange("professeurs", field, value, index)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EditContacts;