import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dialog, Popover } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import CartWidget from './CartWidget'
import logo from '../../CLC_Logo.png'
import Categorias from './categorias'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="bg-white shadow fixed left-0 top-0 w-full z-10">
            <nav className="flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                <div className="flex">
                    <Link to={`/`} className="-m-1.5 p-1.5 flex justify-center align-items-center gap-2">
                        <img className="h-12 w-auto" src={logo} alt="" />
                    </Link>
                </div>

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

                <div className='flex gap-9'>
                    <CartWidget />

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