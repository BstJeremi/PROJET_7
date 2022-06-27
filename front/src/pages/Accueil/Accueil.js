import React, { useState, useEffect } from 'react'

export default function Accueil() {

    const [ dataPost, setDataPost ] = useState()

    useEffect(() => {
        fetch("http://localhost:4000/api/post/")
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            setDataPost(data[0].imageUrl)
        })
    }, [])

  return (
    <div className="home_main">
        { dataPost && <img src={dataPost} style={{width: '300px'}} alt="plante"/>}
    </div>
  )
}
