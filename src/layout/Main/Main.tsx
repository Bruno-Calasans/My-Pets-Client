

import { Container } from "./Main.style";
import FlashMessage from "../../components/flashMessage/FlashMessage";

interface mainProps {
  children: JSX.Element
}

export default function Main({ children }: mainProps) {

  return (
    <Container>
      <FlashMessage />
      {children}
    </Container>
  );
}
