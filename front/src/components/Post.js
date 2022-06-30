import React from 'react';
import { formatDate } from '../utils';
import './Post.css'; 

export default function Post(props) {
    return (
        <div className="post card gedf-card" style={{marginLeft: 200, marginRight: 200}}>
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
                </div>

            </div>
            <div className="card-body">
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {formatDate(props.createdAt)}</div>
                <div className="post-img">
                    <img src={props.imageUrl}/>
                </div>
                <p className="card-text">
                    {props.message}
                </p>
            </div>
            <div className="card-footer interaction-block">
                <div>
                    <i className="fa fa-gittip"></i> Like
                </div>

                <div>
                    <i className="fa fa-comment"></i> Commentaire
                </div>
            </div>
        </div>
    )
}