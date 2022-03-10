import { useState, useEffect } from 'react';
import { Review } from './Review.js';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/user_reviews")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {data.map(review => (
          <div>
            you rated {review.movie} {review.rating}/10
            <div>
              "{review.comment}"
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
