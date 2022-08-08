import '../styles/Home.module.css'
import Script from 'next/script'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [data, setData] = useState("")
  const router = useRouter()

  return (
    <div className='w-screen h-screen flex justify-center bg-[#FAF8FB]'>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
      <div className=' w-96 sm:w-4/5 md:w-96 lg:w-1/2 xl:w-1/3 h-24 bg-white mt-64 rounded-xl py-3 px-3 flex items-center space-x-3 shadow-md'>
        <div className='bg-[#F0F3F6] rounded-xl w-11/12 h-3/4 flex items-center px-3' id='input'>
          <ion-icon name="search-outline" size="small"></ion-icon>
          <input
            className='w-11/12 h-full bg-[#F0F3F6] rounded-xl outline-none px-2'
            onChange={(e) => setData(e.target.value)} type="text"
          />
        </div>
        <div className='rounded-xl w-1/4 h-3/4 flex items-center justify-center hover:cursor-pointer hover:bg-[#ededed]' onClick={() => {
          if (data === "") return
          const query = `${data.replaceAll(' ', '+')}`
          router.push(`/search?q=${query}`)
        }}>
          Search
        </div>
      </div>
    </div>
  )
}
