import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { db } from '../../services/firebase/firebaseConfig';
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore';
import Cards from './Cards';
import ItemSkeleton from './ItemSkeleton';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Agregado

    const { categoryId } = useParams();

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categoriesRef = query(collection(db, 'categoryWidgets'), orderBy('label', 'asc'))

        getDocs(categoriesRef)
            .then(snapshot => {
                const categoriesAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setCategories(categoriesAdapted)
            })
    }, [])

    useEffect(() => {
        setLoading(true);

        const productsRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : query(collection(db, 'products'), limit(8));

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

                <h1 className="text-3xl mb-8 font-bold text-center sm:text-start sm:ml-12 mt-[120px] z-0">{greeting}</h1>
                <ItemList products={products} />

                {
                    !categoryId ? (
                        <div className='mb-[150px] mt-8'>
                            <h2 className="text-2xl font-bold ml-4 md:ml-16 mb-8 tracking-tight text-gray-900">Categorías</h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {
                                    categories.map(cat => {
                                        return (
                                            <Link key={cat.id} style={{ backgroundImage: 'url(' + cat.image + ')', backgroundSize: 'cover' }} to={`/category/${cat.slug}`} className="w-full h-52 w-52 mx-4 md:w-80 md:h-80 transition ease-in-out duration-200 hover:scale-105">
                                                <div className='w-full h-full static inset-0 bg-black bg-opacity-30 flex justify-center items-center transition ease-in-out duration-200 hover:scale-105' >
                                                    <button type="button"
                                                        className="bg-red-700 rounded-lg py-2 px-4 font-semibold text-white text-sm">
                                                        {cat.label}
                                                    </button>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    ) : null
                }



                <Cards />
            </div>
        )

    );
};

export default ItemListContainer;
