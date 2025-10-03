import axios from 'axios';

export const getProperties = async () => {
    const response = await axios.get('http://localhost:3000/api/properties') //Método de axios
    console.log(response.data)
    return response.data
};

export const postProperty = async (property: { name: string; value: number; img: string }) => {
    const response = await axios.post('http://localhost:3000/api/properties', property);
    return response.data;
};