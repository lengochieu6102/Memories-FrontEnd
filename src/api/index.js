import axios from 'axios';

//const url ='http://localhost:5000/posts';
//const url ='https://memories-appaa.herokuapp.com/posts';
const API = axios.create({ baseURL: 'https://memories-appaa.herokuapp.com' })
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

