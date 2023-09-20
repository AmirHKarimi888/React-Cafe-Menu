import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Main } from './components/Main'
import { AdminModal } from './components/AdminModal'

function App() {
  const adminModal = document.getElementById("adminModal");

  const toggleAdminModal = () => {
    if(adminModal.classList.contains("hidden")) {
      adminModal.classList.remove("hidden");
    } else {
      adminModal.classList.add("hidden");
    }
  }

  return (
    <div id="app">
      <AdminModal toggleAdminModal={toggleAdminModal} />
      <header>
        <Header toggleAdminModal={toggleAdminModal} />
      </header>

      <main>
        <Main />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
