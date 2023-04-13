import {
    GlobeAmericasIcon, CreditCardIcon, PhoneIcon
} from "@heroicons/react/24/outline";


const Cards = () => {

    return (
        <div className='flex flex-col justify-center items-center gap-16 mt-4 mb-6 w-full md:flex-row'>

            <div className='bg-neutral-100 min-w-[255px] max-w-[255px] border-2 p-4 flex flex-col justify-center items-center gap-1 rounded-lg'>
                <GlobeAmericasIcon className='h-6 w-6' />
                <span className='font-semibold'>Envíos en 24hs</span>
                <p className='text-gray-500'>En toda la Argentina</p>
            </div>

            <div className='bg-neutral-100 min-w-[255px] max-w-[255px] border-2 p-4 flex flex-col justify-center items-center gap-1 rounded-lg'>
                <CreditCardIcon className='h-6 w-6' />
                <span className='font-semibold'>Medios de pago</span>
                <p className='text-gray-500'>Aceptamos todos los medios</p>
            </div>

            <div className='bg-neutral-100 min-w-[255px] max-w-[255px] border-2 p-4 flex flex-col justify-center items-center gap-1 rounded-lg'>
                <PhoneIcon className='h-6 w-6' />
                <span className='font-semibold'>¡Contactanos!</span>
                <p className='text-gray-500'>Escribinos al 11-1234-5678</p>
            </div>

        </div>
    )
}

export default Cards;