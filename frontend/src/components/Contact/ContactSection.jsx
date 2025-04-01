// ContactSection.js
function ContactSection({ title, name, email }) {
    return (
        <div className="p-4 border rounded-lg border-gray-200 bg-white shadow-sm">
            {title && <h2 className="text-lg font-medium mb-2">{title}</h2>}
            <div className="space-y-1">
                <p className="text-gray-800">{name}</p>
                <a
                    href={`mailto:${email}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    {email}
                </a>
            </div>
        </div>
    );
}

export default ContactSection;