import { useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import * as FetchApi from "../network/fetch_api";
import catFall from "/CatFall.svg"

const NotFoundPage = () => {

    useEffect(() => {
        const serveErr = async () => {
            try{
                await FetchApi.fetch404();            
            }
            catch(error){
                console.log('404 Not Found')
            }
        }
        serveErr()
        
    }, [])
    return (
    <Container>
        <Row><h1 style={{ color: "lightblue", marginTop: "10px" }}>404 Not Found</h1></Row>
        <Row><img src={catFall} className="img-fluid" style={{ width: "300px" }} /></Row>
    </Container>
    )
}

export default NotFoundPage