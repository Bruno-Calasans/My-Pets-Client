
interface TitleProps {
    name: string
    children: JSX.Element | JSX.Element[]
}

export default function Title({name, children}: TitleProps) {

    document.title = name
    return <>{children}</>
}

