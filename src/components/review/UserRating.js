import React, { useContext, useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { UserContext } from '../UserContext';
import axios from 'axios';

function UserRating(props) {
  const value = useContext(UserContext);
  const userId = value.userId;

  let receivingUserId = props.match.params.receivingUserId;

  const [userReviewList, setUserReviewList] = useState([]);
  const [totalStars, setTotalStars] = useState([]);
  const [resultsWithPercentage, setResultsWithPercentage] = useState({});

  useEffect(() => {
    axios.get(`/api/get-user-by-id/${receivingUserId}`).then((response) => {
      setUserReviewList(response.data.reviews);
      response.data.reviews.forEach((review) => {
        setTotalStars((oldArray) => [...oldArray, review.starNumber]);
      });
    });
    axios
      .get(`/api/get-all-stars-from-user-review/${receivingUserId}`)
      .then((response) => {
        setResultsWithPercentage(response.data);
      });
  }, [receivingUserId]);

  let StarRating = (totalStars) => {
    let elements = [];
    for (let i = 0; i < totalStars; i++) {
      elements.push(<i className="fas fa-star fa-sm text-warning"> </i>);
    }
    for (let j = 0; j < 5 - totalStars; j++) {
      elements.push(<i className="far fa-star fa-sm text-warning"> </i>);
    }
    return elements;
  };

  let AverageStarRating = () => {
    let elements = [];
    for (
      let i = 0;
      i <
      Math.floor(totalStars.reduce((a, b) => a + b, 0) / userReviewList.length);
      i++
    ) {
      elements.push(<i className="fas fa-star fa-sm text-warning"> </i>);
    }
    for (
      let j = 0;
      j <
      5 -
        Math.floor(
          totalStars.reduce((a, b) => a + b, 0) / userReviewList.length
        );
      j++
    ) {
      elements.push(<i className="far fa-star fa-sm text-warning"> </i>);
    }

    return elements;
  };

  return (
    <>
      <div
        style={{
          margin: '50px',
          padding: '50px',
          backgroundColor: '#a5d5c8',
          width: '800px',
          borderRadius: '20px',
        }}
      >
        <div style={{ marginTop: '40px' }}>
          <h2>
            Reviews{' '}
            <small style={{ color: 'grey', fontSize: '20px' }}>
              ({userReviewList && userReviewList.length} reviews)
            </small>
          </h2>
        </div>

        <div className="container">
          <div
            style={{
              fontSize: '50px',
              lineHeight: '58px',
              marginBottom: '15px',
            }}
          >
            {userReviewList &&
              Math.round(
                (totalStars.reduce((a, b) => a + b, 0) /
                  userReviewList.length) *
                  10
              ) / 10}
          </div>
          {AverageStarRating()}
          <p style={{ color: 'grey' }}>
            {userReviewList && userReviewList.length} reviews
          </p>
        </div>
        <div style={{ margin: '20px', padding: '20px' }}>
          <h2>User rating</h2>

          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '15px',
              }}
            >
              5 stars ({resultsWithPercentage[5]})
            </span>
            <ProgressBar
              variant="success"
              now={(resultsWithPercentage[5] * 100) / totalStars.length + 1}
              style={{ width: '400px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '15px',
              }}
            >
              4 stars ({resultsWithPercentage[4]})
            </span>
            <ProgressBar
              variant="warning"
              now={(resultsWithPercentage[4] * 100) / totalStars.length + 1}
              style={{ width: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '15px',
              }}
            >
              3 stars ({resultsWithPercentage[3]})
            </span>
            <ProgressBar
              variant="danger"
              now={(resultsWithPercentage[3] * 100) / totalStars.length + 1}
              style={{ width: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '15px',
              }}
            >
              2 stars ({resultsWithPercentage[2]})
            </span>
            <ProgressBar
              variant="danger"
              now={(resultsWithPercentage[2] * 100) / totalStars.length + 1}
              style={{ width: '400px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                color: 'blue',
                textDecoration: 'underline',
                fontSize: '15px',
              }}
            >
              1 star ({resultsWithPercentage[1]})
            </span>
            <ProgressBar
              variant="info"
              now={(resultsWithPercentage[1] * 100) / totalStars.length + 1}
              style={{ width: '400px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '80px', marginLeft: '50px' }}>
          {userReviewList &&
            userReviewList.map((review, index) => {
              return (
                <div key={index} style={{ marginTop: '40px' }}>
                  <h4>{review.title}</h4>
                  <div>
                    Given by : {review.userWhoIsGivingName}
                    <p>Date : {review.date}</p>
                  </div>
                  <div>{StarRating(review.starNumber)}</div>
                  <div
                    style={{
                      padding: '40px',
                      marginTop: '15px',
                      marginBottom: '30px',
                    }}
                  >
                    {review.review}
                  </div>
                  <div
                    style={{ border: 'solid 0.5px', borderColor: '#656262' }}
                  >
                    {' '}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: '20px', marginBottom: '40px' }}
      >
        <button
          className="btn btn-outline-dark"
          style={{ marginRight: '5px' }}
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </>
  );
}

export default UserRating;
