import { useEffect, useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import mkIcon from "/MKIcon.svg"
import {BsLinkedin, BsGithub, BsEnvelope} from "react-icons/bs"
import "../styles/homepage.css"


const AboutPage = () => {
    //transition animation handling
    const sectionRefs = useRef<Array<HTMLElement | null>>([])
    const [visibleSections, setVisibleSections] = useState<number[]>([])
    
    useEffect(() => {
        const handleScroll = () => {
          const newVisibleSections: number[] = sectionRefs.current.reduce((acc: number[], sectionRef: HTMLElement | null, index: number) => {
            if (sectionRef) {
              const { top, bottom } = sectionRef.getBoundingClientRect()
              const offset = 300 
    
              if (top >= -offset && bottom <= window.innerHeight + offset) {
                if (!acc.includes(index)) {
                  acc.push(index)
                }
              } else {
                acc = acc.filter(item => item !== index)
              }
            }
            return acc
          }, [])
    
          setVisibleSections(newVisibleSections)
        };
    
        window.addEventListener('scroll', handleScroll)
    
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [])

    return (
        <Container>
            <section>
                <Row>
                    <img src={mkIcon} className="img-fluid" height="500" />    
                </Row>
                <Row>
                    <Col>
                        <a href="https://github.com/mtkatsaros?tab=repositories">
                            <BsGithub className={'icon'} />
                        </a>
                    </Col>
                    <Col>
                        <a href="https://www.linkedin.com/in/michael-katsaros-2301251b6/">
                            <BsLinkedin className={'icon'} />
                        </a> 
                    </Col>
                    <Col>
                        <BsEnvelope className={'icon'}/>
                    </Col>
                </Row>
                            
                
            </section>

            <section ref={e => sectionRefs.current[0] = e} className={`fade-in ${visibleSections.includes(0) && "appear"}`}>
                <h1 style={{ color: "lightblue"}}>Hello there!</h1>
                <h1 style={{ color: "lightblue"}}>Hello there!</h1>
                <h1 style={{ color: "lightblue"}}>Hello there!</h1>
                <h1 style={{ color: "lightblue"}}>Hello there!</h1>
                <h1 style={{ color: "lightblue"}}>Hello there!</h1>
            </section>

            <section ref={e => sectionRefs.current[1] = e} className={`fade-in ${visibleSections.includes(1) && "appear"}`}>
                <div style={{ color: "lightblue"}}>Hey there!</div>
            </section>

            <section ref={e => sectionRefs.current[2] = e} className={`fade-in ${visibleSections.includes(2) && "appear"}`}>
                <div style={{ color: "lightblue"}}>Hi there!</div>
            </section>

            <section ref={e => sectionRefs.current[3] = e} className={`fade-in ${visibleSections.includes(3) && "appear"}`}>
                <div style={{ color: "lightblue"}}>Howdy there!</div>
            </section>
            
            
        </Container>
    )
}

export default AboutPage