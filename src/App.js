import { useState, useEffect, useRef } from 'react';
import './style.css';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/user_reviews")
    const data = await response.json()
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function Review(props) {
    const rating = props.rating;
    const comment = props.comment;
    return (

      <div className="Comment">
        <div className="Movie">
          <b>Your Review of {props.movie}:</b>
        </div>
        {rating.length > 0 &&
          <div className="Rating">
            You rated {props.rating}/10
          </div>
        }
        {comment.length > 0 &&
          <div className="Comment-text">
            "{props.comment}"
          </div>
        }{props.key}

        <div className="Comment-delete">
          <button onClick={props.onClickDelete}>Delete</button>
        </div>

      </div>

    )
  }

  function ReviewList(props) {
    const reviews = props.reviews;

    const listReviews = reviews.map((review, index) =>
      <li>
        {console.log(index)}
        <Review key={index}
          movie={review.movie}
          rating={review.rating}
          comment={review.comment}
          onClickDelete={() => handleClickDelete(index)}
        />
      </li>
    );
    return (
      <div>
        {listReviews.length > 0 &&
          <ul>
            {listReviews}
          </ul>
        }
        {listReviews.length === 0 &&
          <div>No Comments</div>
        }
      </div>
    );
  }



  function handleClickDelete(index) {
    console.log(index)
    const newData = data
    newData.splice(index, 1)
    const newState = newData
    console.log(newState)
    setData([...newState])
  }

  const handleClickSave = async () => {
    const response = await fetch("/handle_user_reviews", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      console.log("it worked")
      console.log(response)
      console.log(data)
    }
  }


  /*remnants of edit
  function handleChangeEdit(event) {
    console.log(event.target.value)
    const newData = data.slice()
    newData[index].comment = value
    setData(newData)
  }
  */

  return (
    <body>
      <h1>Edit Your Reviews</h1>
      <div>
        {console.log(data)}
        <ReviewList reviews={data} />
        <form>
          <button
            className="SaveButton"
            type="submit"
            value="Save"
            onClick={handleClickSave}>Save</button>
        </form>
      </div>
    </body>
  );

}

export default App;