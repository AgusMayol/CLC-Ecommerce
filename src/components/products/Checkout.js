import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import { db } from '../../services/firebase/firebaseConfig';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotification } from "../../services/notification/notificationService"

import { useNavigate } from "react-router-dom"

import ContactForm from "./ContactForm"

const Checkout = () => {
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmado, setConfirmado] = useState(false)
    const { cart, total, clearCart, removeItem } = useCart()
    const { setNotification } = useNotification()

    const handleOnRemove = (id, name) => {
        removeItem(id)
        setNotification('success', `Se eliminó correctamente ${name}`)
    }

    const handleConfirmado = () => {
        setConfirmado(true)
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
        <div className="bg-gray-100 mt-[100px] p-8 px-12">
            <div className="w-full">
                <h1 className="font-bold text-3xl">Finalizar compra</h1>
            </div>

            <div className="grid grid-cols-3 gap-8 divide-x mt-6">
                <div className="col-span-2">
                    <ul role="list" className="-my-6 mt-0 flex flex-col gap-4">

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
                                            <p className="ml-4">${prod.price} <span className='text-gray-400 text-sm'>x {prod.quantity}</span></p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{prod.model}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">


                                        {prod.quantity > 1 ? (

                                            <p className="text-gray-500">
                                                {prod.quantity} unidades
                                            </p>

                                        ) : (

                                            <p className="text-gray-500">
                                                {prod.quantity} unidad
                                            </p>
                                        )

                                        }


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

                {
                    confirmado ? (
                        <div className="p-4 bg-white rounded-lg flex flex-col justify-center items-center h-fit">

                            <h2 className="font-semibold text-xl">Ingrese sus datos</h2>
                            <ContactForm onConfirm={createOrder} />

                        </div>
                    ) : (
                        <div className="p-4 bg-white rounded-lg flex flex-col justify-between items-center h-fit">

                            <h2 className="font-semibold text-xl">Confirma tu orden</h2>

                            <div className="border-t border-gray-200 mt-8 w-full">
                                <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                    <p className="text-gray-500">Subtotal</p>
                                    <p>${total}</p>
                                </div>

                                <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                    <p className="text-gray-500">Envío</p>
                                    <p>${envio}</p>
                                </div>

                                <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                    <p className="text-gray-500">Impuestos</p>
                                    <p>${impuestos}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 mt-8 w-full">
                                <div className="flex justify-between text-base mt-4 font-medium w-full text-gray-900">
                                    <p>Total</p>
                                    <p>${total + impuestos + envio}</p>
                                </div>
                            </div>

                            <button onClick={() => handleConfirmado()} className="bg-blue-700 mt-12 rounded-lg p-2 px-[110px] font-bold text-white text-sm hover:bg-blue-800 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">Confirmar orden</button>

                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default Checkout