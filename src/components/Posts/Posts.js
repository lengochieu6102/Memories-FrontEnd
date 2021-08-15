import React from 'react';
import Post from './Post/Post';
import useStyles from './styles.js';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';


function Posts(props) {
    const {setCurrentId}=props;
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress></CircularProgress> :
            (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}></Post>
                        </Grid>
                    ))}

                </Grid>
            )
    );
}

export default Posts;