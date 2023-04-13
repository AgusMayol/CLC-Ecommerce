import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { db } from '../../services/firebase/firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import Cards from './Cards';
import ItemSkeleton from './ItemSkeleton';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Agregado

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const productsRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products');

        getDocs(productsRef)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsDataLoaded(true);
                setLoading(false);
            });
    }, [categoryId]);


    return (
        loading && !isDataLoaded ? (
            <ItemSkeleton />
        ) : (
            <div>

                <h1 className="text-3xl mb-8 font-bold ml-12 mt-[120px] z-0">{greeting}</h1>
                <ItemList products={products} />
                <Cards />
            </div>
        )

    );
};

export default ItemListContainer;
