import { Container, Row } from "react-bootstrap"
import catFall from "/CatFall.svg"

const NotFoundPage = () => {
    return (
    <Container>
        <Row><h1 style={{ color: "lightblue", marginTop: "10px" }}>404 Not Found</h1></Row>
        <Row><img src={catFall} className="img-fluid" style={{ width: "300px" }} /></Row>
    </Container>
    )
}

export default NotFoundPage