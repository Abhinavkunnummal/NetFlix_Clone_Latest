import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {
  const [apiData,setApiData]=useState([])
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTJmNjMyMzUzY2YzOTMzYzM4N2U3MzY5YTViZWEzZiIsIm5iZiI6MTczMjM1MTg2OC44NjgsInN1YiI6IjY3NDE5NzdjNzAzZTg1NTg5ZDE4ODJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vaxf9t7avv3o2pIrZdQIq_xjr2xKt02_lalxB6Lecg'
    }
  };
  
  
  const handleWheel=(event)=>{
    event.preventDefault()
    cardsRef.current.scrollLeft+=event.deltaY
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular On Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
