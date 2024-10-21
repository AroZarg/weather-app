import React, { useState } from "react"
import { useNavigate,useSearchParams} from "react-router-dom"
import './Wrapper.scss'
const Wrapper = ({children})=>{
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [city,setCity] = useState(searchParams.get('city')||'')
    return(
        <div className="wrapper">
            <div className="header">
                <div className="search-container">
                    <input placeholder="Search" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    <button onClick={()=>{
                        if(city){
                            navigate(`?city=${city}`)
                        }
                    }} disabled={!city}>Search</button>
                </div>
                
            </div>
            <div className="main-wrapper">
            {children}
            </div>
           
        </div>
    )
}

export default Wrapper