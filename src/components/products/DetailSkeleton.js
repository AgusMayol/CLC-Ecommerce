const DetailSkeleton = () => {


    return (
        <div>
            <nav aria- label="Breadcrumb" >
                <ol className="mt-[120px] mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div className="flex items-center">
                            <div className="w-16 h-6">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>
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
                        <div className="w-16 h-6">
                            <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                        </div>

                    </li>
                </ol>
            </nav >

            {/* Product info */}
            < div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24" >
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div className="w-96 h-8">
                        <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                    </div>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <div className="w-12 h-8">
                        <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                    </div>

                    <div className="mt-5">
                        {/* Modelo */}
                        <div>
                            <div className="w-72 h-8">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>

                            <div className="w-72 h-8">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>
                        </div>

                        <div className="w-52 h-8">
                            <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                        </div>

                    </div>





                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                    {/* Description and details */}
                    <div>

                        <div className="space-y-6">
                            <div className="w-96 h-8">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>

                            <div className="w-96 h-8 mt-4">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>

                            <div className="w-96 h-8 mt-4">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>

                            <div className="w-96 h-8 mt-4">
                                <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image gallery */}
            < div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8" >
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                    </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <div className="bg-gray-300 animate-pulse h-full w-full rounded"></div>
                </div>
            </div>
        </div >
    )
}

export default DetailSkeleton