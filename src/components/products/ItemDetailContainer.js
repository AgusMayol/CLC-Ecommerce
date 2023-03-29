import { useState, useEffect } from 'react'
import { getProductById } from '../../asyncMock'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom'

export default function ItemDetailContainer() {

    const [product, setProduct] = useState()

    const { itemId } = useParams()


    useEffect(() => {
        getProductById(itemId).then(response => {
            setProduct(response)
        }).catch(error => {
            console.log(error)
        })
    }, [itemId])

    return (
        <div className="bg-white">
            <ItemDetail  {...product} />
        </div>

    )
}
