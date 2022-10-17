
import { Container, Content, Lab } from "./label.style";

interface LabelProps{
    start: string
    text: string
    end?: string
}

export default function Label({start, text, end}: LabelProps){


    return (
        <Container>
            <Lab>{start}</Lab> <Content>{text} {end}</Content>
        </Container>
    )
}