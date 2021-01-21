import React, { useState, useEffect } from 'react';
import './automode.css';
import { NavLink } from 'react-router-dom';

function AutoMode() {
    const [companies, setCompanies] = useState(null);
    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
        };
        fetch('http://localhost:5500/getAutoData', requestOptions)
            .then(function(res){
                console.log(res)
                return res.json();
            })
            .then(companies=> {
                console.log(companies);
                setCompanies(companies)
            })            
            .catch(err => console.error(err));
    }, []);

return(
    <div  className="auto-container">
        <NavLink to="/" className="auto-link"/>
        {companies && companies.length>0 && companies.map(card => (
            <div>
                <span>{card.id}</span><br/>
                <span>{card.name}</span><br/><br/>
            </div>
            ))}
    </div>
    )
}

export default AutoMode;