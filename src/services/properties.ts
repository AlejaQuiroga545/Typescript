import axios from 'axios';

// GET
export const getProperties = async () => {
    const response = await axios.get('http://localhost:3000/api/properties') //Método de axios
    console.log(response.data)
    return response.data
};

// POST
export const postProperty = async (property: { name: string; value: number; img: string }) => {
    const response = await axios.post('http://localhost:3000/api/properties', property);
    return response.data;
};

// PUT
export const putProperty = async (property: {id:string;name:string;value:number;img:string}) => {
    const response = await axios.put('http://localhost:3000/api/properties', property);
    return response.data
}

// DELETE
export const deleteProperty = async (id:string) => {
    const response = await axios.delete(`http://localhost:3000/api/properties?id=${id}`);
    return response.data
}