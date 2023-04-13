import ItemCount from './ItemCount'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useNotification } from '../../services/notification/notificationService'
import Cards from './Cards'

const ItemDetail = ({ id, name, price, model, imageSrc, stock, description, category }) => {

    const { addItem, isInCart } = useCart()
    const { setNotification } = useNotification()

    const navigate = useNavigate();

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, imageSrc, model
        }
        addItem(productToAdd)
        setNotification('success', `Se agrego correctamente ${quantity} ${name}`)
    }

    const handleOnBuy = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, imageSrc, model
        }
        addItem(productToAdd)
        setNotification('success', `Se agrego correctamente ${quantity} ${name}`)
        navigate("/checkout")
    }

    return (

        <div className="pt-6 mt-[90px] bg-gray-100">
            <nav aria-label="Breadcrumb">
                <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div className="flex items-center">
                            <Link to={`/category/${category}`} className="mr-2 text-sm font-medium text-gray-900">
                                {category}
                            </Link>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li className="text-sm">
                        <Link to={`/item/${id}`} className="font-medium text-gray-500 hover:text-gray-600">
                            {name}
                        </Link>

                    </li>
                </ol>
            </nav>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 pt-10">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Información del Producto</h2>
                    <p className="text-3xl font-medium tracking-tight text-gray-900">${price}</p>

                    <div className="mt-5">
                        {/* Modelo */}
                        <div>
                            <h3 className="text-md font-medium text-gray-900">Modelo</h3>

                            <p className="mt-1 text-md text-gray-500">{model}</p>
                        </div>

                        {
                            isInCart(id) ? (
                                <Link to='/cart'>Terminar compra</Link>
                            ) : (
                                <ItemCount onAdd={handleOnAdd} onBuy={handleOnBuy} stock={stock} />
                            )
                        }

                    </div>





                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                    {/* Description and details */}
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image gallery */}
            <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
                    {
                        imageSrc[0] ? (
                            <img
                                src={imageSrc[0]}
                                alt={`Imagen del producto ${name}`}
                                className="h-full w-full object-cover object-center bg-gray-200"
                            />
                        ) : (
                            <div></div>
                        )
                    }
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        {
                            imageSrc[1] ? (
                                <img
                                    src={imageSrc[1]}
                                    alt={`Imagen del producto ${name}`}
                                    className="h-full w-full object-cover object-center bg-gray-200"
                                />
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        {
                            imageSrc[2] ? (
                                <img
                                    src={imageSrc[2]}
                                    alt={`Imagen del producto ${name}`}
                                    className="h-full w-full object-cover object-center bg-gray-200"
                                />
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    {
                        imageSrc[3] ? (
                            <img
                                src={imageSrc[3]}
                                alt={`Imagen del producto ${name}`}
                                className="h-full w-full object-cover object-center bg-gray-200"
                            />
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>

            <Cards></Cards>

        </div>
    )
}

export default ItemDetail