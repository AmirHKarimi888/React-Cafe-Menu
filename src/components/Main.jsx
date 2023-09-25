import axios from "axios"
import { useQuery } from "react-query"
import { url } from "../api"
import { useState } from "react"

export const Main = (props) => {

    const posts = props.posts;

    return (
        <div className="main my-[200px]">
                <ul className="posts lg:w-[66%] md:w-[75%] sm:w-[84%] max-sm:w-[87%] mt-20 mx-auto text-center grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {posts?.map((post) => {
                        return(
                            <li className="p-2 border bg-gray-50 shadow-lg shadow-gray-300 border-gray-400 aspect-square" key={post?.id}>
                                <img src={post?.poster} alt="" className="mx-auto w-full aspect-square" />
                                <p className="mt-1 text-xl">{post?.name}</p>
                                <div className="my-2 grid grid-cols-2 text-center">
                                    <div className="mx-auto">
                                    <p className="mt-1 p-1 w-[50px] bg-yellow-600 rounded-3xl">{post?.price}$</p>
                                    </div>
                                    <div className="mx-auto">
                                    <p className="mt-1 p-1 w-[50px] border border-gray-400 rounded-3xl">
                                        {post?.likedBy.length}
                                        <button onClick={() => props.toggleLike(post)}>
                                            <i className={`ml-1 ${post.likedBy.includes(localStorage.getItem("loggedInUser")) ? 'fa fa-heart text-red-500' : 'fa fa-heart-o'}`}></i>
                                        </button>
                                    </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}