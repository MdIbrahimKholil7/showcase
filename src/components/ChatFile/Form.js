import React, { useEffect, useState } from 'react';
import { BiSupport } from 'react-icons/bi';
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRef } from 'react';
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:5000'


const Form = (props) => {

    const socket = useRef()
    const [messages, setMessages] = useState([])
    const [cookies, removeCookie] = useCookies(["token"]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [chats, setChats] = useState([])
    const { id } = useParams()
    const scrollRef = useRef();
    const [currentUserId, setCurrentUserId] = useState('')
    const [refresh, setRefresh] = useState(true)


    useEffect(() => {

        fetch(`https://api.showcaseurbusiness.com/api/message/get-message/637737f0a11e400551d0593d`, {
            headers: {
                "Authorization": cookies?.token,
            },
        })
            .then(res => res.json())
            .then(data => setChats(data?.data))

    }, [cookies])

    console.log(id)

    useEffect(() => {
        if (currentUserId) {
            console.log(currentUserId)
            socket.current = io(ENDPOINT);
            socket.current.emit("add-user", currentUserId);
        }
    }, [currentUserId, socket]);




    useEffect(() => {
        console.log('socket', socket)
        if (socket.current) {
            console.log('ref', socket)
            socket.current.on("msg-recieve", (msg) => {
                console.log('recieve-msg', msg)
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, [currentUserId, refresh]);


    useEffect(() => {
        console.log(arrivalMessage)
        arrivalMessage && setChats((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);
    console.log(chats)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://api.showcaseurbusiness.com/api/message/get-user-id', {
                    headers: {
                        "Authorization": cookies?.token,
                    },
                })
                // console.log(data)
                setCurrentUserId(data?.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [cookies])


    console.log(currentUserId)


    const handleForm = async (e) => {
        e.preventDefault()


        socket.current.emit("send-msg", {
            to: '637737f0a11e400551d0593d',
            from: currentUserId,
            msg: e.target.input.value,
        });
        setRefresh(!refresh)
        setChats([...chats, { fromSelf: true, message: e.target.input.value }])
        console.log('chats', chats)
        try {

            const { data } = await axios.post(`https://api.showcaseurbusiness.com/api/message/add-message`,
                {
                    text: e.target.input.value,
                    to: '637737f0a11e400551d0593d'
                },
                {
                    headers: {
                        "Authorization": cookies?.token,
                    },

                })
            console.log(data)

        } catch (error) {
            console.log(error)
        }

        console.log('click')
        e.target.reset()
    }





    return (
        <div>
            <div
                style={{
                    opacity: props.visible ? '1' : '0',
                    width: props.visible ? '400px' : '0px',
                    height: props.visible ? '500px' : '0px',
                }}
                className={
                    `fixed bottom-[150px] right-[20px]  bg-white rounded-xl form shadow-xl hidden md:block`
                }>
                <div className='p-2 max-h-[420px]  overflow-y-auto'>
                    <p className='text-center py-3 font-bold text-xl'>Customer Supporter</p>
                    <div
                        className=''
                    >
                        {
                            chats?.map((chat, i) => <div
                                className={`flex ${chat?.fromSelf ? 'justify-end' : 'justify-start'}   my-3  `}
                            >
                                <span className='bg-gray-300 p-3 rounded-[30%]'> {chat?.message}</span>
                            </div>)
                        }
                    </div>

                </div>
                <div className='absolute bottom-0 left-0 w-full my-4 px-5 '>
                    <form
                        onSubmit={handleForm}
                        className='flex gap-7' action="">
                        <input name='input' type="text" placeholder="Type here" className="input input-bordered w-full rounded-full" />
                        <button type='submit' className="py-2 lg:flex px-6 text-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors delay-100 ease-out rounded-full">Send</button>
                    </form>
                </div>
                <ToastContainer />
            </div>

            <div
                style={{
                    opacity: props.visible ? '1' : '0',
                    width: props.visible ? '300px' : '0px',
                    height: props.visible ? '450px' : '0px',
                }}
                className={
                    `fixed bottom-[150px] right-[20px]  bg-white rounded-xl form shadow-xl block md:hidden`
                }>
                <div className='p-2 max-h-[370px]  overflow-y-auto'>
                    <p className='text-center py-3 font-bold text-xl'>Customer Supporter</p>
                    <div
                        className=''
                    >
                        {
                            chats?.map((chat, i) => <div
                                className={`flex ${chat?.fromSelf ? 'justify-end' : 'justify-start'}   my-3  `}
                            >
                                <span className='bg-gray-300 p-3 rounded-[30%]'> {chat?.message}</span>
                            </div>)
                        }
                    </div>

                </div>
                <div className=' w-full my-4 px-5 '>
                    <form
                        onSubmit={handleForm}
                        className='flex gap-7' action="">
                        <input 
                        autoComplete='off'
                        name='input' type="text" placeholder="Type here" className="input input-bordered w-full rounded-full" />
                        <button type='submit' className="py-2 lg:flex px-6 text-lg text-white bg-blue-500 hover:bg-blue-400 transition-colors delay-100 ease-out rounded-full">Send</button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Form;