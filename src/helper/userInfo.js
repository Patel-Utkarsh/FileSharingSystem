import axios from "axios";

export default async function userData(id) {
    const info = await axios.post('http://13.232.64.29:4000/api/userData',{
        id
    })

    return info;

}
