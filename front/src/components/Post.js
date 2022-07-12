import React, { useState } from 'react';
import Axios from 'axios';
import { formatDate } from '../utils';
import './Post.css';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function Post(props) {
	const [ liked, setLiked ] = useState(0);
	const [ deleted, setDeleted ] = useState([]);

	// const [message, setMessage] = useState('');
	// const navigate = useNavigate();

	console.log(props._id)

	const likeSubmit = () => {
		const id = props._id;
		Axios({
			method: 'post',
			url: 'post/' + id + '/like',
			data: {
				liked: liked
			}
		}).then((response) => {
			const order = response.data.reverse();
			setLiked(order);
		});
	};

	const deleteArticle = () => {
		const id = localStorage['id'];
		console.log(id);
		window.confirm(`La supression d'un article est irreversible, êtes-vous sur ?`);
		Axios({
			method: 'delete',
			url: 'post/' + id
		}).then((res) => {
			console.log(`Le post ${id} à été suprimé`);
			setDeleted(res.data.data);
			window.location = '/';

		});
	};

	// const modify = () => {
	// const id = localStorage['id'];
	// console.log(id);
	// const formData = new FormData();
	// formData.append("image", image);
	// formData.append('post', JSON.stringify({
	// message
	// }));

	// Axios({
	// method: 'put',
	// url: 'post/' + id,
	// data: formData,
	// headers: { "Content-Type": "multipart/form-data" },
	// }).then(({data}) => {
	// alert(data.message);
	// navigate('/post');
	// })
	// .catch(error => {
	// alert('Une erreur est survenue')
	// })
	// };

	return (
		<div className="post card gedf-card">
			<div className="card-header">
				<div className="d-flex justify-content-between align-items-center">
					<div className="d-flex justify-content-between align-items-center">
						<div className="mr-2">
							<img className="rounded-circle" width="45" src={props.user.picture} alt="" />
						</div>
						<div className="ml-2">
							<div className="h5 m-0">{props.user.pseudo}</div>
						</div>
					</div>
					<div className="interaction-block">
						<div>
							<FontAwesomeIcon icon={faPenToSquare} />
						</div>
						<div>
							<FontAwesomeIcon icon={faTrash} onClick={deleteArticle} />
						</div>
					</div>
				</div>
			</div>
			<div className="card-body">
				<div className="text-muted h7 mb-2">
					{' '}
					<i className="fa fa-clock-o" /> {formatDate(props.createdAt)}
				</div>
				<div className="post-img">
					<img src={props.imageUrl} />
				</div>
				<p className="card-text">{props.message}</p>
			</div>
			<div className="card-footer interaction-block">
				<div>
					<FontAwesomeIcon
						icon={faThumbsUp}
						onClick={() => likeSubmit(liked + 1)}
						style={{ color: likeSubmit ? 'blue' : 'black' }}
					/>
				</div>
				<div>
					<FontAwesomeIcon icon={faMessage} />
				</div>
			</div>
		</div>
	);
}
