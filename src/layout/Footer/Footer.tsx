
import { Container, Content } from "./Footer.style";

interface FooterProps{
  pageName: string
  author: string
  authorUrl: string
}

export default function Footer({ pageName, author, authorUrl }: FooterProps) {
  return (
    <Container>

      <Content>
        <span className="highlight">{pageName}</span>. Todos os direitos reservados &copy;. 
      </Content>

      <Content>
        Site criado por <span className="highlight"><a 
        target='_blank'
        className="highlight2" 
        href={authorUrl}>{author}</a></span>
      </Content>

    </Container>

  );
}