import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../utils';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../AppContext';
import Spinner from './Spinner';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export default function Post(props) {
	const [liked, setLiked] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [imageUrl, setImageUrl] = useState(props.imageUrl);
	const [message, setMessage] = useState(props.message);
	const [image, setImage] = useState(null);
	const [likesCount, setLikesCount] = useState(props.likesCount);
	const { appContext } = useContext(AppContext);
	let userInfos = null;

	if (appContext.isConnected) {
		userInfos = jwtDecode(localStorage.getItem('token'));
	}

	useEffect(() => {
        if (userInfos) {
			const index = props.usersLiked.findIndex(item => item === userInfos.userId);
			setLiked(index >= 0);
		}
    }, [props.usersLiked])

	const likeSubmit = () => {
		if (!appContext.isConnected) {
			alert('Vous devez vous connecter');
		}
		const id = props._id;
		axios({
			method: 'post',
			url: 'post/' + id + '/like',
			data: {
				liked: liked
			}
		}).then(({data}) => {
			//Permet de colorer l'icône de like en bleu ou pas
			setLiked(data.liked);
			setLikesCount(data.likesCount);
		});
	};

	const updatePost = e => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
        if (image) {
			formData.append("image", image);
		}

        formData.append('post', JSON.stringify({
            message
        }));

        axios({
            method: "PUT",
            url: 'post/' + props._id,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(({data}) => {
            alert(data.message);
			setLoading(false);
			setEditMode(false);

			//Si l'image a été modifiée
			if (data.imageUrl) {
				setImageUrl(data.imageUrl);
			}
        })
        .catch(error => {
			setLoading(false);
            alert('Une erreur est survenue')
        })
	}

	const deletePost = () => {
		const id = props._id;
		setLoading(true);
		if (window.confirm(`La supression d'un article est irreversible, êtes-vous sûr ?`)) {
			axios.delete('post/' + id)
			.then(({ data }) => {
				alert(data.message);
				props.deletePost(id);
				setLoading(false);
			})
			.fail(err => {
				setLoading(false);
			});
		}
	};

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
						{
							//On affiche les boutons si l'utilisateur est connecté et qu'il a le droit de modifier le poste
							//Et également si un processus n'est pas en court
							appContext.isConnected && !loading && (userInfos.isAdmin || userInfos.userId === props.user._id) &&  (
									<>
										<div>
											<FontAwesomeIcon onClick={e => {
												setEditMode(true);
											}} icon={faPenToSquare} />
										</div>
										<div>
											<FontAwesomeIcon icon={faTrash} onClick={deletePost} />
										</div>
									</>
							)
						}
					</div>
				</div>
			</div>
			<div className="card-body">
				<div className="text-muted h7 mb-2">
					{' '}
					<i className="fa fa-clock-o" /> {formatDate(props.createdAt)}
				</div>
				<div className="post-img">
					<img src={imageUrl} alt="Illlustration poste"/>
				</div>
				
				{ loading ? <Spinner /> : <p className="card-text"> {message} </p>}
			</div>
			<div className="card-footer interaction-block">
				<div className='iconBlock'>
					<FontAwesomeIcon
						icon={faThumbsUp}
						onClick={() => likeSubmit(liked + 1)}
						style={{ color: liked ? '#FD2D01' : 'black' }}
					/>
					<p>{likesCount}</p>
				</div>
			</div>
			{ 
				editMode &&
				<form onSubmit={updatePost} className="edit-form" style={{backgroundColor: "#FFD7D7"}}>
					<div className="form-group" style={{ marginTop: 10 }}>
						<label htmlFor="image">Image</label>
						<input
							type="file"
							className="form-control"
							name="image"
							onChange={e => setImage(e.target.files[0])}
						/>
					</div>
					<div className="form-group" style={{ marginTop: 10 }}>
						<label htmlFor="content">Message</label>
						<textarea className="form-control" onChange={e => setMessage(e.target.value)} value={message}></textarea>
					</div>
					{
						!loading &&
						<button type="submit" className="btn btn-primary" href="/" style={{ marginTop: 20, backgroundColor: "#FD2D01", borderColor: "#FD2D01" }}>
							Mettre à jour
						</button> 
					}
				</form>
			}
		</div>
	);
}
