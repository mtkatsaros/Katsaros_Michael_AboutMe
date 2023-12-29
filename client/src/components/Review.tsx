import styles from '../styles/Card.module.css'
import { Card } from "react-bootstrap"
import { Review as ReviewModel } from "../models/review"
import {MdDelete} from 'react-icons/md'

interface ReviewProps {
    review: ReviewModel,
    onReviewClicked: (review: ReviewModel) => void,
    onDeleteReviewClicked: (review: ReviewModel)=> void,
    className?: string,
    isAdmin: boolean,
    isAuthor: boolean,
}

const Review = ({review, onReviewClicked, onDeleteReviewClicked, className, isAdmin, isAuthor} : ReviewProps) => {
    const {
        user,
        title,
        description,
    } = review
    
    return (<>
    <Card 
        className={`${styles.card} ${className}`}
        onClick={() => onReviewClicked(review)}
    >
        <Card.Body>
            {(isAdmin || isAuthor) && (
                <div style={{textAlign: 'right'}}>
                    <MdDelete 
                    className={'ms-auto'}
                    onClick={(e:React.MouseEvent<HTMLDivElement>) => {
                        onDeleteReviewClicked(review)
                        e.stopPropagation()
                    }}
                    />  
                </div>
               
            )}
            
            <Card.Title>
                {user}: {title}              
            </Card.Title>
            <Card.Text className={styles.cardText}>{description}</Card.Text>
            
        </Card.Body>
    </Card>
        
   
    </>)
}

export default Review