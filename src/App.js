import React, { useEffect, useState } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'

import './global.css'

function App() {

  const [statusArray, setStatusArray] = useState([{ name: '', status: '' }]);
  let load = 0
  async function getData() {
    const res = await axios.get('https://www.githubstatus.com/')
    const $ = cheerio.load(res.data)

    $(".component-container").each((i, element) => {

      const name = $(element)
        .find("span.name")
        .text()
        .trim()
      const status = $(element)
        .find("span.component-status")
        .text()
        .trim()

      setStatusArray(...statusArray, { name, status })
    })
    load++
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container">
      <h1>Status do gitHub server</h1>
    </div>
  );
}

export default App;
