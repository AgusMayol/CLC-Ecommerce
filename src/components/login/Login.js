import React, { useState, Fragment } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase/firebaseConfig';

import {
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
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

                    <h1 className="font-bold text-3xl">Iniciar sesión</h1>



                    <div className='w-[350px] lg:w-[800px]'>
                        <label htmlFor="email-address" className="block text-md font-semibold leading-6 text-gray-900">
                            Correo electrónico
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="email"
                                name="email"
                                id="email-address"
                                required
                                className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Ej: example@email.com"
                                onChange={(e) => setEmail(e.target.value)}
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
                                name="password"
                                id="password"
                                required
                                className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Link to={`/admin/wip`}>
                            <span className="font-medium text-xs hover:text-blue-600">¿Olvidaste tu contraseña?</span>
                        </Link>
                    </div>

                    <button type="submit" onClick={onLogin} className="bg-blue-700 rounded-lg p-2 px-[110px] lg:px-[355px] font-bold text-white text-sm hover:bg-blue-800 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">Iniciar sesión</button>

                    <span className="font-medium text-xs">¿No tienes una cuenta?

                        <Link to={`/register`}>
                            <span className="font-bold ml-3 text-xs hover:text-blue-600">Crear cuenta</span>
                        </Link>
                    </span>
                </div>
            </form>
        </div >
    )
}

export default Login;