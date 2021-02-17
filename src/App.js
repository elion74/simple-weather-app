import React, { useState } from 'react';
import Display from './Display.js';

import mystyles from './index.module.css';

export default function App(){
    

    var key = process.env.REACT_APP_API_KEY;
    const [name, setName] = useState('');
    const [weathertemp, setWeathertemp] = useState( [] );
    var [weatherlook, setWeatherlook] = useState( [] );
    const [isclicked, setIsclicked] = useState(false);

    const [weathericonurl, setWeathericonurl] = useState('');

    var d =  <Display weathertemp = {weathertemp}  weathericonurl = {weathericonurl}  name={name}/>


    const changeinput = (e) => {
            setName(e.target.value);
            setIsclicked(false);        
    }

    const submithandler = (event) => {
        event.preventDefault();

        setIsclicked(true);

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${key}`)
            .then(response => {
                return response.json();
            })
            .then( responseval => {
                console.log(responseval);
               setWeathertemp(responseval.main);
               setWeatherlook(responseval.weather[0]);
             
                const iconid = responseval.weather[0].icon;
                const iconurl = 'http://openweathermap.org/img/wn/'+iconid+'@2x.png'; 
                console.log(iconurl);

                fetch(iconurl)
                    .then( response => {
                       console.log(response);
                       setWeathericonurl(response.url);
                    })
                    .catch( err => {
                        console.log(err);
                    });
            })
            .catch( err => {
                console.log(err);
            });
    }


return( 

<div className = {mystyles.app}>

    <div className = {mystyles.weatherbox}> 

        <h1 className = {mystyles.title}>Weather:</h1>  

        <form onSubmit = { (event) => submithandler(event)}>

            <input 
             className = {mystyles.weatherinput} 
             placeholder = 'cityname, shorthandcountry'
             type = 'text'
             onChange = { (e) => {changeinput(e)} }></input>

           <input type = 'submit' 
           className = {mystyles.weathersubmit} 
           value = 'GET' ></input>

        </form>  
    </div>
    
    {/* prüfen ob input voll ist und dann ob submitted wird */}
    {/* d ist Display component ==> weiter oben zu sehen */}
    {
        (name !='') ? (isclicked) ? d :''
                    : ''
    }
</div>

);

}

