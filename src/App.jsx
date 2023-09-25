import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Main } from './components/Main'
import { AdminModal } from './components/AdminModal'
import { useQuery } from 'react-query'
import axios from 'axios'
import { url } from './api'

function App() {

  if ("loggedInUser" in localStorage) {
    if (localStorage.getItem("loggedInUser") == "") {
      localStorage.setItem("loggedInUser", Math.round(Math.random() * 1000000000000));
    }
  } else {
    localStorage.setItem("loggedInUser", Math.round(Math.random() * 1000000000000));
  }

  const toggleAdminModal = () => {
    const adminModal = document.getElementById("adminModal");

    if (adminModal.classList.contains("hidden")) {
      adminModal.classList.remove("hidden");
    } else {
      adminModal.classList.add("hidden");
    }
  }


  const { data, status, refetch } = useQuery(['posts'], async () => {
    return await axios.get(url + "posts")
      .then((response) => {
        return response.data;
      })
  })

  let [posts, setPosts] = useState([]);
  const [type, setType] = useState("all");

  useEffect(() => {

    if (type == "all") {
      setPosts(data);
    } else {
      posts = data.filter((post) => {
        if (post.type == type) {
          return post;
        }
      })
      setPosts(posts);
    }

    document.getElementById(type).classList.add("activeType");

  }, [data])


  const setTypeAll = () => {
    setType("all");
    posts = data;
    setPosts(posts);

    document.querySelectorAll("li").forEach((e) => e.classList.remove("activeType"));
    document.getElementById("all").classList.add("activeType");
  }

  const setTypeCoffee = () => {
    setType("coffee");
    posts = data.filter((post) => {
      if (post.type == "coffee") {
        return post;
      }
    })
    setPosts(posts);

    document.querySelectorAll("li").forEach((e) => e.classList.remove("activeType"));
    document.getElementById("coffee").classList.add("activeType");
  }

  const setTypeSnack = () => {
    setType("snacks");
    posts = data.filter((post) => {
      if (post.type == "snacks") {
        return post;
      }
    })
    setPosts(posts);

    document.querySelectorAll("li").forEach((e) => e.classList.remove("activeType"));
    document.getElementById("snacks").classList.add("activeType");
  }

  const setTypeDessert = () => {
    setType("dessert");
    posts = data.filter((post) => {
      if (post.type == "dessert") {
        return post;
      }
    })
    setPosts(posts);

    document.querySelectorAll("li").forEach((e) => e.classList.remove("activeType"));
    document.getElementById("dessert").classList.add("activeType");
  }

  const toggleLike = (post) => {
    if (post.likedBy.includes(localStorage.getItem("loggedInUser"))) {
      axios.put(url + "posts/" + post.id, {
        ...post,
        likedBy: post.likedBy.filter((item) => item != localStorage.getItem("loggedInUser") ? item : null)
      })
        .then(() => {
          refetch();
        })
    } else {
      axios.put(url + "posts/" + post.id, {
        ...post,
        likedBy: [...post.likedBy, localStorage.getItem("loggedInUser")]
      })
        .then(() => {
          refetch();
        })
    }
  }

  return (
    <div id="app">
      <AdminModal toggleAdminModal={toggleAdminModal} />
      <header>
        <Header toggleAdminModal={toggleAdminModal} setTypeAll={setTypeAll} setTypeCoffee={setTypeCoffee} setTypeSnack={setTypeSnack} setTypeDessert={setTypeDessert} />
      </header>

      <main>
        <Main posts={posts} toggleLike={toggleLike} />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
