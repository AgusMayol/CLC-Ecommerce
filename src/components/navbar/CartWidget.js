import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../services/notification/notificationService'
import { Link } from 'react-router-dom'


const CartWidget = () => {
    const [open, setOpen] = useState(false)
    const { totalQuantity, cart, total, removeItem, incrementQuantity, decrementQuantity, clearCart } = useCart()
    const { setNotification } = useNotification()

    const handleOnRemove = (id, name) => {
        removeItem(id)
        setNotification('success', `Se eliminó correctamente ${name}`)
    }

    function openOffCanvas() {
        setOpen(true)
    }


    return (
        <div>
            <button
                type="button"
                onClick={openOffCanvas}
                className='flex gap-1'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>

                <span>{totalQuantity}</span>

            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de la compra</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                            {
                                                                cart.map((prod) => (
                                                                    <li key={prod.id} className="flex py-6">
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

                                                                                <button onClick={() => decrementQuantity(prod.id)}>-</button>
                                                                                <button onClick={() => incrementQuantity(prod.id, prod.stock)}>+</button>


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
                                                                ))
                                                            }


                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>${new Intl.NumberFormat('de-DE').format(total)}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">El envío y los impuestos se calculan al finalizar la compra</p>
                                                <div className="mt-6">
                                                    <Link
                                                        to={'/checkout'}
                                                        className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm animacion-boton-indigo"
                                                    >
                                                        Finalizar compra
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        o
                                                        <button
                                                            type="button"
                                                            className="font-medium ml-1 text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Continuar comprando
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>

                                                <button onClick={() => clearCart()}>Vaciar carrito</button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )

}
export default CartWidget;