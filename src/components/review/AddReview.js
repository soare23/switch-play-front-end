import React, {useContext, useState} from 'react';
import ReactStars from "react-rating-stars-component";
import {UserContext} from "../UserContext";
import axios from "axios";



function AddReview(props) {

    const value = useContext(UserContext);
    const userId = value.userId;

    let receivingUserId = props.match.params.receivingUserId;

    const [rating, setRating] = useState("");
    const [review, setReview] = useState({
        title : "",
        starNumber : 0,
        review : "",
        userWhoIsGivingName : ""
    })

    const ratingChanged = (newRating) => {
        const s = {...review};
        switch (newRating){
            case 1 :
                setRating("Not recommended");
                s.starNumber = 1;
                setReview(s);
                break;
            case 2 :
                setRating("Poor");
                s.starNumber = 2;
                setReview(s);
                break;
            case 3 :
                setRating("Acceptable");
                s.starNumber = 3;
                setReview(s);
                break;
            case 4 :
                setRating("Good");
                s.starNumber = 4;
                setReview(s);
                break;
            case 5 :
                setRating("Excellent");
                s.starNumber = 5;
                setReview(s);
                break;
        }
    };

    return (
        <div>

            <div className="container" style={{"margin" : "50px", "padding" : "50px", "backgroundColor" : "#a5d5c8", "width" : "400px", "borderRadius" : "20px"}}>
                <div className="row">
{/*REVIEW STARS*/}
                    <b style={{"marginTop" : "6px", "marginRight" : "2.5px"}}>Rating : </b>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />
                    <div style={{"marginTop" : "6px", "marginLeft" : "10px"}}>{rating}</div>
                </div>
{/*REVIEW TITLE*/}
                <div style={{"marginTop" : "25px"}}><b>Review title : </b></div>
                <input style={{"width" : "291px"}} type="text" placeholder={"Mandatory"} onChange={(e) => {
                    const s = {...review};
                    s.title = e.target.value;
                    s.userWhoIsGivingName = value.firstName;
                    setReview(s);
                }}/>
{/*REVIEW BODY*/}
                <div style={{"marginTop" : "25px"}}><b>Review : </b></div>
                <textarea name="" id="" cols="30" rows="5" placeholder={"Describe your experience with the provider"} onChange={(e) => {
                    const s = {...review};
                    s.review = e.target.value;
                    setReview(s);
                }}> </textarea>
{/*REVIEW SUBMIT BUTTON*/}
                <div style={{"marginTop" : "25px"}}>
                    <button className="btn btn-outline-primary" style={{"marginLeft" : "5px"}} onClick={(e) => {
                        e.preventDefault();
                        axios.post(`/api/add-review/${receivingUserId}`, review)
                            .then(() => {
                                alert("Success")
                            })
                    }}>Submit review</button>
                </div>
            </div>

        </div>
    );
}

export default AddReview;