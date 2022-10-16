

function getRepeatedValues<T>(array: T[]){

    const repeatedKeys: T[] = []
    const arrayCopy = array

    array.forEach((key, index) => {

        const removedKey = arrayCopy.splice(0, 1)[0]
        const isRepeatedKey = arrayCopy.includes(removedKey)

        if(isRepeatedKey && !repeatedKeys.includes(removedKey)){
            repeatedKeys.push(removedKey)
        }
  
    })

    return repeatedKeys
}

export default function formDataToObj<R>(formData: FormData): R{

    const obj: any = {}
    for(let [key, value] of formData.entries()) {
        obj[key] = value
    }

    return obj as R
}