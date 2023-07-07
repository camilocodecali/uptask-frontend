import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AutContext = createContext();

const AutProvider =  ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true)

    const navigate = useNavigate()

    useEffect(()=> {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
 
            } catch (error) {
                setAuth({})
            } 
            setCargando(false)
            
        }
        autenticarUsuario()
    }, [])

    return (
        <AutContext.Provider
            value={{
                setAuth,
                auth,
                cargando
            }}
        >
            {children}
        </AutContext.Provider>

    )
}

export {
    AutProvider
}

export default AutContext;