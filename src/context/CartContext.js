import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext('valor inicial')

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("CarritoBackup", JSON.stringify(cart));
            //Carrito guardado en localstorage
        } else {
            const copia = JSON.parse(localStorage.getItem("CarritoBackup"))
            if (copia && copia.length > 0) {
                setCart(copia)
                //Se ha encontrado un carrito en el localstorage, y se ha restaurado
            }
        }
    }, [cart])


    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            setCart(prev => [...prev, productToAdd])
        } else {
            //No se agrega porque ya esta en el carrito
        }
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {

        const copia = JSON.parse(localStorage.getItem("CarritoBackup"))
        if (copia) {
            const filteredObj = copia.filter(prod => prod.id !== id);
            localStorage.setItem("CarritoBackup", JSON.stringify(filteredObj));
        }
        const updatedCart = cart.filter(prod => prod.id !== id)
        setCart(updatedCart)
    }

    const getTotalQuantity = () => {
        let totalQuantity = 0

        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })

        return totalQuantity
    }

    const totalQuantity = getTotalQuantity()

    const getTotal = () => {
        let total = 0

        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })

        return total
    }

    const total = getTotal()

    const clearCart = () => {
        setCart([])
        localStorage.removeItem("CarritoBackup");
    }

    return (
        <CartContext.Provider value={{ cart, addItem, totalQuantity, removeItem, isInCart, total, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}
