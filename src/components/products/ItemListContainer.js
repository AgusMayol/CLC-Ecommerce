import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory } from "../../asyncMock"
import ItemList from './ItemList'


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {
        const asyncFunction = categoryId ? getProductsByCategory : getProducts

        asyncFunction(categoryId)
            .then(products => {
                setProducts(products)
            })
            .catch(error => {
                console.log(error)
            })
    }, [categoryId])

    return (
        <div>
            <h1 className="text-3xl mb-8 font-bold ml-12 mt-[120px] z-0">{greeting}</h1>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer