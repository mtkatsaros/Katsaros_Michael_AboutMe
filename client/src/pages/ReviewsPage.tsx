import { useEffect, useState } from "react";
import { Container, Button , Row, Spinner } from "react-bootstrap"
import { Review as ReviewModel } from "../models/review";
import Review from "../components/Review";
import { User } from "../models/user"
import * as ReviewsApi from "../network/review_api";
import AddEditReviewDialog from "../components/AddEditReviewDialog";



interface ReviewsPageProps{
    loggedInUser: User | null,
}

const ReviewsPage = ({loggedInUser}: ReviewsPageProps) => {
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [showReviewsLoadingError, setShowReviewsLoadingError] =
      useState(false);
  
    const [showAddReviewDialog, setShowAddReviewDialog] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState<ReviewModel | null>(null);
  
    useEffect(() => {
      async function loadReviews() {
        try {
          setShowReviewsLoadingError(false);
          setReviewsLoading(true);
          const fetchedReviews = await ReviewsApi.fetchReviews();
          setReviews(fetchedReviews);
        } catch (error) {
          console.error(error);
          setShowReviewsLoadingError(true);
        } finally {
          setReviewsLoading(false);
        }
      }      
      loadReviews();
    }, []);
  
    const reviewsGrid = (
      <Row className="g-2">
        {reviews.map((review) => (
          <Review
            review={review}
            key={review._id}
            onReviewClicked={setReviewToEdit}
            onDeleteReviewClicked={deleteReview}
            isAdmin={loggedInUser?.admin === "true"}
            isAuthor={loggedInUser?.uid === review.uid}
          />
        ))}
      </Row>
    );
  
    async function deleteReview(review: ReviewModel) {
      try {
        setShowReviewsLoadingError(false);
        setReviewsLoading(true);
        await ReviewsApi.deleteReview(review._id);
        setReviews(
          reviews.filter(
            (existingReviews) => existingReviews._id !== review._id
          )
        );
      } catch (error) {
        console.error(error);
        setShowReviewsLoadingError(true);
      } finally {
        setReviewsLoading(false);
      }
    }
  
    return (
        <Container>
            <div style={{float: "right"}}>
            {loggedInUser
            ? <Button
                style={{float: "right", marginTop: "10px"}}
                variant="light"
                className="button"
                onClick={() => setShowAddReviewDialog(true)}
                >
                Write a Review
            </Button>
            : <h5 style={{ color: "lightblue", marginTop: "10px" }}>Log in to write a review</h5>}
            </div>
            <h1 style={{ color: "lightblue", marginTop: "10px" }}>Reviews</h1>
            {reviewsLoading && <Spinner animation="border" variant="primary" />}
            {showReviewsLoadingError && (
            <p>Something went wrong. Please refresh the page</p>
            )}
            {!reviewsLoading && !showReviewsLoadingError && (
            <>{reviews.length > 0 ? reviewsGrid : <p>No reviews found.</p>}</>
            )}

            {showAddReviewDialog && loggedInUser && (
            <AddEditReviewDialog
                loggedInUser={loggedInUser}
                onDismiss={() => setShowAddReviewDialog(false)}
                onReviewSubmitted={(newReview) => {
                setReviews([...reviews, newReview]);
                setShowAddReviewDialog(false);
                }}
            />
            )}
            {reviewToEdit && loggedInUser &&(
            <AddEditReviewDialog
                loggedInUser={loggedInUser}
                reviewToEdit={reviewToEdit}
                onDismiss={() => setReviewToEdit(null)}
                onReviewSubmitted={(updatedReview) => {
                setReviews(
                    reviews.map((existingReview) =>
                    existingReview._id === updatedReview._id
                        ? updatedReview
                        : existingReview
                    )
                );
                setReviewToEdit(null);
                }}
            />
            )}
        </Container>
    )
}

export default ReviewsPage