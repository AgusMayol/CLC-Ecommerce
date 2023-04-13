import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseConfig';

import {
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";


const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });


    }

    return (

        <div className="bg-gray-100 mt-[75px] p-8 px-12">

            <div className='w-[32px]'>
                <Link to={`/`}>
                    <ArrowLeftCircleIcon className='h-8 w-8 text-neutral-600 ml-1 mb-2 mt-2 w-auto' />
                </Link>
            </div>

            <form>

                <div className="mt-4 flex flex-col justify-center items-center gap-12">

                    <h1 className="font-bold text-3xl">Crear un usuario</h1>



                    <div className='w-[350px] lg:w-[800px]'>
                        <label htmlFor="email-address" className="block text-md font-semibold leading-6 text-gray-900">
                            Correo electrónico
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Ej: example@email.com"
                            />
                        </div>
                    </div>

                    <div className='w-[350px] lg:w-[800px]'>
                        <label htmlFor="password" className="block text-md font-semibold leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <button type="submit"
                        onClick={onSubmit} className="bg-blue-700 rounded-lg p-2 px-[110px] lg:px-[355px] font-bold text-white text-sm hover:bg-blue-800 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">Registrarse</button>

                    <span className="font-medium text-xs">¿Ya tienes una cuenta?

                        <Link to={`/login`}>
                            <span className="font-bold ml-3 text-xs hover:text-blue-600">Iniciar sesión</span>
                        </Link>
                    </span>
                </div>
            </form>
        </div >
    )
}

export default Register;