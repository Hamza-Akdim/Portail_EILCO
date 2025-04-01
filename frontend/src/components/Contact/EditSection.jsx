function EditSection({ title, data, onChange }) {
    return (
        <div className="p-4 bg-gray-50 rounded-lg">
            {title && <h3 className="font-medium mb-3">{title}</h3>}
            <input
                type="text"
                value={data.nom || ""}
                onChange={(e) => onChange("nom", e.target.value)}
                placeholder="Nom"
                className="block w-full p-2 mb-2 border rounded-md border-gray-300"
            />
            <input
                type="email"
                value={data.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="Email"
                className="block w-full p-2 border rounded-md border-gray-300"
            />
        </div>
    );
}

export default EditSection;