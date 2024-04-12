import axios from "axios";

export default async function userData(id) {
    const info = await axios.post('http://localhost:4000/api/userData',{
        id
    })

    return info;

}