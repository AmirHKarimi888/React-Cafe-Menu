import axios from "axios"
import { useQuery } from "react-query"
import { url } from "../api"

export const Main = () => {

    const { data: posts, status } = useQuery(['posts'], async() => {
        return await axios.get(url + "posts")
        .then((response) => {
            return response.data;
        })
    })

    console.log(posts)

    return (
        <div className="main my-[200px]">

        </div>
    )
}