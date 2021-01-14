import React, {useEffect, useState} from 'react'
import axios from 'axios';


export default function SearchGame() {
    const [display, setDisplay] = useState(true);
    const [options, setOptions] = useState([]);
    const [search, setSearch]= useState("");
    const [title, setTitle]=useState("");
    const[gamesList,setGames] =useState([]);

    
    function handleSearchInput(e){
        const search = e.target.value;
        setSearch(search);  
        axios.get(`https://api.rawg.io/api/games?key=a0200251f0824f9291c541b963f86c46&page_size=10&search=${search}`).then(res=>{
            const data = res.data.results;
            setOptions(data);
        })
        
    }


    return (
        <div>
            
            <div className="d-flex justify-content-center">
                <h1 style={{marginTop: '15px', fontFamily: "'Source Serif Pro', serif", fontSize: '30px'}}>Search for a game</h1>
            </div>
            <div className="d-flex justify-content-center">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Enter game name..." aria-label="Search" onChange={handleSearchInput}/>
                </form>
            </div>
            <div>
                {options.map(res=>{
                    return <h5 onClick={e =>{
                        e.preventDefault();
                        const title = res.name;
                        setTitle(title)
                        axios.get(`/api/get-offer/${title}`).then(result=>{
                            let games = result.data;
                            setGames(games)
                            console.log(games)
                        })
                    }}>{res.name}</h5>
                })}
            </div>




            <div className="d-flex justify-content-center">  
                    {gamesList.map(selectedGame=>

                    <div className="d-flex justify-content-center">
                    <div className="card" style={{"width": "18rem", "marginTop" : "20px"}}>
                        <img className="card-img-top" src={selectedGame.game.picture} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{selectedGame.game.title}</h5>
                                <p className="card-text">Category : {selectedGame.game.category}</p>
                                <p className="card-text">User : {selectedGame.user.firstName}</p>
                                <p className="card-text">Rating : {selectedGame.game.rating}</p>
        

                            </div>
                    </div>
                </div>)}
             </div>  
            
        </div>
    )
}
