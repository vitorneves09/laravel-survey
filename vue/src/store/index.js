import axios from "axios";
import {createStore} from "vuex";
import axiosClient from "../axios";

const  tmpSurverys = [
    {
        id:100,
        title:"TheCodeHolic",
        slug:"theCodehoic",
        status:'draft',
        image:"https://www.pngall.com/wp-content/uploads/13/Dachshund-PNG-Image.png",
        description:'<h2>the most of beatiful dog<h2>',
        create_at:"2023-04-05 00:00:00",
        update_at:"2023-04-05 00:00:00",
        expire_at:"2023-04-05 00:00:00",
        questions:[
            {
                id:1,
                type:'select',
                question:"from which country are you?",
                data:{
                    options:[
                        {uuid: '324b33a2-7268-4f5c-97d7-9e6ca18d65e6', text:"USA"},
                        {uuid: '73384cae-73f3-4519-b1f0-3beeaba99fd0', text:"Georgia"},
                        {uuid: '5768c214-3b91-4c98-8d0e-6c7ed416b780', text:"germany"},
                    ]
                }
            }
        ],
    
    },
    {
        id:100,
        title:"TheCodeHolic",
        slug:"theCodehoic",
        status:'draft',
        image:"https://www.pngall.com/wp-content/uploads/13/Dachshund-PNG-Image.png",
        description:'<h2>the most of beatiful dog 2<h2>',
        create_at:"2023-04-05 00:00:00",
        update_at:"2023-04-05 00:00:00",
        expire_at:"2023-04-05 00:00:00",
        questions:[
            {
                id:1,
                type:'select',
                question:"from which country are you?",
                data:{
                    options:[
                        {uuid: '324b33a2-7268-4f5c-97d7-9e6ca18d65e6', text:"USA"},
                        {uuid: '73384cae-73f3-4519-b1f0-3beeaba99fd0', text:"Georgia"},
                        {uuid: '5768c214-3b91-4c98-8d0e-6c7ed416b780', text:"germany"},
                    ]
                }
            }
        ],
    
    }
];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surverys:[...tmpSurverys],
    },
    getters: {},
    modules: {},
    mutations: {
        logout: state =>{
            state.user.data = {};
            state.user.token = null;
        },
        setUser: (state,userData) =>{
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN',userData.token);
        },
    },
    actions: {
        register({commit},user){
            return axiosClient.post('/register',user)
            .then(({data})=>{
                commit('setUser',data);
                return data;
            })
        },
        login({commit},user){
            return axiosClient.post('/login',user)
            .then(({data})=>{
                commit('setUser',data);
                return data;
            })
        },
        logout({commit}){
            return axiosClient.post('/logout')
            .then(response =>{
                commit('logout');
                return response;
            })
        }

    }
});

export default store;
