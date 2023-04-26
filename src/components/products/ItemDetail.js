import ItemCount from './ItemCount'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useNotification } from '../../services/notification/notificationService'
import Cards from './Cards'
import MetodosDePago from './MetodosDePago'
import Item from './Item';
import { DocumentTextIcon, CubeTransparentIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { db } from '../../services/firebase/firebaseConfig';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';

const ItemDetail = ({ id, name, price, model, imageSrc, stock, description, category, display, botones }) => {

    const { addItem, isInCart, getProductQuantity } = useCart()
    const [products, setProducts] = useState([]);
    const [ProductosRelacionados, setProductosRelacionados] = useState(false);
    const { setNotification } = useNotification()

    const navigate = useNavigate();

    const GoHome = () => {
        navigate("/")
    }

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, imageSrc, model, stock
        }
        addItem(productToAdd)
        setNotification('success', `Se agrego correctamente ${quantity} ${name}`)
    }

    const handleOnBuy = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, imageSrc, model, stock
        }
        addItem(productToAdd)
        setNotification('success', `Se agrego correctamente ${quantity} ${name}`)
        navigate("/checkout")
    }

    useEffect(() => {
        const productsRef = query(collection(db, 'products'), where('category', '==', category), where('__name__', '!=', id), limit(4));

        getDocs(productsRef)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);

                if (productsAdapted.length > 1) {
                    setProductosRelacionados(true)
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
            });
    }, [id]);

    const productQuantity = getProductQuantity(id)

    if (display) {

        return (

            <div className="mt-[114px] px-4 sm:px-8 bg-gray-100">
                <nav aria-label="Breadcrumb">
                    <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <Link to={`/category/${category}`} className="mr-2 text-sm font-medium text-gray-900">
                                    {category}
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
                            <Link to={`/item/${id}`} className="font-medium text-gray-500 hover:text-gray-600">
                                {name}
                            </Link>

                        </li>
                    </ol>
                </nav>

                {/* Product info */}
                <div className="mx-auto bg-white drop-shadow p-4 mt-4 rounded-lg lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

                    <div className="lg:col-span-2 lg:pr-8">

                        {/* Image gallery */}
                        <div className="mx-auto sm:w-[500px] sm:h-[500px] sm:px-6 lg:px-8">
                            <div className="overflow-hidden rounded-lg lg:block">
                                {
                                    imageSrc[0] ? (
                                        <img
                                            src={imageSrc[0]}
                                            alt={`Imagen del producto ${name}`}
                                            className="h-full w-full object-cover object-center hover:scale-150 transition-all duration-[1.5s]"
                                        />
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>

                        <h1 className="text-2xl hidden sm:block font-bold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-1 lg:col-end-4  h-fit bg-white border-[1px] shadow p-4 pb-6 rounded-lg lg:mt-0">
                        <span className="sr-only">Información del Producto</span>
                        <div className='flex justify-start items-center mb-2'>
                            <div className='flex justify-start items-center gap-2 divide-x'>
                                <span className='text-gray-500 text-sm'>Nuevo</span>
                                <span className='text-gray-500 text-sm pl-2'>+500 vendidos</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{name}</h2>
                        <p className="text-3xl font-medium tracking-tight text-gray-900 mt-3">$ {new Intl.NumberFormat('de-DE').format(price)}</p>

                        <MetodosDePago></MetodosDePago>

                        <div className="mt-5">
                            {/* Modelo */}
                            <div>
                                <h3 className="text-md font-medium text-gray-900">Modelo</h3>

                                <p className="mt-1 text-md text-gray-500">{model}</p>
                            </div>

                            {
                                isInCart(id) ? (
                                    <div className='flex flex-col justify-center items-center gap-3 mt-10'>

                                        <Link to='/checkout' className="w-[300px] h-[40px] flex justify-center items-center rounded-lg py-2 px-8 font-bold text-gray-800 text-sm animacion-boton-secondary">
                                            Terminar de comprar
                                        </Link>

                                    </div>


                                ) : (
                                    <ItemCount onAdd={handleOnAdd} onBuy={handleOnBuy} stock={stock} initial={productQuantity || 1} />
                                )
                            }

                        </div>
                    </div>

                    {/* Botones */}
                    {
                        botones.length > 1 ? (
                            <div className="mt-4 lg:col-end-4 lg:row-start-2 h-fit bg-white border-[1px] shadow p-4 pb-6 rounded-lg lg:mt-0">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900 border-b-[1px] border-red-800 pb-1">Documentación</h2>

                                {botones.map((boton) => (
                                    <div key={boton.id} className="mt-5">
                                        {
                                            boton.category == "Catálogo" ? (
                                                <Link to={boton.document} target='_blank' className='flex gap-2 font-medium hover:text-red-800 transition-all duration-150'>
                                                    <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
                                                    <span>{boton.category} {boton.name}</span>
                                                </Link>

                                            ) : (
                                                null
                                            )
                                        }

                                        {
                                            boton.category == "Modelo 3D" ? (
                                                <Link to={boton.document} target='_blank' className='flex gap-2 font-medium hover:text-red-800 transition-all duration-150'>
                                                    <CubeTransparentIcon className="h-6 w-6" aria-hidden="true" />
                                                    <span>{boton.category}</span>
                                                </Link>
                                            ) : (
                                                null
                                            )
                                        }

                                        {
                                            boton.category == "Video" ? (
                                                <Link to={boton.document} target='_blank' className='flex gap-2 font-medium hover:text-red-800 transition-all duration-150'>
                                                    <VideoCameraIcon className="h-6 w-6" aria-hidden="true" />
                                                    <span>{boton.category}</span>
                                                </Link>
                                            ) : (
                                                null
                                            )
                                        }

                                    </div>
                                ))}

                            </div>
                        ) : (
                            null
                        )}

                    <div className="py-10 lg:col-span-2 lg:row-start-2 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6 flex items-center justify-center sm:items-start sm:justify-start">
                                <p className="text-base text-justify text-gray-900">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    ProductosRelacionados ? (
                        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-19 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
                            <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Productos relacionados</h2>

                            <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 z-0">
                                {products.map(prod => <Item key={prod.id} {...prod} />)}
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }

                <Cards></Cards>

            </div>
        )
    } else {
        GoHome();
    }
}

export default ItemDetail