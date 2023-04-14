import ItemCount from './ItemCount'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useNotification } from '../../services/notification/notificationService'
import Cards from './Cards'
import MetodosDePago from './MetodosDePago'

const ItemDetail = ({ id, name, price, model, imageSrc, stock, description, category, display }) => {

    const { addItem, isInCart, getProductQuantity } = useCart()
    const { setNotification } = useNotification()

    const navigate = useNavigate();

    const GoHome = () => {
        navigate("/")
    }

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, imageSrc, model, stock
        }
        addItem(productToAdd)
        setNotification('success', `Se agrego correctamente ${quantity} ${name}`)
    }

    const handleOnBuy = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, imageSrc, model, stock
        }
        addItem(productToAdd)
        setNotification('success', `Se agrego correctamente ${quantity} ${name}`)
        navigate("/checkout")
    }

    const productQuantity = getProductQuantity(id)

    if (display) {

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
                <div className="mx-auto bg-white drop-shadow p-4 mt-4 rounded-lg max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-4">

                    <div className="lg:col-span-2 lg:pr-8">

                        {/* Image gallery */}
                        <div className="mx-auto w-[500px] h-[500px] sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="overflow-hidden rounded-lg lg:block">
                                {
                                    imageSrc[0] ? (
                                        <img
                                            src={imageSrc[0]}
                                            alt={`Imagen del producto ${name}`}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 h-fit bg-white border-[1px] p-4 pb-6 rounded-lg lg:mt-0">
                        <h2 className="sr-only">Información del Producto</h2>
                        <div className='flex justify-start items-center mb-2'>
                            <div className='flex justify-start items-center gap-2 divide-x'>
                                <span className='text-gray-500 text-sm'>Nuevo</span>
                                <span className='text-gray-500 text-sm pl-2'>+500 vendidos</span>
                            </div>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-gray-900">{name}</span>
                        <p className="text-3xl font-medium tracking-tight text-gray-900 mt-3">$ {new Intl.NumberFormat('de-DE').format(price)}</p>

                        <MetodosDePago></MetodosDePago>

                        <div className="mt-5">
                            {/* Modelo */}
                            <div>
                                <h3 className="text-md font-medium text-gray-900">Modelo</h3>

                                <p className="mt-1 text-md text-gray-500">{model}</p>
                            </div>

                            {
                                isInCart(id) ? (
                                    <div className='flex flex-col justify-center items-center gap-3 mt-10'>

                                        <Link to='/checkout' className="w-[300px] h-[40px] flex justify-center items-center rounded-lg py-2 px-8 font-bold text-gray-800 text-sm animacion-boton-secondary">
                                            Terminar de comprar
                                        </Link>

                                    </div>


                                ) : (
                                    <ItemCount onAdd={handleOnAdd} onBuy={handleOnBuy} stock={stock} initial={productQuantity || 1} />
                                )
                            }

                        </div>





                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Cards></Cards>

            </div>
        )
    } else {
        GoHome();
    }
}

export default ItemDetail