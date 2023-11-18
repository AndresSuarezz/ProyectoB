import { useState } from "react"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'
import membresia from "../../assets/img/Membresia.webp"

const Product = () => {
    const [preferenceId, setPreferenceId] = useState(null)
    const [precio, setPrecio] = useState(10000)

    initMercadoPago("TEST-e6ae2bb1-bce0-475b-a5b2-be8dc26c122d")

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:8080/create_preference", {
                descripcion: "Tarjeta de Fondos para Servicio",
                price: precio,
                quantity: 1,
            })
            
            const { id } = response.data;
            return id;

        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        const id = await createPreference()
        if (id){
            setPreferenceId(id)
        }
    }

    const handleChange = (e) => {
        setPrecio(e.target.value)
    }

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat("de-DE").format(precio)
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex justify-center">
                <img src={membresia} alt="Product" className="w-44 h-44 flex justify-center rounded-lg mb-4" />
            </div>
            <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">Tarjeta de Fondos para Servicio</h2>
                <p className="text-lg mb-5">Si tienes saldo en la tarjeta podrás prestar servicio</p>
                <p className="text-2xl mb-2">Fondo actual: <span className="font-bold text-green-500 bold">10000</span></p>
                <p className="text-lg mb-4">Selecciona el monto a recargar</p>
                <div className="flex justify-between">
                    <select className="bg-gray-700 text-white rounded-lg p-2 mb-4" onChange={e => handleChange(e)}>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="30000">30000</option>
                        <option value="40000">40000</option>
                        <option value="50000">50000</option>
                        <option value="60000">60000</option>
                        <option value="70000">70000</option>
                        <option value="80000">80000</option>
                        <option value="90000">90000</option>
                        <option value="100000">100000</option>
                    </select>
                    <p className="text-2xl font-bold mb-4">$ {formatearPrecio(precio)}</p>
                </div>
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full" onClick={handleBuy}>Comprar</button>
                {preferenceId && <Wallet initialization={{preferenceId}} />}
            </div>
        </div>
    )
}

export default Product