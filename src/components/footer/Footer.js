import { NavLink } from 'react-router-dom'
import youtube from './icons/youtube.svg'
import instagram from './icons/instagram.webp'

import {
    EnvelopeIcon, PhoneIcon, MapPinIcon,
} from '@heroicons/react/24/outline'

const Footer = () => {


    return (
        <footer className='p-6 px-8 pb-0 mt-16' style={{ backgroundColor: '#34495e' }}>
            <nav className='flex flex flex-wrap gap-16 sm:gap-8 sm:flex-row sm:flex-nowrap sm:justify-between sm:items-start text-white'>
                <ul className='font-bold font-sm'> Navegación
                    <li className='mt-2'>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Novedades</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Detalles Técnicos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Catálogos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Quienes Somos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300'>Contacto</NavLink>
                    </li>
                </ul>
                <ul className='font-bold font-sm flex flex-col gap-4'> Contactanos
                    <li className='mt-2'>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300 flex items-center gap-2'><PhoneIcon className="h-4 w-4" aria-hidden="true" /> +54 9 11 1234-5678</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300 flex items-center gap-2'><EnvelopeIcon className="h-4 w-4" aria-hidden="true" /> example@email.com</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300 flex items-center gap-2'><MapPinIcon className="h-4 w-4" aria-hidden="true" /> Avenida Siempreviva 742</NavLink>
                    </li>
                </ul>
                <ul className='font-bold font-sm flex flex-col gap-4'> Redes sociales
                    <li className='mt-2'>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300 flex items-center gap-2'><img src={instagram} className='h-4 w-4' alt='Logo de Instagram' /> Instagram</NavLink>
                    </li>

                    <li>
                        <NavLink to='/' className='text-white font-semibold text-xs hover:text-neutral-300 flex items-center gap-2'><img src={youtube} className='h-4 w-4' alt='Logo de Youtube' /> Youtube</NavLink>
                    </li>
                </ul>
            </nav>

            <div className="flex justify-end items-end">
                <span className="text-white font-bold mb-1 mt-12 sm:mt-0" style={{ fontSize: "8px", letterSpacing: ".7px" }}>COPYRIGHT CLC
                    AUTOMATION
                    /
                    NEUMATICA CAMOZZI - 2023.
                    TODOS LOS
                    DERECHOS RESERVADOS.
                </span>
            </div>
        </footer>
    );
}

export default Footer;