import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Logo_Diners from './iconosPago/751ea930-571a-11e8-9a2d-4b2bd7b1bf77-m.svg'
import Logo_Cencosud from './iconosPago/5cc05a00-d012-11ea-be41-3936b95cb468-m.svg'
import Logo_Naranja from './iconosPago/992bc350-f3be-11eb-826e-6db365b9e0dd-m.svg'
import Logo_Visa from './iconosPago/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg'
import Logo_Master from './iconosPago/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg'
import Logo_Mercado from './iconosPago/b4534650-571b-11e8-95d8-631c1a9a92a9-m.svg'
import Logo_Cabal from './iconosPago/c9f71470-6f07-11ec-9b23-071a218bbe35-m.svg'
import Logo_Argencard from './iconosPago/d7e55980-f3be-11eb-8e0d-6f4af49bf82e-m.svg'
import Logo_American from './iconosPago/fbf867c0-9108-11ed-87b1-fd4dd99fac51-m.svg'

export default function MetodosDePago() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="ml-1 text-sm text-blue-600 hover:text-blue-500"

            >
                Ver los medios de pago
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[88%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-medium text-center leading-6 text-gray-900"
                                    >
                                        Medios de pago
                                    </Dialog.Title>
                                    <div className="mt-8 mb-8 flex justify-center items-center gap-8">
                                        <img src={Logo_American} alt="" />
                                        <img src={Logo_Argencard} alt="" />
                                        <img src={Logo_Cabal} alt="" />
                                        <img src={Logo_Cencosud} alt="" />
                                        <img src={Logo_Diners} alt="" />
                                        <img src={Logo_Master} alt="" />
                                        <img src={Logo_Mercado} alt="" />
                                        <img src={Logo_Naranja} alt="" />
                                        <img src={Logo_Visa} alt="" />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
