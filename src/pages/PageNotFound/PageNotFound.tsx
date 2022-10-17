import { Link } from "react-router-dom";


export default function PageNotFound(){

    return <section style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <h1 className="pageName">Ops! Página não encontrada :(</h1>
        <Link to='/'>Voltar para página inicial</Link>
    </section>
}