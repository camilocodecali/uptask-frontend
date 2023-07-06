import { useContext } from "react";
import AutContext from "../context/AutProvider";

const useAuth = () => {
    return useContext(AutContext)
}

export default useAuth;