

import { FileUploadTwoTone } from "@mui/icons-material";
import { regexAlpha, regexNotAlpha, regexPhone } from "../helpers/regex";

export function alphaMask(text: string) {
    return text.replace(regexNotAlpha, '')
}

// export function isAlpha(text: string) {
//     return text.match(/^[a-zA-Z]+$/gi)
// }
  
export function passwordMask(text: string) {
    return text.replace(/[\s]/gi, '')
}

export function phoneMask(text: string) {

    text = text
    .replace(/[^\d]/gi, '') // deixando apenas dígitos
    .replace(/(\d{2})(9)(\d*)/, '$1$3') // removendo dígito verificador

    // comprimento com apenas os dígitos
    const length = text.length

    let copyText = text
    let firstTwoChars: string | RegExpMatchArray  = '' 
    let firstPart: string | RegExpMatchArray = ''
    let secondPart: string | RegExpMatchArray = ''

    if(length >= 3) {
        firstTwoChars = text.slice(0, 2)
        firstPart = text.slice(2, 6)
        copyText = firstTwoChars + ' 9 ' + firstPart
    }

    if(length >= 7) {
        secondPart = text.slice(6, 10)
        copyText += '-' + secondPart
    }

    return copyText
}


export function numberMask(text: string, float=false, negative=false) {

    if (float) {

        let regex = negative ? /[^-.\d]/gi : /[^.\d]/gi;
        const matches = text.match(/[-+]?[0-9]*\.?[0-9]+/gi)
        console.log(matches);
        return matches ? matches.join('') : text
        
    }

    return text.replace(/[^\d]/gi, "");

}

export function floatFormat(text: string, cifra = "R$") {
    
  text = text.constructor == Number ? text.toFixed(2) : text;

  const valor = text.replace(/\D/g, "").replace(/^0*/, "").padStart(3, "0");

  let p1 = valor.slice(0, -2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  let p2 = valor.slice(-2);

  return `${p1}.${p2}`;
}