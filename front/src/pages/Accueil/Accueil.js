import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner';

export default function Accueil() {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        axios.get('post')
        .then(({ data }) => {
            setPosts(data);
        })
    }, [])

    let content = <Spinner />;

    if (posts != null) {
        content = posts.map(post => 
            <Post key={post._id} {...post} />
        )
    }

    return (
        <div className="col-md-12">
            {content}
        </div>
    )
}