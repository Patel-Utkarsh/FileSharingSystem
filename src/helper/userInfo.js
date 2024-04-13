import axios from "axios";

export default async function userData(id) {
    const info = await axios.post('https://databridge-1544.onrender.com/api/userData',{
        id
    })

    return info;

}
