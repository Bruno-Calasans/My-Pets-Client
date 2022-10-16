

import event from '../utils/event'
import { FlashMessage } from "../types/flashMessage.type"

const useFlash = () => {

    return {
        createMessage(message: FlashMessage){
            event.emit('flash', message)
        }
    }
    
}

export default useFlash