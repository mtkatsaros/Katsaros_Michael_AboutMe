import { useState, useEffect } from 'react'
import './WriteReview.tsx'
import { TReview, getReviews, createReview } from '../../api/Reviews.ts'

function WriteReview (){
    const [reviews, setReviews] = useState<TReview[]>([])
    const [user, setUser] = useState("")
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
        const review = await createReview(user, title, description)
        setReviews([...reviews, review])
        setUser('')
        setTitle('')
        setDescription('')
    }

    return <>
        <h2>Write a Review</h2>
      <div className='create'>
        <form onSubmit={handleCreateReview} className='fields'>
          <ul>
            <li>
              <input 
              placeholder='Username'
              id='review-user'
              value={user}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser(e.target.value)
              }} 
              />
              
            </li>

            <li>
              <input
              placeholder='Title'
              id='review-title'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                setTitle(e.target.value)
              }}
              />
            </li>
              
            <li className='description'>
              
              <textarea
              placeholder='Description'
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