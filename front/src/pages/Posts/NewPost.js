import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../AppContext";

const NewPost = () => {
	const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

	const validate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append('post', JSON.stringify({
            message
        }));

        axios({
            method: "POST",
            url: 'post',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(({data}) => {
            alert(data.message);
            navigate('/');
        })
        .catch(error => {
            alert('Une erreur est survenue')
        })
	};

	return (
		<form onSubmit={validate} class="post-gen">
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
				<textarea value={message} onChange={e => setMessage(e.target.value)} className="form-control"></textarea>
			</div>
			<button disabled={image == null|| message == ''} type="submit" className="btn btn-primary" href="/" style={{ marginTop: 20 }}>
				Valider
			</button>
		</form>
	);
}

export default NewPost

