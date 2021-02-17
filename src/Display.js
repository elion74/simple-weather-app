import React from 'react';

import mystyles from './display.module.css';
import moment from 'moment';


export default function Display(props){

    return(

        <div className = {mystyles.display}>
            <h1 className = {mystyles.displayheadline}>{props.name}</h1>

            <div className = {mystyles.weatherdata}>
                
                <img src ={props.weathericonurl} className = {mystyles.displayimg} ></img> 
               
                <p>{props.weathertemp.temp}°C</p>
                <p>{moment().format("MMM Do YY")}</p>
            </div>

        </div>

    );


}