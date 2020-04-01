import React, { useEffect, useState } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'
import { FaRedo } from 'react-icons/fa'

import './global.css'
import './index.css'

function App() {

  const [statusArray, setStatusArray] = useState([]);

  function getData() {
    setStatusArray([])
    axios.get('https://www.githubstatus.com/').then((res) => {
      const $ = cheerio.load(res.data)
      let obj = []
      let statusClass
      $(".component-container").each((i, element) => {

        const name = $(element)
          .find("span.name")
          .text()
          .trim()
        let status = $(element)
          .find("span.component-status")
          .text()
          .trim()

        statusClass = (status === "Operational") ? "normal" : "inTroble"
        status = (status === "Operational") ? "Normal" : "Operational"

        if (!(name === "Visit www.githubstatus.com for more information") && !(name === "Other"))
          obj = [...obj, { name, status, statusClass }]

      })

      setStatusArray(obj)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container wrap">
      <h1>Status do gitHub server</h1>
      <ul>
        {statusArray.map(item => (
          <li key={item.name} className="status-container grid-4">
            <h2>{item.name}</h2>
            <span className={item.statusClass}>{item.status}</span>
          </li>
        ))}
        <li className="status-container grid-4 reload" onClick={getData}>
          <FaRedo size="50%" />
        </li>
        <li className="status-container grid-4 reload-mobile" onClick={getData}>
          <p>Verificar Status</p>
          <FaRedo size="16px" />
        </li>
      </ul>
      <div className="disclaimer">
        <p>Este um app não oficial, para mais informações oficias utiliza o link da pagina oficial do
          <a href="https://www.githubstatus.com" target="_blank" rel="noopener noreferrer"> githubstatus.com</a></p>
        <p>Este é um Projeto feito por Leonardo vita, visite o meu Repositorio no github <span role="img" arial-label="foguete">🚀</span>
          <a href="https://github.com/LeonardoVita" target="_blank" rel="noopener noreferrer"> Meu Repositorio</a></p>
      </div>
    </div>
  );
}

export default App;
