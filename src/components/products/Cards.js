import {
    GlobeAmericasIcon, CreditCardIcon, PhoneIcon
} from "@heroicons/react/24/outline";


const Cards = () => {

    return (
        <div className='grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 justify-center place-items-center my-6 w-full divide-slate-300'>

            <div className=' min-w-[255px] max-w-[255px] p-4 grid grid-cols-1 justify-center place-items-center gap-1'>
                <GlobeAmericasIcon className='h-6 w-6' />
                <span className='font-semibold'>Envíos en 24hs</span>
                <p className='text-gray-500'>En toda la Argentina</p>
            </div>



            <div className="flex flex-col lg:flex-row justify-between items-center h-full w-full">
                <div className="h-[2px] w-full lg:h-full h-[2px] w-full lg:w-[2px] bg-gray-200"></div>
                <div className=' min-w-[255px] max-w-[255px] p-4 grid grid-cols-1 justify-center place-items-center gap-1'>
                    <CreditCardIcon className='h-6 w-6' />
                    <span className='font-semibold'>Medios de pago</span>
                    <p className='text-gray-500'>Aceptamos todos los medios</p>
                </div>
                <div className="h-[2px] w-full lg:h-full h-[2px] w-full lg:w-[2px] bg-gray-200"></div>
            </div>


            <div className=' min-w-[255px] max-w-[255px] p-4 grid grid-cols-1 justify-center place-items-center gap-1'>
                <PhoneIcon className='h-6 w-6' />
                <span className='font-semibold'>¡Contactanos!</span>
                <p className='text-gray-500'>Escribinos al 11-1234-5678</p>
            </div>

        </div>
    )
}

export default Cards;