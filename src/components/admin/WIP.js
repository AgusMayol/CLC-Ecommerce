import { Link } from 'react-router-dom'

import {
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";

const Wip = () => {

    return (
        <div className="bg-gray-100 mt-[75px] p-8 px-12">

            <div className='w-[32px]'>
                <Link to={`/admin`}>
                    <ArrowLeftCircleIcon className='h-8 w-8 text-neutral-600 ml-1 mb-2 mt-2 w-auto' />
                </Link>
            </div>

            <h1 className="font-bold text-3xl mb-4">Work in Progress</h1>
            <p>Hola! Actualmente estamos trabajando para traerte esta sección lo antes posible.</p>

            <div className='mt-16 w-full'>
                <Link to={`/admin`} className="bg-blue-700 rounded-lg p-2 px-4 font-bold text-white text-sm hover:bg-blue-800 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">
                    Volver al dashboard
                </Link>
            </div>
        </div >
    )
}

export default Wip;