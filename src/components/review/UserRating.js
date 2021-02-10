import React, {useContext} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {UserContext} from "../UserContext";

function UserRating(props) {

    const value = useContext(UserContext);
    const userId = value.userId;
    let receivingUserId = props.match.params.receivingUserId;

    return (
        <>
            <div>{receivingUserId}</div>
            <div style={{"margin" : "50px", "padding" : "50px", "backgroundColor" : "#75b3a1", "width" : "800px", "borderRadius" : "20px"}}>

                <div style={{"margin" : "20px", "padding" : "20px"}}>
                    <h2>User rating</h2>

                    <div className="user-rating" style={{"marginBottom" : "20px"}}>
                        <i className="fas fa-star fa-sm text-warning"> </i>
                        <i className="fas fa-star fa-sm text-warning"> </i>
                        <i className="fas fa-star fa-sm text-warning"> </i>
                        <i className="far fa-star fa-sm text-warning"> </i>
                        <i className="far fa-star fa-sm text-warning"> </i>
                    </div>

                <div style={{"marginBottom" : "10px"}}>
                   <ProgressBar variant="success" now={40} style={{"width" : "400px"}}/>
                </div>
                <div style={{"marginBottom" : "10px"}}>
                    <ProgressBar variant="warning" now={20} style={{"width" : "400px"}}/>
                </div>

                <div style={{"marginBottom" : "10px"}}>
                    <ProgressBar variant="danger" now={10} style={{"width" : "400px"}}/>
                </div>

                <div style={{"marginBottom" : "10px"}}>
                    <ProgressBar variant="danger" now={5} style={{"width" : "400px"}}/>
                </div>

                <div style={{"marginBottom" : "10px"}}>
                    <ProgressBar variant="info" now={10} style={{"width" : "400px"}}/>
                </div>
                </div>
            </div>

        </>
    );
}

export default UserRating;