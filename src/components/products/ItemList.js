import Item from './Item'

const ItemList = ({ products }) => {
    return (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-19 sm:px-6 lg:max-w-7xl lg:px-8 -mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 z-0">
                {products.map(prod => <Item key={prod.id} {...prod} />)}
            </div>
        </div>
    )
}

export default ItemList