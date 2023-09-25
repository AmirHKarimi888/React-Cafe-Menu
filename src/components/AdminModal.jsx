import { useState } from "react"
import { useQuery } from "react-query";
import { url } from "../api";
import axios from "axios";

export const AdminModal = (props) => {

    const password = "xyz866899abc";
    const [checkPassword, setCheckPassword] = useState("");
    const [authStatus, setAuthStatus] = useState(false);
    const checkPasswordFunc = () => {
        if(checkPassword == password) {
            setAuthStatus(true);
        } else {
            document.getElementById("wrongPasswordMessage").classList.remove("hidden");
        }
    }

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [descr, setDescr] = useState("");
    const [poster, setPoster] = useState("");
    const [type, setType] = useState("");


    const { data: posts, status, refetch } = useQuery(['posts'], async() => {
        return await axios.get(url + "posts")
        .then((response) => {
            return response.data;
        })
    })

    const createPost = () => {
        let latestId = 0;
        for(let post of posts) {
            if(parseInt(post.id) > parseInt(latestId)) {
                latestId = post.id;
            }
        }
        
        axios.post(url + "posts", {
            id: parseInt(latestId) + 1,
            uid: Math.round(Math.random() * 10000000000),
            name: name,
            price: price,
            poster: poster,
            type: type,
            description: descr,
            likedBy: [],
            comments: []
        })
        .then(() => {
            refetch();
            setName("");
            document.getElementById("nameInput").value = "";
            setPrice("")
            document.getElementById("priceInput").value = "";
            setPoster("");
            document.getElementById("posterInput").value = "";
            setDescr("");
            document.getElementById("descrInput").value = "";
            setType("");
            document.getElementById("typeInput").value = "";
        })
    }

    const [selectedPost, setSelectedPost] = useState("");

    const selectToEdit = (post) => {
        if(selectedPost == "") {
            setSelectedPost(post);
            setName(post.name);
            document.getElementById("nameInput").value = post.name;
            setPrice(post.price)
            document.getElementById("priceInput").value = post.price;
            setPoster(post.poster);
            document.getElementById("posterInput").value = post.poster;
            setDescr(post.description);
            document.getElementById("descrInput").value = post.description;
            setType(post.type);
            document.getElementById("typeInput").value = post.type;
        } else if(selectedPost == post) {
            setSelectedPost("");
            setName("");
            document.getElementById("nameInput").value = "";
            setPrice("")
            document.getElementById("priceInput").value = "";
            setPoster("");
            document.getElementById("posterInput").value = "";
            setDescr("");
            document.getElementById("descrInput").value = "";
            setType("");
            document.getElementById("typeInput").value = "";
        }
    }

    const editPost = () => {
        axios.put(url + "posts/" + selectedPost.id, {
            ...selectedPost,
            name: name,
            price: price,
            poster: poster,
            type: type,
            description: descr
        })
        .then(() => {
            refetch();
            setSelectedPost("");
            setName("");
            document.getElementById("nameInput").value = "";
            setPrice("")
            document.getElementById("priceInput").value = "";
            setPoster("");
            document.getElementById("posterInput").value = "";
            setDescr("");
            document.getElementById("descrInput").value = "";
            setType("");
            document.getElementById("typeInput").value = "";
        })
    }

    const deletePost = (post) => {
        axios.delete(url + "posts/" + post.id)
        .then(() => {
            refetch();
        })
    }

    return (
        <div id="adminModal" className="adminModal fixed w-full h-screen backdrop-blur-sm hidden overflow-y-scroll" onClick={props.toggleAdminModal}>
            {!authStatus &&             
            <div onClick={(event) => event.stopPropagation()} className="w-[300px] mx-auto mt-[200px] border border-gray-400 shadow-md shadow-gray-300 p-6 rounded-lg text-center bg-gray-100">
                <input type="text" onChange={(event) => setCheckPassword(event.target.value)} onKeyDown={(event) => event.code =='Enter' ? checkPasswordFunc() : null} className="border border-gray-400 rounded-lg p-1 my-2" placeholder="Admin Panel Password" />
                <button type="button" onClick={checkPasswordFunc} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2">Submit</button>
                <p id="wrongPasswordMessage" className="text-red-500 text-center mt-2 hidden">Wrong password! Try again.</p>
            </div>}

            {authStatus &&            
            <div onClick={(event) => event.stopPropagation()} className="w-[72%] mx-auto my-[200px] border border-gray-400 shadow-md shadow-gray-300 p-6 rounded-lg text-center bg-gray-100">
                <input type="text" id="nameInput" onChange={(event) => setName(event.target.value)} className="border border-gray-400 rounded-lg p-1 my-2" placeholder="Name" /><br />
                <input type="number" id="priceInput" onChange={(event) => setPrice(event.target.value)} className="border border-gray-400 rounded-lg p-1 my-2" placeholder="Price" /><br />
                <input type="text" id="posterInput" onChange={(event) => setPoster(event.target.value)} className="border border-gray-400 rounded-lg p-1 my-2" placeholder="Poster" /><br />
                <input type="text" id="descrInput" onChange={(event) => setDescr(event.target.value)} className="border border-gray-400 rounded-lg p-1 my-2" placeholder="Description" /><br />
                <select id="typeInput" value={type} onChange={(event) => setType(event.target.value)} className="p-1 my-2 border border-gray-400">
                    <option value="coffee">Coffee</option>
                    <option value="snacks">Snacks</option>
                    <option value="dessert">Desserts</option>
                    <option value="other">Others</option>
                </select><br />
                <button type="button" onClick={selectedPost == "" ? createPost : editPost} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2">
                    {selectedPost == "" ? "Post" : "Edit"}
                </button>

                <ul className="posts w-[90%] mt-20 mx-auto text-center grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {posts?.map((post) => {
                        return(
                            <li className="p-2 border bg-gray-50 shadow-lg border-gray-400 aspect-square" key={post?.id}>
                                <img src={post?.poster} alt="" className="mx-auto w-full aspect-square" />
                                <p className="mt-1">{post?.name}</p>
                                <p className="mt-1 p-1 w-[50px] bg-yellow-600 rounded-3xl">{post?.price}$</p>
                                <p className="mt-1">{post?.type}</p>
                                <button onClick={() => selectToEdit(post)} className="mx-2 my-2">
                                    <i className={`fa fa-edit ${ selectedPost.id == post.id ? 'text-green-600' : 'text-gray-600' }`}></i>
                                </button>
                                <button onClick={() => deletePost(post)} className="mx-2 my-2">
                                    <i className="fa fa-trash text-red-500"></i>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </div>
    )
}