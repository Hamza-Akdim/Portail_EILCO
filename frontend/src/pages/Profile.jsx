import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/NavBar";
import Avatar from "@mui/material/Avatar";
import { getUserDetails } from "../utils/apiFunctions";

const Profile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserDetails()
      .then((result) => {
        setFirstname(result.firstName);
        setLastname(result.lastName);
        setEmail(result.email);
      })
      .catch((err) =>
        console.log(`Error while fetchinf the user data : ${err}`)
      );
  }, [firstname, lastname, email]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">

        <div
          className="w-full h-56 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(../../public/universite-du-littoral-cote-d-opale-23.jpg)",
          }}
        >
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <Avatar
              sx={{
                width: 70,
                height: 70,
                border: "4px solid white",
                boxShadow: 2,
                fontSize: 24,
                fontWeight: "bold",
                bgcolor: "#374151",
              }}
            >
              {firstname?.slice(0, 2).toUpperCase()}
            </Avatar>

            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md text-center mt-20">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-gray-600">{email}</p>

          <div className="bg-gray-200 p-4 rounded-lg mt-6">
            <p className="text-black font-semibold">
              {firstname} {"n' a pas encore ajouté d informations"}
            </p>
            <p className="text-gray-600 text-sm">
              {"Le titre et la section à propos s' afficheront ici"}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
