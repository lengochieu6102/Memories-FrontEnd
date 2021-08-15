import React from 'react';
import useStyles from './styles.js';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/posts';


function Post(props) {
    const {post,setCurrentId} =  props ;
    const classes = useStyles();
    const dispatch = useDispatch();

    function handleDeletePost(id){
        dispatch(deletePost(id));
    }

    function handleLikePost(id){
        dispatch(likePost(id));
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} src="abc"/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium"/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag=>`#${tag} `)}</Typography>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() =>handleLikePost(post._id)} >
                    <ThumbUpAltIcon fontSize="small"/>
                    Like
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={()=>handleDeletePost(post._id)} >
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;