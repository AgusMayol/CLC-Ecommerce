import ItemCount from './ItemCount'
import { Link } from 'react-router-dom'

const ItemDetail = ({ id, name, price, color, imageSrc, imageAlt, stock, description, category }) => {

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }
        console.log(productToAdd)
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

            {/* Imagen */}

            <div className="mt-6 ml-8 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="h-full w-full object-fit object-center lg:h-full lg:w-full"
                    />
                </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Información del Producto</h2>
                    <p className="text-3xl tracking-tight text-gray-900">${price}</p>

                    <form className="mt-5">
                        {/* Modelo */}
                        <div>
                            <h3 className="text-md font-medium text-gray-900">Modelo</h3>

                            <p className="mt-1 text-md text-gray-500">{color}</p>
                        </div>

                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                    </form>
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
        </div>
    )
}

export default ItemDetail