const ItemSkeleton = () => {
    const numberOfSkeletons = 5;

    return (
        <div>
            <div className="w-80 h-8 ml-16 mt-[120px] z-0">
                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
            </div>

            {/* Comienzo ItemList */}
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-19 sm:px-6 lg:max-w-7xl lg:px-8 -mt-12">
                <div className="w-72 h-8">
                    <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 z-0">
                    {/* Comienzo Item */}

                    {[...Array(numberOfSkeletons)].map((_, i) => (
                        <div key={i} className="group relative z-0">
                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                                <div className="h-full w-full object-fit object-center lg:h-full lg:w-full">
                                    <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <div className="w-40 h-8">
                                        <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                                    </div>
                                    <div className="w-10 h-8 mt-1">
                                        <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                                    </div>
                                </div>
                                <div className="w-20 h-8 ml-3">
                                    <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ItemSkeleton