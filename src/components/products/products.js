const products = [
    {
        id: 1,
        name: 'Remera Básica',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$1400',
        color: 'Negro',
    },
    {
        id: 2,
        name: 'Remera Estampada',
        href: '#',
        imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/252/220/products/71ef3044-cd96-4585-8c96-c094175a4ee0-73e8af984d391c5dd616717464336800-640-0.webp',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$2500',
        color: 'Blanco',
    },
    {
        id: 3,
        name: 'Remera Homero',
        href: '#',
        imageSrc: 'https://d22fxaf9t8d39k.cloudfront.net/2c78b62f32d56a6b5221eac1011cea00dbeb2a6482ce64417b77b0476e3c1e0b50312.jpeg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$2500',
        color: 'Blanco',
    },
]

const Products = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Products;