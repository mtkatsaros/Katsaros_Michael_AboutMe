import React, { useEffect, useState, useRef } from "react"
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap"
import mkIcon from "/MKIcon.svg"
import {BsLinkedin, BsGithub, BsEnvelope} from "react-icons/bs"
import "../styles/homepage.css"
import * as ContactApi from "../network/contact_api";



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

    //contact form handling
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)
        try{
            const response = await ContactApi.sendMessage(formData)
            if(response.success){
                await ContactApi.confirmationMessage(formData)
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                })
            }else{
                console.error("The message failed to send. Please try again.")
            }
        }catch(error){
            console.error("An error occurred when sending message. Please try again.")
        }finally{
            setIsSubmitting(false)
        }
    }

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
                        <a href="#contact">
                            <BsEnvelope className={'icon'}/>
                        </a>
                        
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

            <section id="contact">
                {isSubmitting 
                ? <Spinner animation="border" style={{color: "lightblue"}}/>
                :
                <>
                    <h1 style={{ color: "lightblue"}}>Contact Me!</h1>
                    <Form onSubmit={handleSubmit} className="dark-modal">
                        <Form.Group >
                            <Form.Label style={{color: "lightblue"}}>Name</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{color: "lightblue"}}>Email</Form.Label>
                            <Form.Control
                                type="email" 
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{color: "lightblue"}}>Message</Form.Label>
                            <Form.Control
                                as="textarea"  
                                rows={5}
                                placeholder="Enter your message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button
                        variant="light"
                        className="button"
                        type="submit"
                        style={{marginTop: "5px"}}
                        >
                            Submit
                        </Button>
                    </Form>
                </>
                }
            </section>
            
            
        </Container>
    )
}

export default AboutPage