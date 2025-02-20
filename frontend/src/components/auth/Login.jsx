import React, { useState } from "react";
import { auth } from "../../utils/apiFunctions";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
  
    event.preventDefault();
  
    if (!email || !password) {
      toast({
        title: "Veuillez remplir tous les champs",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const result = await auth(email, password);

      if (result.status === 200) {
        toast({
          title: "Connexion réussie !!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        navigate("espace-eilco");
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast({
          title: `${data}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else if (error.request) {
        toast({
          title: "Network Error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 lg:px-4">
      <div className="w-full max-w-md sm:max-w-5xl min-h-[550px] bg-white shadow-none sm:shadow-lg sm:rounded-lg overflow-hidden flex flex-col lg:flex-row">
        
        <div
          className="hidden lg:block lg:w-3/5 bg-cover bg-center"
          style={{
            backgroundImage: "url('/universite-du-littoral-cote-d-opale-23.jpg')",
          }}
        ></div>

        <div className="w-full lg:w-2/5 p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src="/EILCO-LOGO.png"
              alt="EILCO Logo"
              className="h-12 sm:h-14 md:h-20 w-auto"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Se Connecter
          </h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm mb-6">
              <div>
                <input
                  type="checkbox"
                  id="showPassword"
                  className="mr-2"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword">Afficher le mot de passe</label>
              </div>
              <a href="#" className="text-blue-500 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-eilco-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={(e) => submitHandler(e)}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
