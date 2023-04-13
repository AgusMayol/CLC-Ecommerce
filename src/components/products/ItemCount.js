import { useState } from 'react'

const ItemCount = ({ stock = 0, initial = 1, onAdd, onBuy }) => {
    const [quantity, setQuantity] = useState(initial)

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1)
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (

        <div>
            {
                stock > 1 ? (
                    <div>
                        <p className="mt-4 text-md font-medium text-gray-900">Stock disponible</p>

                        <div className='flex flex-col items-center justify-center mt-10'>


                            <div className='flex gap-12'>
                                <button type="button" onClick={decrement}>-</button>
                                <h4>{quantity}</h4>
                                <button type="button" onClick={increment}>+</button>
                            </div>
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
                    </div>

                ) : (
                    <div>

                        <p className="mt-4 text-md font-medium text-gray-900">Sin stock</p>

                        <div className='flex flex-col justify-center items-center mt-10'>

                            <button type="button"
                                className="min-w-[300px] min-h-[40px] mt-3 rounded-lg py-2 px-8 font-bold text-red-900 text-sm text-red-700 animacion-boton-red-secondary"
                            >
                                Avisarme cuando haya stock
                            </button>

                        </div>
                    </div>
                )
            }


        </div>
    )

}
export default ItemCount