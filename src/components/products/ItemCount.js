import { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

const ItemCount = ({ stock = 0, initial = 1, onAdd, onBuy }) => {
    const [quantity, setQuantity] = useState(initial)

    const unidades = [
        { name: '1 unidad', value: 1 },
        { name: '2 unidades', value: 2 },
        { name: '3 unidades', value: 3 },
        { name: '4 unidades', value: 4 },
        { name: '5 unidades', value: 5 },
        { name: '6 unidades', value: 6 },
    ]

    const [selected, setSelected] = useState(unidades[0])

    return (

        <div>
            {
                stock > 1 ? (
                    <div>
                        <p className="mt-8 text-md font-medium text-gray-900">Stock disponible</p>

                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1 flex justify-start items-center">
                                <span>Cantidad: </span>
                                <Listbox.Button className="relative w-42 ml-2 cursor-pointer rounded-lg py-2 pl-2 pr-10 text-left focus:outline-none focus-visible:border-blue-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500 font-medium">
                                    {quantity > 1 ? (
                                        <span className="block truncate">{quantity} unidades</span>
                                    ) : (
                                        <span className="block truncate">{quantity} unidad</span>
                                    )}
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>

                                </Listbox.Button>
                                <span className='text-gray-400 text-xs'>({stock} disponibles)</span>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-62 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {unidades.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 pl-4 pr-10 text-[16px] ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-900'
                                                    }`
                                                }
                                                value={person}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                            onClick={() => setQuantity(person.value)}
                                                        >
                                                            {person.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 border-l-2 border-blue-700 text-blue-700">
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                        <div
                                            className={`relative cursor-pointer select-none py-2 px-4 text-[16px]`}
                                        >
                                            <div className={`block truncate`}>
                                                <label htmlFor="cantidad" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Unidades
                                                </label>
                                                <div className="relative mt-1 rounded-md shadow-sm">
                                                    <input value={quantity} id="cantidad" type="number" className="block w-32 font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        onChange={(e) => setQuantity(Number(e.target.value))} />
                                                </div>
                                            </div>
                                        </div>

                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>

                        <div className='flex flex-col items-center justify-center mt-10'>

                            <div>
                                <div className='flex flex-col justify-center items-center gap-3 mt-3'>

                                    <button type="button"
                                        className="bg-red-700 min-w-[300px] min-h-[40px] rounded-lg py-2 px-8 font-bold text-white text-sm animacion-boton-red"
                                        onClick={() => onBuy(quantity)}>
                                        Comprar ahora
                                    </button>

                                    <button type="button"
                                        className="min-w-[300px] min-h-[40px] rounded-lg py-2 px-8 font-bold text-red-900 text-sm text-red-700 animacion-boton-red-secondary"
                                        onClick={() => onAdd(quantity)}>
                                        Agregar al carrito
                                    </button>

                                </div>


                            </div>
                        </div>
                    </div >

                ) : (
                    <div>

                        <p className="mt-4 text-md font-medium text-gray-900">Sin stock</p>

                        <div className='flex flex-col justify-center items-center mt-10'>

                            <button type='button' className="rounded-lg p-2 px-4 font-bold text-gray-800 text-sm animacion-boton-secondary">
                                Avisarme cuando haya stock
                            </button>

                        </div>
                    </div>
                )
            }


        </div >
    )

}
export default ItemCount