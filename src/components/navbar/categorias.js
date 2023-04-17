import { Fragment, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { db } from '../../services/firebase/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export default function Categorias() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categoriesRef = query(collection(db, 'categories'), orderBy('label', 'asc'))

        getDocs(categoriesRef)
            .then(snapshot => {
                const categoriesAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setCategories(categoriesAdapted)
            })
    }, [])

    return (
        <div>
            <nav aria-label="Top">
                <div className="flex items-center w-auto">

                    {/* Flyout menus */}
                    <Popover.Group className="hidden lg:block lg:self-stretch">
                        <div className="flex h-full space-x-8">
                            <Popover className="flex">
                                {({ open }) => (
                                    <div>
                                        <div className="relative flex">
                                            <Popover.Button
                                                className="text-sm font-semibold leading-6 text-gray-900"
                                            >
                                                Productos
                                            </Popover.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-9">
                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                <div className="relative bg-white">
                                                    <div className="">
                                                        <div className="grid grid-cols-4 pb-4 gap-y-10 gap-x-8 z-10">
                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                <div className="group relative text-base sm:text-sm flex flex-col gap-8">

                                                                    {
                                                                        categories.map(cat => {
                                                                            return <NavLink key={cat.id} to={`/category/${cat.slug}`} className={({ isActive }) => isActive ? 'text-red-700 font-semibold' : 'text-gray-900 font-semibold'}>{cat.label}</NavLink>
                                                                        })
                                                                    }

                                                                </div>


                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </div>
                                )}
                            </Popover>
                        </div>
                    </Popover.Group>
                </div>
            </nav>
        </div>
    )
}