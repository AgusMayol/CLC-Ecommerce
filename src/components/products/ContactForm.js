import { useState } from "react"

const ContactForm = ({ onConfirm }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = () => {
        const userData = {
            name, phone, email
        }


        onConfirm(userData)
    }

    return (
        <form onSubmit={handleSubmit} className=" w-full">

            <div className="mt-4 flex flex-col gap-12 w-full">
                <div className=''>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Nombre y Apellido
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input value={name} id="name" type="text" className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Juan Perez" required onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className=''>
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Teléfono
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input value={phone} id="phone" type="number" className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Ej: 11-1234-5678" required onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>

                <div className=''>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Correo electrónico
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input value={email} id="email" type="email" className="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Ej: example@email.com" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <button className="bg-blue-700 mt-12 w-full rounded-lg p-2 sm:px-4 font-bold text-white text-sm hover:bg-blue-800 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">Realizar pedido</button>
            </div>
        </form>
    )
}

export default ContactForm