

export type FlashMessageType = 'error' | 'warning' | 'info' | 'success'
export type FlashMessageVariant = 'filled' | 'standard' | 'outlined' 

export interface FlashMessage {
    msg: string,
    type: FlashMessageType,
    title?: string,
    variant?: FlashMessageVariant,
}

