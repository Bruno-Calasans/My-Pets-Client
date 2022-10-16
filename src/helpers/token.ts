
export function saveToken(token: string) {

    try {
        localStorage.setItem('token', token)
        return true
        
    } catch (e) {
        return false
    }
}

export function getToken() {
    return localStorage.getItem('token')
}

export function destroyToken() {

    if(getToken()){
        localStorage.removeItem('token')
        return true
    }

    return false
}


