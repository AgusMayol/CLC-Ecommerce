import { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore'
import DetailSkeleton from './DetailSkeleton';

export default function ItemDetailContainer() {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()


    useEffect(() => {
        setLoading(true)

        const productRef = doc(db, 'products', itemId)

        getDoc(productRef)
            .then(snapshot => {
                const data = snapshot.data()
                const productAdapted = { id: snapshot.id, ...data }
                setProduct(productAdapted)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [itemId])

    return (
        loading ? (
            <DetailSkeleton />
        ) : (
            <div className="bg-white">
                <ItemDetail  {...product} />
            </div>
        )

    );
}
