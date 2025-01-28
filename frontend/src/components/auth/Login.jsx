import React, { useState } from 'react'
import { auth } from '../../utils/apiFunctions'
import { useToast } from '@chakra-ui/react'

const Login = () => {

  const [email, setEmail] = useState()
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState()
 
  const toast = useToast();



  const submitHandler = async()=>{

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
      const result = await auth(email,password)
      
      if(result){
				toast({
          title: "Connexion réussie!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      
    } catch (error) {
      if (error.response) {

        const { data } = error.response;
        toast({
          title: `Error: ${data}`,
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
    }
    
  

  return (
    <div className="bg-login-bg sm:bg-white w-screen h-screen flex justify-center items-center">
      <div className="bg-login-bg py-10 mx-auto h-full min-h-fit min-w-fit my-auto max-h-[500px] sm:w-[38%] sm:h-[85%] md:max-w-[1240px] md:max-h-[1000px] md grid grid-rows-[2fr 1fr 1fr 2fr] gap-2 sm:shadow-login-sh sm:border sm:border-gray-500 sm:rounded-lg">
          <div className='row-span-2 flex justify-center items-center mb-5'>
            <img
            className='w-[220px] sm:w-[230px] md:w-[250px] 2xl:w-[400px] mx-auto'
            src="EILCO-LOGO.png" 
            alt="/" 
            />
          </div>
          <div className='flex gap-1 flex-col w-full px-16 my-4'>
              <div className= 'text-sm sm:texte-base 2xl:text-4xl'>Email</div>
              <input 
                className='p-[6px] 2xl:py-4 text-sm xl:text-base 2xl:text-3xl w-full border border-black rounded-md text-black' 
                placeholder="Enter your Email" 
                onChange={(e) => setEmail(e.target.value)}
    
                />
    
          </div>

          <div className='flex gap-1 flex-col w-full px-16 my-4'>
            <div className= 'text-sm sm:texte-base 2xl:text-4xl'>Password</div>
            <div className='flex justify-between items-center gap-2'>

              <input
                className='p-[6px] 2xl:py-4 text-sm xl:text-base 2xl:text-3xl w-full border border-black rounded-md text-black'
                type={show ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                />
                

                <button
                className='text-xs 2xl:text-xl p-[6px] border border-gray-500 rounded'
                onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </button>
            </div>
          </div>

          <div className='flex justify-center items-center px-16'>
            <button
              className="p-[6px] 2xl:py-4 2xl:text-4xl text-sm xl:text-base w-full text-white bg-eilco-blue border-2 border-eilco-blue rounded-md font-semibold"
              onClick={submitHandler}
            >
              Login
            </button>
          </div>

      </div>
    </div>
  )
}

export default Login
