import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function Inbox() {
    const value = useContext(UserContext);
    const userId = value.userId
    const [Inbox, setInbox] = useState({});
    const [sentMessages, setSentMessages] = useState([]);

    useEffect(() => {

        axios
            .get(`/api/get-inbox/${userId}`, {
               
            })
            .then((response) => {
                console.log(response.data)
                setInbox(response.data)
                setSentMessages(response.data.receivedMessages)
      })},[])
    return (
        <div>
            <button onClick={()=>setSentMessages(Inbox.receivedMessages)}> Sent </button>
            <button onClick={()=>setSentMessages(Inbox.sentMessages)}>Received</button>
        
        <div>
            <table className="table w-100">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Sender</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Message</th>
                    </tr>
                </thead>
                <tbody>
                {sentMessages.map((res)=>{
                return(
                <tr>
                    <td>{res.date}</td>
                    <td>{res.senderUserName}</td>
                    <td>{res.receiverUserName}</td>
                    <td>{res.message}</td>
                </tr>
                )})}
                </tbody>
            </table>
        </div>
        </div>
    )
}

