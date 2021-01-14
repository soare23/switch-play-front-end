import React, {useEffect, useState} from 'react'
import axios from 'axios';


export default function SearchGame() {
    const [display, setDisplay] = useState(true);
    const [options, setOptions] = useState([]);
    const [search, setSearch]= useState("");
    const [title, setTitle]=useState("");
    const[gamesList,setGames] =useState([]);

    
    function handleSearchInput(e){
        setSearch(e.target.value);  
        axios.get(`https://api.rawg.io/api/games?key=a0200251f0824f9291c541b963f86c46&page_size=10&search=${search}`).then(res=>{
            const data = res.data.results;
            setOptions(data);
        })
        
    }

    

    return (
        <div>
            <form>
                <input onChange={handleSearchInput}>
                </input>
                <button>Submit</button>
            </form>
            <div >
                {display ? 
                options.map(res=>{
                    return <h5 onClick={e =>{
                        e.preventDefault();
                        setTitle(res.name);
                        axios.get(`/api/get-offer/${title}`).then(res=>{
                            setGames(res.data)
                        })
                    }}>{res.name}</h5>
                }) : " false "}
            </div>
        </div>
    )
}
