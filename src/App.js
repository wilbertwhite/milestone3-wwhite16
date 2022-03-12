import { useState, useEffect, useRef } from 'react';
import './App.css';

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
          Your Review of {props.movie}:
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
        <ul>
          {listReviews}
        </ul>
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

  function handleClickSave() {
    fetch('/handle_user_reviews', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => { console.log(info); })
  }

  /*
  function handleChangeEdit(event) {
    console.log(event.target.value)
    const newData = data.slice()
    newData[index].comment = value
    setData(newData)
  }
  */

  return (
    <div>
      {console.log(data)}
      <ReviewList reviews={data} />
      <form>
        <button
          type="submit"
          value="Submit"
          onClick={async () => {
            const response = await fetch("/handle_user_reviews", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })

            if (response.ok) {
              console.log("it worked")
              alert(response)
            }
          }

          }>Submit</button>
      </form>
    </div>
  );

}

export default App;