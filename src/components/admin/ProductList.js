import React, { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import VerificarAdmin from './verificarAdmin';
import { db } from '../../services/firebase/firebaseConfig';
import { getDocs, collection, query } from 'firebase/firestore';
import './boton.css';

import {
    EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";


import {
    PlusCircleIcon, ArrowLeftCircleIcon, EyeIcon, DocumentDuplicateIcon, TrashIcon, MagnifyingGlassIcon, ArrowTopRightOnSquareIcon, AdjustmentsVerticalIcon, ShareIcon
} from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductList = () => {
    const [UsuarioValidado, setUsuarioValidado] = useState(false);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const PermitirVista = () => {
        setUsuarioValidado(true)
    }

    useEffect(() => {

        const productsRef = query(collection(db, 'products'))

        getDocs(productsRef)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
            });
    }, []);

    if (!UsuarioValidado) {
        return (<VerificarAdmin onConfirm={PermitirVista}></VerificarAdmin>)

    }

    return (
        <div className="bg-gray-100 mt-[75px] p-8 px-12">

            <div className='w-[32px]'>
                <Link to={`/admin`}>
                    <ArrowLeftCircleIcon className='h-8 w-8 text-neutral-600 ml-1 mb-2 mt-2 w-auto' />
                </Link>
            </div>


            <nav aria-label="Breadcrumb">
                <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 -ml-6">
                    <li>
                        <div className="flex items-center">
                            <Link to={`/admin`} className="mr-2 text-sm font-medium text-gray-900">
                                admin
                            </Link>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li className="text-sm">
                        <Link to={`/admin/productlist`} className="font-medium text-gray-500 hover:text-gray-600">
                            productos
                        </Link>

                    </li>
                </ol>
            </nav>
            <div className="flex justify-between w-full">
                <h1 className="font-bold text-3xl">Productos</h1>
                <div className="flex space-between gap-4">

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="flex justify-center items-center border-[1px] rounded-lg p-2 px-4 font-bold text-gray-800 text-sm animacion-boton-secondary">
                                <EllipsisVerticalIcon className='h-5 w-5 mr-1' /> Más opciones
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100' : 'text-gray-900',
                                                    'block px-4 py-2 text-sm flex font-medium'
                                                )}
                                            >
                                                <ArrowTopRightOnSquareIcon className='h-5 w-5 mr-3' /> Ver producto
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100' : 'text-gray-900',
                                                    'block px-4 py-2 text-sm flex font-medium'
                                                )}
                                            >
                                                <EyeIcon className='h-5 w-5 mr-3' /> Vista previa
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100' : 'text-gray-900',
                                                    'block px-4 py-2 text-sm flex font-medium'
                                                )}
                                            >
                                                <DocumentDuplicateIcon className='h-5 w-5 mr-3' /> Duplicar
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100' : 'text-red-800',
                                                    'block px-4 py-2 text-sm text-red-800 flex font-medium'
                                                )}
                                            >
                                                <TrashIcon className='h-5 w-5 mr-3' /> Eliminar
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Link to={`/admin/addproduct`} className="bg-blue-700 rounded-lg p-2 px-4 font-bold text-white text-sm animacion-boton-primary flex"><PlusCircleIcon className='h-5 w-5 mr-1' /> Agregar un producto</Link>

                </div>
            </div>

            <div className='flex justify-between items-end gap-4 mt-4'>
                <div className="relative mt-2 rounded-md shadow-sm w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm"><MagnifyingGlassIcon className='h-5 w-5' /></span>
                    </div>
                    <input type="text" name="search" id="search" className="block w-full rounded-md border-0 py-1.5 pl-11 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Buscar por nombre o SKU" />
                </div>

                <button className="flex justify-center items-center border-[1px] rounded-lg p-1.5 px-4 font-bold text-gray-800 text-sm animacion-boton-secondary mb-[1px]">
                    <AdjustmentsVerticalIcon className='h-5 w-5 mr-1' /> Filtrar
                </button>
            </div>


            <div className="bg-white border-2 drop-shadow-xl rounded-xl mt-6">
                <div className="table-auto w-full border-collapse text-left">
                    <div className='w-full bg-gray-200 rounded-t-lg flex justify-between items-center p-2'>

                        <div className='font-bold'><input
                            id="mostrarProducto"
                            type="checkbox"
                            name='mostrarProducto'
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        /></div>
                        <div className='font-bold'>Producto</div>
                        <div className='font-bold ml-8'>
                            Stock
                        </div>
                        <div className='font-bold'>
                            Precio
                        </div>
                        <div className='font-bold'>
                            Promocional
                        </div>
                        <div className='font-bold'></div>
                        <div className='font-bold mr-16'>Acciones</div>

                    </div>
                    <div className='flex flex-col justify-between items-center w-full p-2'>
                        {
                            products.map((prod) => (


                                <div key={prod.id} className='border-b border-slate-300 flex justify-start items-center w-full'>
                                    <div><input
                                        id="mostrarProducto"
                                        type="checkbox"
                                        name='mostrarProducto'
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={checked}
                                        onChange={handleCheckboxChange}
                                    /></div>
                                    <div className='p-2'>
                                        <Link to={`/admin/editproduct/${prod.id}`} className="group relative flex z-0 ml-2 mr-4">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md mr-1">
                                                <img
                                                    src={prod.imageSrc}
                                                    alt={`Imagen del producto ${prod.name}`}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col w-52">
                                                <div>
                                                    <div className="flex justify-between text-base font-semibold text-blue-700">
                                                        <h3>
                                                            {prod.name}
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{prod.model}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div><div className="relative mt-2 rounded-md shadow-sm w-40 mr-4">
                                        <input
                                            type="text"
                                            name="stock"
                                            id="stock"
                                            defaultValue={prod.stock}
                                            className="block font-medium w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                    </div></div>
                                    <div><div className="relative mt-2 rounded-md shadow-sm w-40 mr-4">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="precioCosto"
                                            id="precioCosto"
                                            defaultValue={prod.price}
                                            className="block font-medium w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label htmlFor="currencyCosto" className="sr-only">
                                                Currency
                                            </label>
                                            <select
                                                id="currencyCosto"
                                                name="currencyCosto"
                                                className="h-full font-medium rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option>ARS</option>
                                                <option>USD</option>
                                            </select>
                                        </div>
                                    </div></div>
                                    <div><div className="relative mt-2 rounded-md shadow-sm w-40">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="precioCosto"
                                            id="precioCosto"
                                            defaultValue={'0.00'}
                                            className="block font-medium w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="0.00"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label htmlFor="currencyCosto" className="sr-only">
                                                Currency
                                            </label>
                                            <select
                                                id="currencyCosto"
                                                name="currencyCosto"
                                                className="h-full font-medium rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option>ARS</option>
                                                <option>USD</option>
                                            </select>
                                        </div>
                                    </div></div>
                                    <div className='w-full'>
                                    </div>
                                    <div>
                                        <div className='flex justify-center items-center gap-3 mr-2'>

                                            <button type="button" className="bg-white rounded-full p-2 font-bold text-black text-sm text-blue-700 hover:bg-gray-200 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600"><ShareIcon className='h-5 w-5' /></button>

                                            <button type="button" className="bg-white rounded-full p-2 font-bold text-black text-sm text-blue-700 hover:bg-gray-200 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600"><DocumentDuplicateIcon className='h-5 w-5' /></button>

                                            <button type="button" className="bg-white rounded-full p-2 font-bold text-black text-sm text-blue-700 hover:bg-gray-200 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-600"><TrashIcon className='h-5 w-5' /></button>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div >
        </div >
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ProductList;