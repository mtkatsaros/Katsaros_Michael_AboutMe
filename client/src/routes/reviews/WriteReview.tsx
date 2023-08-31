import { useState, useEffect } from 'react'
import './WriteReview.tsx'
import { TReview, getReviews, createReview } from '../../api/Reviews.ts'

function WriteReview (){
    const [reviews, setReviews] = useState<TReview[]>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(()=>{
        async function fetchReviews(){
            const newReviews = await getReviews()
            setReviews(newReviews)
        }
        fetchReviews()
    }, [])

    async function handleCreateReview(e: React.FormEvent){
        e.preventDefault()
        //TODO: add the current user to the review
        const review = await createReview("user123", title, description)
        setReviews([...reviews, review])
        setTitle('')
        setDescription('')
    }

    return <>
        <h2>Write a Review</h2>
      <div className='create'>
        <form onSubmit={handleCreateReview} className='fields'>
          <ul>
            
            <li>
                <label>Title</label>
              <input
              id='review-title'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                setTitle(e.target.value)
              }}
              />
            </li>
              
            <li className='description'>
                <label>Description</label>
              <textarea
              id='review-description'
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>{
                setDescription(e.target.value)
              }}
              />
            </li>
            
          </ul>
          <button>Submit</button>
        </form>
      </div>
    </>
}

export default WriteReview