import { useState } from 'react'

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
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
        <div className='flex flex-col items-center justify-center mt-10'>
            <div className='flex gap-12'>
                <button onClick={decrement}>-</button>
                <h4>{quantity}</h4>
                <button onClick={increment}>+</button>
            </div>
            <div>
                <button
                    className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-red-700 py-3 px-8 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => onAdd(quantity)}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    )

}
export default ItemCount