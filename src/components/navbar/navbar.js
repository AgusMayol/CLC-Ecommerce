import React, { useState, useEffect, Fragment } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Dialog, Popover } from '@headlessui/react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../services/firebase/firebaseConfig';
import { RadioGroup, Menu, Transition } from '@headlessui/react'

import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import CartWidget from './CartWidget'
import Categorias from './categorias'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [LoggedIn, setLoggedIn] = useState(null)
    const location = useLocation();
    const [Ruta, setRuta] = useState(location.pathname);

    const logo = 'https://firebasestorage.googleapis.com/v0/b/clc-ecommerce.appspot.com/o/CLC_Logo.png?alt=media&token=494b8c39-b37a-480e-b9c9-a4eb46223d5e'

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        setRuta(location.pathname);
    }, [location]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)

            } else {
                setLoggedIn(false)
                console.log("user is logged out")
            }
        });

    }, [])

    return (
        <header className="bg-white shadow fixed left-0 top-0 w-full z-10">
            <nav className="flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                <div className="flex">
                    <Link to={`/`} className="-m-1.5 p-1.5 flex justify-center align-items-center gap-2">
                        <img className="h-12 w-auto" src={logo} alt="" />
                    </Link>
                </div>



                {(LoggedIn && Ruta.includes("/admin")) ? (
                    <Popover.Group className="hidden lg:flex lg:gap-x-8">

                        <Link to={`/admin/wip`} className="text-sm font-semibold leading-6 text-gray-900">
                            Estadísticas
                        </Link>
                        <Link to={`/admin/wip`} className="text-sm font-semibold leading-6 text-gray-900">
                            Ventas
                        </Link>
                        <Link to={`/admin/wip`} className="text-sm font-semibold leading-6 text-gray-900">
                            Productos
                        </Link>
                        <Link to={`/admin/wip`} className="text-sm font-semibold leading-6 text-gray-900">
                            Categorías
                        </Link>
                        <Link to={`/admin/wip`} className="text-sm font-semibold leading-6 text-gray-900">
                            Clientes
                        </Link>
                    </Popover.Group>
                ) : (
                    <Popover.Group className="hidden lg:flex lg:gap-x-8">
                        <Categorias></Categorias>

                        <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                            Novedades
                        </Link>
                        <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                            Detalles Técnicos
                        </Link>
                        <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                            Catálogos
                        </Link>
                        <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                            Quienes Somos
                        </Link>
                        <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                            Contacto
                        </Link>
                    </Popover.Group>
                )}




                <div className='flex gap-9'>
                    <CartWidget />

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="hover:cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
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
                                    {LoggedIn ? (

                                        <Menu.Item>
                                            {({ active }) => (

                                                <Link to={`/admin/wip`} className={classNames(
                                                    active ? 'bg-gray-100' : 'text-gray-900',
                                                    'block px-4 py-2 text-sm flex font-medium'
                                                )}>

                                                    Mi cuenta
                                                </Link>


                                            )}
                                        </Menu.Item>
                                    ) : (
                                        <div></div>
                                    )}

                                    <Menu.Item>
                                        {({ active }) => (

                                            LoggedIn ? (

                                                <Link to={`/logout`} className={classNames(
                                                    active ? 'bg-gray-100' : 'text-gray-900',
                                                    'block px-4 py-2 text-sm flex font-medium'
                                                )}>

                                                    Cerrar sesión
                                                </Link>
                                            ) : (


                                                <Link to={`/login`} className={classNames(
                                                    active ? 'bg-gray-100' : 'text-gray-900',
                                                    'block px-4 py-2 text-sm flex font-medium'
                                                )}>

                                                    Iniciar sesión
                                                </Link>

                                            )

                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>



            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">

                        <div className="flex">
                            <Link to={`/`} className="-m-1.5 p-1.5 flex justify-center align-items-center gap-2">
                                <img className="h-12 w-auto" src={logo} alt="" />
                            </Link>
                        </div>

                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Cerrar Menú</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6 flex flex-col justify-center items-center gap-8">

                                <span className="text-sm font-semibold leading-6 text-gray-900 -mb-6">Productos</span>
                                <div className="flex flex-col justify-center items-center gap-6 pb-8">
                                    <NavLink to='/category/cilindros' className={({ isActive }) => isActive ? 'text-red-700' : 'text-gray-900'}>Cilindros</NavLink>
                                    <NavLink to='/category/tratamiento' className={({ isActive }) => isActive ? 'text-red-700' : 'text-gray-900'}>Tratamiento</NavLink>
                                    <NavLink to='/category/válvulas' className={({ isActive }) => isActive ? 'text-red-700' : 'text-gray-900'}>Válvulas</NavLink>
                                </div>

                                <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                                    Novedades
                                </Link>
                                <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                                    Detalles Técnicos
                                </Link>
                                <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                                    Catálogos
                                </Link>
                                <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                                    Quienes Somos
                                </Link>
                                <Link to={`/`} className="text-sm font-semibold leading-6 text-gray-900">
                                    Contacto
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header >
    );
}

export default Navbar;