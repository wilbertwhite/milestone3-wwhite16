import { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [data, setData] = useState([]);
  const [saveClicked, setSaveClicked] = useState(false)

  const fetchData = async () => {
    const response = await fetch("/user_reviews")
    const data = await response.json()
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  /* review component */
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

  /* function to display all review components as list */
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
          <div>
            <ul>
              {listReviews}
            </ul>
          </div>
        }
        {listReviews.length === 0 &&
          <div>No Comments</div>
        }
      </div>
    );
  }


  /* function to handle data state upon 
  clicking delete button */
  function handleClickDelete(index) {
    console.log(index)
    const newData = data
    newData.splice(index, 1)
    const newState = newData
    console.log(newState)
    setData([...newState])
  }


  /* function to send review 
  data to flask server upon
  clicking save button */
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
    if (saveClicked === false) {
      setSaveClicked(true)
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
      </div>
      <form>
        <button
          className="SaveButton"
          type="submit"
          value="Save"
          onClick={handleClickSave}>Save</button>
      </form>
      {saveClicked === true
        && <div>
          Reviews saved successfully
        </div>
      }
    </body>
  );

}

export default App;