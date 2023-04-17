import React, { useState, Fragment, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RadioGroup, Menu, Transition } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import './boton.css';

import {
    EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";


import {
    PlusCircleIcon, PencilSquareIcon, ArrowLeftCircleIcon, EyeIcon, DocumentDuplicateIcon, TrashIcon, ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image', 'html'
];

const plans = [
    {
        name: 'Infinito',
    },
    {
        name: 'Limitado',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const EditProduct = () => {
    const [checked, setChecked] = useState(true);
    const [selected, setSelected] = useState(plans[0])
    const [loading, setLoading] = useState(true)

    const [product, setProduct] = useState()

    const { itemId } = useParams()


    useEffect(() => {
        setLoading(true)
        const productRef = doc(db, 'products', itemId)

        getDoc(productRef)
            .then(snapshot => {
                const data = snapshot.data()
                const productAdapted = { id: snapshot.id, ...data }
                setProduct(productAdapted)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [itemId])

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'html'],
            ['clean'],
        ],
    };

    if (loading) {
        return (
            <div className='mt-[100px]'>
                Cargando
            </div>
        )
    }

    return (
        <div className="bg-gray-100 mt-[75px] p-8 px-12">

            <div className='w-[32px]'>
                <Link to={`/admin`}>
                    <ArrowLeftCircleIcon className='h-8 w-8 text-neutral-600 ml-1 mb-2 mt-2 w-auto' />
                </Link>
            </div>

            <div>
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
                        <li className="text-sm flex items-center">
                            <Link to={`/admin/productlist`} className="font-medium text-gray-500 hover:text-gray-600">
                                productos
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
                        </li>
                        <li className="text-sm">
                            <Link to={`/item/${itemId}`} className="font-medium text-gray-500 hover:text-gray-600">
                                {product["name"]}
                            </Link>
                        </li>
                    </ol>
                </nav>
                <form>
                    <div className="flex justify-between w-full">
                        <h1 className="font-bold text-3xl">{product["name"]}</h1>
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

                            <button type='submit' className="bg-blue-700 rounded-lg p-2 px-4 font-bold text-white text-sm animacion-boton-primary">Guardar cambios</button>
                        </div>
                    </div>


                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl">Nombre y descripción</h2>

                        <div className="mt-3 flex gap-16">
                            <div className='w-[800px]'>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={product["name"]}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Cilindros rotativos de Cremallera y Piñon Camozzi"
                                    />
                                </div>
                            </div>

                            <div className='w-[325px]'>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Modelo
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={product["model"]}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Serie QR-QX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                Descripción
                            </label>
                            <ReactQuill
                                value={product["description"]}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                className='rounded-lg mt-1'
                            />
                        </div>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl mb-3">Fotos</h2>

                        <div className='flex justify-start items-center gap-6'>

                            <img src={product["imageSrc"]} className='h-44 w-44 rounded-xl border-2 border-gray-200' alt="" />

                            <input type="file"
                                accept="image/*"
                                name="foto"
                                id="foto"
                                className="block file:h-44 file:w-44 text-sm text-slate-500
                            file:mr-4 file:p-12
                            file:rounded-xl file:border-2 file:border-blue-500 file:border-dashed
                            file:text-sm file:font-semibold
                            file:bg-blue-100 file:text-blue-700
                            hover:file:cursor-pointer hover:file:bg-blue-200
                        "/>

                        </div>

                        <button className="font-bold text-blue-600 text-sm mt-8 flex justify-center items-center"><PencilSquareIcon className='h-5 w-5 mr-1' /> Editar fotos</button>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl">Botones</h2>

                        <div className="mt-3 flex justify-between">
                            <div>
                                <label htmlFor="catalogo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Catálogo
                                </label>
                                <div className="relative mt-1 rounded-md">
                                    <input type="file"
                                        accept="image/*"
                                        name="catalogo"
                                        id="catalogo"
                                        className="block w-[300px] text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-8
                            file:rounded-md file:border-2 file:border-blue-500 file:border-dashed
                            file:text-sm file:font-semibold
                            file:bg-blue-100 file:text-blue-700
                            hover:file:cursor-pointer hover:file:bg-blue-200
                        "/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="modelo3d" className="block text-sm font-medium leading-6 text-gray-900">
                                    Modelo 3D
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="url"
                                        name="modelo3d"
                                        id="modelo3d"
                                        className="block w-[300px] font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="https://example.com"
                                        pattern="https://.*"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="video" className="block text-sm font-medium leading-6 text-gray-900">
                                    Video
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="url"
                                        name="video"
                                        id="video"
                                        className="block w-[300px] font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="https://example.com"
                                        pattern="https://.*"
                                    />
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl">Precios</h2>

                        <div className="mt-3 flex justify-start gap-8">
                            <div>
                                <label htmlFor="precioVenta" className="block text-sm font-medium leading-6 text-gray-900">
                                    Precio de venta
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="precioVenta"
                                        id="precioVenta"
                                        defaultValue={'0.00'}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <label htmlFor="currencyVenta" className="sr-only">
                                            Currency
                                        </label>
                                        <select
                                            id="currencyVenta"
                                            name="currencyVenta"
                                            className="h-full font-medium rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        >
                                            <option>ARS</option>
                                            <option>USD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="pricePromocional" className="block text-sm font-medium leading-6 text-gray-900">
                                    Precio promocional
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="pricePromocional"
                                        id="pricePromocional"
                                        defaultValue={'0.00'}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <label htmlFor="currencyPromocional" className="sr-only">
                                            Currency
                                        </label>
                                        <select
                                            id="currencyPromocional"
                                            name="currencyPromocional"
                                            className="h-full font-medium rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        >
                                            <option>ARS</option>
                                            <option>USD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center mt-6">
                            <input
                                id="mostrarPrecio"
                                type="mostrarPrecio"
                                name="mostrarPrecio"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={false}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="mostrarPrecio" className="ml-2 block text-sm text-gray-900 font-medium">
                                Mostrar el precio en la tienda
                            </label>
                        </div>


                        <div className="mt-8 flex justify-start gap-8">
                            <div>
                                <label htmlFor="precioCosto" className="block text-sm font-medium leading-6 text-gray-900">
                                    Precio de costo
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
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
                                </div>
                            </div>
                        </div>

                        <span className='mt-4 font-medium text-xs text-gray-700'>Es de uso interno, tus clientes no lo verán en la tienda.</span>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl">Stock</h2>

                        <div className="mt-3 flex justify-start gap-12">
                            <div>
                                <label htmlFor="SKU" className="block text-sm font-medium leading-6 text-gray-900">
                                    SKU
                                </label>
                                <div className="relative mt-2 rounded-md w-[350px]">
                                    <input
                                        type="text"
                                        name="SKU"
                                        id="SKU"
                                        className="block w-full font-medium rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                    <span className='font-medium text-xs text-gray-700'>El SKU es un código que creás internamente para hacer un seguimiento de tus productos con variantes.</span>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="barCode" className="block text-sm font-medium leading-6 text-gray-900">
                                    Código de barras
                                </label>
                                <div className="relative mt-2 rounded-md w-[350px]">
                                    <input
                                        type="text"
                                        name="barCode"
                                        id="barCode"
                                        className="block w-full font-medium rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                    <span className='font-medium text-xs text-gray-700'>El código de barras consta de 13 números y se utiliza para identificar un producto.</span>
                                </div>
                            </div>

                        </div>

                        <RadioGroup value={selected} onChange={setSelected}>
                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                            <div className="space-y-2 mt-6">
                                {plans.map((plan) => (
                                    <RadioGroup.Option
                                        key={plan.name}
                                        value={plan}
                                        className={({ active, checked }) =>
                                            `${active
                                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-600'
                                                : ''
                                            }
                  ${checked ? 'bg-blue-800 text-white' : 'bg-white'
                                            }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md border-[1px] focus:outline-none`
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="text-sm">
                                                            <RadioGroup.Label
                                                                as="p"
                                                                className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                    }`}
                                                            >
                                                                {plan.name}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                                    }`}
                                                            >
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    {checked && (
                                                        <div className="shrink-0 text-white">
                                                            {/* <CheckIcon className="h-6 w-6" /> */}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>

                        <button className="font-bold text-blue-600 text-sm mt-8 flex justify-center items-center"><ArrowLeftCircleIcon className='h-5 w-5 mr-1' /> Ver historial de stock</button>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl mb-4">Peso y dimensiones</h2>

                        <span className='font-medium text-xs text-gray-700'>Cargá el peso y medidas del producto con tu embalaje (no es necesario sumar el paquete de la empresa de correo).</span>

                        <div className="mt-5 flex justify-between gap-8">
                            <div>
                                <label htmlFor="peso" className="block text-sm font-medium leading-6 text-gray-900">
                                    Peso
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm w-[250px]">

                                    <input
                                        type="text"
                                        name="peso"
                                        id="peso"
                                        defaultValue={'0.00'}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500 sm:text-sm">kg</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="profundidad" className="block text-sm font-medium leading-6 text-gray-900">
                                    Profundidad
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm w-[250px]">

                                    <input
                                        type="text"
                                        name="profundidad"
                                        id="profundidad"
                                        defaultValue={'0.00'}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500 sm:text-sm">cm</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="ancho" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ancho
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm w-[250px]">

                                    <input
                                        type="text"
                                        name="ancho"
                                        id="ancho"
                                        defaultValue={'0.00'}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500 sm:text-sm">cm</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="alto" className="block text-sm font-medium leading-6 text-gray-900">
                                    Alto
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm w-[250px]">

                                    <input
                                        type="text"
                                        name="alto"
                                        id="alto"
                                        defaultValue={'0.00'}
                                        className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500 sm:text-sm">cm</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl">Categorías</h2>

                        <button className="font-bold text-blue-600 text-sm mt-8 flex justify-center items-center"><PencilSquareIcon className='h-5 w-5 mr-1' /> Editar categorias</button>

                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl mb-4">Variantes</h2>

                        <div>
                            <span className='font-medium text-xs text-gray-700'>Combiná diferentes propiedades de tu producto. Ejemplo: color + tamaño.</span>
                        </div>


                        <button className="font-bold text-blue-600 text-sm mt-8 flex justify-center items-center"><PlusCircleIcon className='h-5 w-5 mr-1' /> Agregar variantes</button>
                    </div>

                    <div className="p-8 bg-white drop-shadow-xl rounded-xl mt-6">
                        <h2 className="font-semibold text-2xl mb-4">Tags y SEO</h2>

                        <div>
                            <span className='font-medium text-xs text-gray-700'>Creá palabras clave y facilitá la búsqueda de este producto en tu tienda y en los motores de búsqueda de Google.</span>
                        </div>

                        <button className="font-bold text-blue-600 text-sm mt-8 flex justify-center items-center"><PencilSquareIcon className='h-5 w-5 mr-1' /> Editar</button>

                    </div>


                    <div className="mt-6 ml-1 flex flex-col justify-start gap-4 w-full">
                        <div className="flex items-center">
                            <input
                                id="envioGratis"
                                type="checkbox"
                                name='envioGratis'
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={false}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="envioGratis" className="ml-2 block text-sm text-gray-900 font-medium">
                                Este producto tiene envío gratis
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="mostrarProducto"
                                type="checkbox"
                                name='mostrarProducto'
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="mostrarProducto" className="ml-2 block text-sm text-gray-900 font-medium">
                                Mostrar en la tienda
                            </label>
                        </div>
                    </div>


                    <div className="mt-4 flex justify-end items-end gap-4 w-full">
                        <Link to={"/admin/productlist"} className="rounded-lg p-2 px-4 font-bold text-gray-800 text-sm animacion-boton-secondary">Cancelar</Link>

                        <button type='submit' className="bg-blue-700 rounded-lg p-2 px-4 font-bold text-white text-sm animacion-boton-primary">Guardar cambios</button>
                    </div>

                </form >
            </div>
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

export default EditProduct;