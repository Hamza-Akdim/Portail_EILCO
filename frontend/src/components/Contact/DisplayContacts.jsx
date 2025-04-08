import ContactSection from "./ContactSection";

function DisplayContacts({ data }) {
    return (
        <div className="space-y-4">
            <ContactSection
                title="Directeur"
                name={data.contacts.find(c => c.role === 'DIRECTOR')?.name}
                email={data.contacts.find(c => c.role === 'DIRECTOR')?.email}
            />
            <ContactSection
                title="Secrétaire"
                name={data.contacts.find(c => c.role === 'SECRETARY')?.name}
                email={data.contacts.find(c => c.role === 'SECRETARY')?.email}
            />
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Enseignants</h2>
                <div className="space-y-3">
                    {data.contacts
                        .filter(c => c.role === 'PROFESSOR')
                        .map((prof, index) => (
                            <ContactSection
                                key={index}
                                name={prof.name}
                                email={prof.email}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default DisplayContacts;