import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const UpdateProfile = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdate = () => {
    setNewName(newName);
    setNewEmail(newEmail);
    // Cookies.set("name", newName);
    // Cookies.set("email", newEmail);
  };
  return (
    <div className="mt-6">
          <Input 
            placeholder="Nouveau nom" 
            className="mt-2 p-2 w-full" 
            onChange={(e) => setNewName(e.target.value)} 
          />
          <Input 
            placeholder="Nouvel email" 
            className="mt-2 p-2 w-full" 
            onChange={(e) => setNewEmail(e.target.value)} 
          />
          <Button onClick={handleUpdate} className="mt-4 bg-blue-500 p-2 rounded-lg text-white w-full">
            Mettre à jour
          </Button>
        </div>
  )
}

export default UpdateProfile
