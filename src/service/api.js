import axios from 'axios';


const url = 'https://vchat-server-5tdv.onrender.com'
export const addUser = async (data) => {
    try {
        await axios.post(`${url}/add`, data)
    } catch (error) {
        console.log('Error while ading users', error.message)
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`)
        return response.data
    } catch (error) {
        console.log('Error while fetching users', error.message)
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data)
    } catch (error) {
        console.log('Error while sending conversation', error.message)
    }
}

export const getConversation = async (data) => {
    try {
        const res = await axios.post(`${url}/conversation/get`, data)
        return res.data
    } catch (error) {
        console.log('Error while getting conversation', error.message)
    }
}

export const newMessage = async (data) => {
    try {
        await axios.post(`${url}/message/add`, data)
    } catch (error) {
        console.log('Error while sending message', error.message)
    }
}

export const getMessages = async (id) => {
    try {
        const res = await axios.get(`${url}/message/get/${id}`);
        return res.data
    } catch (error) {
        console.log('Error while fetching messages', error.message)
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${url}/file/upload`, data)
    } catch (error) {
        console.log('Error while uploading file', error.message)
    }
}

export const getFile = async (id) => {
    try {
        const file = await axios.get(`${url}/file/${id}`)
        return file.data
    } catch (error) {
        console.log('Error while getting file', error.message)
    }
}