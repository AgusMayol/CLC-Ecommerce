import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import { db } from '../../services/firebase/firebaseConfig';
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotification } from "../../services/notification/notificationService"
import Cards from "./Cards";

import { useNavigate } from "react-router-dom"

import ContactForm from "./ContactForm"

const Checkout = () => {
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmado, setConfirmado] = useState(false)
    const { cart, total, clearCart, removeItem, incrementQuantity, decrementQuantity } = useCart()
    const { setNotification } = useNotification()

    const handleOnRemove = (id, name) => {
        removeItem(id)
        setNotification('success', `Se eliminó correctamente ${name}`)
    }

    const handleConfirmado = () => {
        setConfirmado(true)
    }

    const handleVaciar = () => {
        clearCart();
        setNotification('success', `Se vació correctamente el carrito`);
    }

    let envio = 0;
    let impuestos = 0;

    const navigate = useNavigate()

    const createOrder = async (userData) => {
        try {
            setLoading(true)
            const objOrder = {
                buyer: userData,
                items: cart,
                total
            }

            const ids = cart.map(prod => prod.id)

            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))

            const { docs } = await getDocs(productsRef)

            const batch = writeBatch(db)
            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

            if (outOfStock.length === 0) {
                batch.commit()

                const ordersRef = collection(db, 'orders')

                const orderAdded = await addDoc(ordersRef, objOrder)

                clearCart()
                setNotification('success', `Hemos creado tu orden correctamente!`);
                setOrderId(orderAdded.id)

                setTimeout(() => {
                    navigate('/')
                }, 5000)
            } else {
                setNotification('error', 'Hay productos que no tienen stock', 10)
            }
        } catch (error) {
            setNotification('error', 'Hubo un error generando la orden', 10)
        } finally {
            setLoading(false)
        }

    }

    if (loading) {
        return (
            <div className="bg-gray-100 mt-[100px] p-8 px-12">
                <div className="w-full">
                    <h1 className="font-bold text-3xl">Finalizar compra</h1>
                </div>
                <h2 className="font-semibold text-xl mt-12">Se esta generando su orden...</h2>
            </div>
        )
    }

    if (orderId) {
        return (
            <div className="bg-gray-100 mt-[100px] p-8 px-12">
                <div className="w-full">
                    <h1 className="font-bold text-3xl">Finalizar compra</h1>
                </div>
                <h2 className="font-semibold text-xl mt-12">El id de su compra es: {orderId}</h2>
                <p className="text-lg mt-12">Le llegará a su correo electrónico la confirmación de la orden. ¡Muchas gracias por confiar en nosotros!</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 mt-[100px] p-4 sm:p-8">
            <div className="w-full">
                <h1 className="font-bold text-3xl text-center sm:text-left">Finalizar compra</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-8 divide-x mt-6 pb-4">
                <div className="col-span-2">
                    <ul className="-my-6 mt-0 flex flex-col gap-4">
                        {cart.map((prod) => (
                            <li key={prod.id} className="flex bg-white px-4 py-6 rounded-lg">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={prod.imageSrc}
                                        alt={`Imagen del producto ${prod.name}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link to={`/item/${prod.id}`}>{prod.name}</Link>
                                            </h3>
                                            <p className="ml-4">${new Intl.NumberFormat('de-DE').format(prod.price)} <span className='text-gray-400 text-sm'>x {prod.quantity}</span></p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{prod.model}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className='flex justify-center items-center gap-4'>
                                            <button className='text-gray-500 hover:text-black' onClick={() => decrementQuantity(prod.id)}>-</button>

                                            {prod.quantity > 1 ? (
                                                <p className="text-gray-500">
                                                    {prod.quantity} unidades
                                                </p>
                                            ) : (
                                                <p className="text-gray-500">
                                                    {prod.quantity} unidad
                                                </p>
                                            )}
                                            <button className='text-gray-500 hover:text-black' onClick={() => incrementQuantity(prod.id, prod.stock)}>+</button>
                                        </div>
                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={() => handleOnRemove(prod.id, prod.name)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {confirmado ? (
                    <div className="p-4 bg-white rounded-lg flex flex-col justify-center items-center mt-16 sm:mt-0">

                        <h2 className="font-semibold text-xl">Ingrese sus datos</h2>
                        <ContactForm onConfirm={createOrder} />

                    </div>
                ) : (
                    <div className="p-4 bg-white rounded-lg flex flex-col justify-between items-center mt-16 sm:mt-0 sm:w-full">
                        <div className="flex justify-between items-center w-full">
                            <div className="w-[36px] h-[36px]"></div>
                            <h2 className="font-semibold text-xl sm:text-lg">Confirma tu orden</h2>
                            <button type="button" className="p-2 text-gray-400 hover:text-gray-500" onClick={handleVaciar}>
                                <span className="sr-only">Close panel</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="border-t border-gray-200 mt-8 w-full">
                            <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                <p className="text-gray-500">Subtotal</p>
                                <p>${new Intl.NumberFormat('de-DE').format(total)}</p>
                            </div>

                            <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                <p className="text-gray-500">Envío</p>
                                <p>${new Intl.NumberFormat('de-DE').format(envio)}</p>
                            </div>

                            <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                <p className="text-gray-500">Impuestos</p>
                                <p>${new Intl.NumberFormat('de-DE').format(impuestos)}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 mt-8 w-full">
                            <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                <p>Total</p>
                                <p>${new Intl.NumberFormat('de-DE').format(total + impuestos + envio)}</p>
                            </div>
                        </div>
                        <button onClick={() => handleConfirmado()} className="bg-blue-700 mt-12 w-full rounded-lg p-2 sm:px-4 font-bold text-white text-sm hover:bg-blue-800 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">Confirmar orden</button>

                    </div>
                )
                }
            </div>

            <Cards></Cards>

        </div>
    )
}

export default Checkout