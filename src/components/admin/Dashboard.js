import React, { useState, Fragment, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RadioGroup, Menu, Transition } from '@headlessui/react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../services/firebase/firebaseConfig';
import { useNotification } from "../../services/notification/notificationService"

import {
    CurrencyDollarIcon, ChartPieIcon, TagIcon, FolderIcon, UsersIcon
} from "@heroicons/react/24/outline";

const Dashboard = () => {
    const [checked, setChecked] = useState(true);
    const [LoggedIn, setLoggedIn] = useState(null)
    const { setNotification } = useNotification()
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                navigate("/")
                setLoggedIn(false)
            }
        });

    }, [])



    if (LoggedIn) {
        return (
            <div className="bg-gray-100 mt-[100px] p-8 px-12">
                <div className="w-full">
                    <h1 className="font-bold text-3xl">Dashboard</h1>
                </div>

                <div className='mt-6 flex justify-center gap-8'>

                    <Link to={`/admin/wip`} className="relative p-8 bg-white drop-shadow-xl rounded-xl w-[200px] flex flex-col gap-2 justify-center items-center hover:text-blue-600 transition ease-in-out duration-200 hover:scale-110">
                        <ChartPieIcon className='h-10 w-10' />
                        <h2 className="font-semibold text-2xl z-10">Estadísticas</h2>
                    </Link>

                    <Link to={`/admin/wip`} className="relative p-8 bg-white drop-shadow-xl rounded-xl w-[200px] flex flex-col gap-2 justify-center items-center hover:text-blue-600 transition ease-in-out duration-200 hover:scale-110">
                        <CurrencyDollarIcon className='h-10 w-10' />
                        <h2 className="font-semibold text-2xl z-10">Ventas</h2>
                    </Link>

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="relative p-8 bg-white drop-shadow-xl rounded-xl w-[200px] flex flex-col gap-2 justify-center items-center hover:text-blue-600 transition ease-in-out duration-200 hover:scale-110">
                                <TagIcon className='h-10 w-10' />
                                <h2 className="font-semibold text-2xl z-10">Productos</h2>
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 translate-x-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to={`/admin/wip`} className={classNames(
                                                active ? 'bg-gray-100' : 'text-gray-900',
                                                'block px-4 py-2 text-sm flex font-medium'
                                            )}>

                                                Ver lista de productos
                                            </Link>

                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to={`/admin/addproduct`} className={classNames(
                                                active ? 'bg-gray-100' : 'text-gray-900',
                                                'block px-4 py-2 text-sm flex font-medium'
                                            )}>

                                                Añadir un nuevo producto
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Link to={`/admin/wip`} className="relative p-8 bg-white drop-shadow-xl rounded-xl w-[200px] flex flex-col gap-2 justify-center items-center hover:text-blue-600 transition ease-in-out duration-200 hover:scale-110">
                        <FolderIcon className='h-10 w-10' />
                        <h2 className="font-semibold text-2xl z-10">Categorias</h2>
                    </Link>

                    <Link to={`/admin/wip`} className="relative p-8 bg-white drop-shadow-xl rounded-xl w-[200px] flex flex-col gap-2 justify-center items-center hover:text-blue-600 transition ease-in-out duration-200 hover:scale-110">
                        <UsersIcon className='h-10 w-10' />
                        <h2 className="font-semibold text-2xl z-10">Clientes</h2>
                    </Link>

                </div>

                <div className='p-8 pb-16 bg-white drop-shadow-xl rounded-xl mt-16 ml-16 mr-16'>

                    <div className='flex justify-between items-center'>
                        <h2 className="font-semibold text-2xl">Configuración</h2>
                        <button className="bg-blue-700 rounded-lg p-2 px-4 font-bold text-white text-sm animacion-boton-primary">Guardar cambios</button>
                    </div>

                    <div className="mt-4 flex items-center gap-16">
                        <div className='w-[800px]'>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Banner de Anuncios
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="¡Solo por hoy! 50% off en la 2da unidad"
                                />
                            </div>
                        </div>

                        <div className='w-[325px]'>
                            <div className="flex items-center mt-6">
                                <input
                                    id="mostrarProducto"
                                    type="checkbox"
                                    name='mostrarProducto'
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={checked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="mostrarProducto" className="ml-2 block text-sm text-gray-900 font-medium">
                                    Mostrar banner al público
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end items-center mt-16'>
                        <button className="rounded-lg p-2 px-4 font-bold text-gray-800 text-sm animacion-boton-secondary">Agregar un usuario</button>
                    </div>

                    <table className="table-auto w-full mt-4 border-collapse text-left">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Permisos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-slate-300'>
                                <td>Agustin</td>
                                <td>agusmayolitos@gmail.com</td>
                                <td>Acceso total</td>
                                <td className='text-blue-600 font-medium'>editar</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div >
        )
    }
}

export default Dashboard;