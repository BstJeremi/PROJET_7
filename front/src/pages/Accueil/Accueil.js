import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner';

export default function Accueil() {
	const [ posts, setPosts ] = useState(null);

	function deletePost(postId) {
		//On retrouve l'id du post supprimé et on le retire du tableau afin qu'il disparaisse à l'écran
		const index = posts.findIndex((post) => post._id === postId);
		/*Si l'élément existe bien on le supprime,
         on travaille sur une copie du tableau pour ne pas modifier directement des objets dans le state
        */
		if (index >= 0) {
			const copiePosts = [ ...posts ];
			copiePosts.splice(index, 1);
			setPosts(copiePosts);
		}
	}

	useEffect(() => {
		axios.get('post').then(({ data }) => {
			setPosts(data);
		});
	}, []);

	let content = <Spinner />;

	if (posts != null) {
		content = posts.map((post) => <Post key={post._id} {...post} deletePost={deletePost} />);
	}

	return <div className="col-md-12">{content}</div>;
}
