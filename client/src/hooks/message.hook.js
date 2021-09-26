import {useCallback} from 'react'

export const useMessage = () => {
    
    return  (text) => {
            if (window.M && text) {
                window.M.toast({html: text})
            }
        }
}