//import { useEffect, useState } from "react";
import { Container, Button /*, Row, Spinner*/ } from "react-bootstrap"
import { User } from "../models/user"


interface ReviewsPageProps{
    loggedInUser: User | null,
}

const ReviewsPage = ({loggedInUser}: ReviewsPageProps) => {
    return (
        <Container>
            <div style={{float: "right"}}>
            {loggedInUser
            ? <Button
                style={{float: "right", marginTop: "10px"}}
                variant="light"
                className="button"
                onClick={() => {}}
                >
                Write a Review
            </Button>
            : <h5 style={{ color: "lightblue", marginTop: "10px" }}>Log in to write a review</h5>}
            </div>
            <h1 style={{ color: "lightblue", marginTop: "10px" }}>Reviews</h1>
            
        </Container>
    )
}

export default ReviewsPage