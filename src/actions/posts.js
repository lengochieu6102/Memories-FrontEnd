import * as api from '../api';

//Action creators

export const getPosts = () => async(dispatch )=>{
    try{
        const {data} = await api.fetchPosts();
        dispatch({
            type: 'FETCH_ALL',
            payload:data,
        })

    }  catch (err){
        console.log(err.message);
    }
}
export const createPost = (post) => async(dispatch )=>{
    try{
        const {data} = await api.createPost(post);
        dispatch({
            type: 'CREATE_POST',
            payload:data,
        })

    }  catch (err){
        console.log(err.message);
    }
}
export const updatePost = (id,post) => async(dispatch )=>{
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({
            type: 'UPDATE_POST',
            payload:data,
        })

    }  catch (err){
        console.log(err);
    }
}

export const deletePost = (id) => async(dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({
            type:'DELETE_POST',
            payload: id,
        })
    } catch (err){
        console.log(err);    
    }
}

export const likePost = (id) => async(dispatch)=>{
    try{
        const res=await api.likePost(id);
        console.log(res);
        dispatch({
            type:'LIKE_POST',
            payload: res.data,
        })
    } catch (err){
        console.log(err);    
    }
}