import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaRedo } from 'react-icons/fa'
import cheerio from 'cheerio'

import './global.css'
import './index.css'

function App() {

  const [statusArray, setStatusArray] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getData() {
    
    try {
      setLoading(true)
      
      const res = await axios.get('https://www.githubstatus.com/')      
      const $ = cheerio.load(res.data)
  
      let webData = []
      
      $(".component-container").each((i, element) => {
  
        const name = $(element)
          .find("span.name")
          .text()
          .trim()
        let status = $(element)
          .find("span.component-status")
          .text()
          .trim()
  
        const statusClass = (status === "Operational") ? "normal" : "inTroble"
        status = (status === "Operational") ? "Normal" : "Operational"
  
        if (!(name === "Visit www.githubstatus.com for more information") && !(name === "Other"))
          webData = [...webData, { name, status, statusClass }]
  
      })
      setStatusArray(webData)  
      
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
    
  }

  useEffect(() => {
    getData()
  }, [])
 
  return (
    <>
      {
        loading && (
          <div className="loading-container">
          <div className="loading"/>
          </div>
        ) 
          
      }
      <div className="container wrap">
        <div className="content">
          <div className="title-container">
            <h1>Status do gitHub server</h1> 
            <div className="reload-button" onClick={getData}>
              <FaRedo  size="2rem" color="teal"/>
            </div>
          </div>         
          <ul>
            {
              statusArray && 
              statusArray.map(item => (
                <li key={item.name} className="status-container grid-4">
                  <h2>{item.name}</h2>
                  <span className={item.statusClass}>{item.status}</span>
                </li>
              ))
            }
            {
              statusArray && 
              <li className="status-container grid-4 reload-mobile" onClick={getData}>
                <p>Verificar Status</p>
                <FaRedo size="16px" />
              </li>
            }
            
          </ul>
        </div>
        <div className="disclaimer">
          <p>Este um app não oficial, para mais informações oficias utiliza o link da pagina oficial do
            <a href="https://www.githubstatus.com" target="_blank" rel="noopener noreferrer"> githubstatus.com</a></p>
          <p>Este é um Projeto feito por Leonardo vita, visite o meu Repositorio no github <span role="img" arial-label="foguete">🚀</span>
            <a href="https://github.com/LeonardoVita" target="_blank" rel="noopener noreferrer"> Meu Repositorio</a></p>
        </div>
      </div>
    </>
  );
}

export default App;
