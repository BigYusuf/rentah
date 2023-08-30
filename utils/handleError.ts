import { ErrorsRes } from "@/types/error"
import axios from "axios"


export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)){
        if(error.response) return alert((error.response.data as ErrorsRes).detail);
        
        return alert(error.message);
    }
}