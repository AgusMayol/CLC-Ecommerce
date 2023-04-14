import { Link } from 'react-router-dom'

const Item = ({ id, name, price, model, imageSrc, display }) => {

    if (display) {
        return (
            <Link key={id} to={`/item/${id}`} className="group relative z-0">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
                    <img
                        src={imageSrc}
                        alt={`Imagen del producto ${name}`}
                        className="h-full w-full object-fit object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            {name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{model}</p>
                    </div>
                    <p className="text-sm ml-3 font-medium text-gray-900">${new Intl.NumberFormat('de-DE').format(price)}</p>
                </div>
            </Link>
        )
    }

}

export default Item