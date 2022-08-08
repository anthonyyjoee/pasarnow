import '../styles/Home.module.css'
import Script from 'next/script'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Search() {
  const [data, setData] = useState("")
  const [result, setResult] = useState()
  const router = useRouter()

  const fetchData = async (query) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://google-search3.p.rapidapi.com/api/v1/image/q=${query}`,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'EU',
          'X-RapidAPI-Key': '7b63af5077msh630561dceade7b7p16abdajsna25440f46ee3',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
        }
      })

      setResult(data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (router.query.q) {
      const q = router.query.q.replaceAll(' ', '+')
      fetchData(q)
      setData(router.query.q)
    }
  }, [router])

  return (
    <div className='w-screen h-screen bg-white'>
      <div className='fixed bg-white md:pl-16'>
        <form onSubmit={(e) => {
          e.preventDefault()
          if (data === "") return
          setResult(null)
          const query = `${data.replaceAll(' ', '+')}`
          router.push(`/image?q=${query}`)
          fetchData(query)
        }}>
          <div className='w-screen h-16 px-5 flex items-center space-x-2'>
            <ion-icon name="search-outline" size="small"></ion-icon>
            <input
              className='w-full h-2/3 bg-[#FAF8FB] rounded-full outline-none px-2 shadow-sm sm:w-96'
              onChange={(e) => setData(e.target.value)} type="text"
              value={data}
            />
            <button className='py-1.5 px-3 bg-slate-100 rounded-full'>search</button>
          </div>
        </form>

        <div className='w-screen h-10 px-5 flex items-center border-b bg-white'>
          <div
            className='w-1/3 sm:w-24 text-center hover:cursor-pointer'
            onClick={() => {
              const q = router.query.q.replaceAll(' ', '+')
              router.push(`/search?q=${q}`)
            }}
          >
            Search
          </div>
          <div
            className='w-1/3 sm:w-24 text-center text-blue-500 hover:cursor-pointer'
            onClick={() => {
              const q = router.query.q.replaceAll(' ', '+')
              router.push(`/image?q=${q}`)
            }}
          >
            Image
          </div>
          <div
            className='w-1/3 sm:w-24 text-center hover:cursor-pointer'
            onClick={() => {
              const q = router.query.q.replaceAll(' ', '+')
              router.push(`/news?q=${q}`)
            }}
          >
            News
          </div>
        </div>
      </div>

      <div className='w-screen h-screen pt-28 pb-28'>
        {
          result ? (
            result.image_results.length == 0 ? (
              <div className='w-full h-full flex items-center justify-center'>
                <p className='text-lg'>No Result</p>
              </div>
            ) : (
              <div className='grid grid-cols-2 px-4 space-x-1  sm:grid-cols-3 md:grid-cols-4 md:px-7 md:space-x-3 lg:grid-cols-5 lg:px-7 lg:space-x-3 xl:grid-cols-6 xl:px-10 w-full h-screen '>
                {result.image_results.map(({ image, link }, i) => (
                  <a href={link.href} key={i}>
                    <div className='mb-3 overflow-hidden h-48'>
                      <div className='mb-3 overflow-hidden h-36 bg-slate-100 items-center justify-center flex'>
                        <img src={image.src} className='rounded' />
                      </div>
                      <p className='text-sm -mt-3'>{link.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            )
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="" />
            </div>
          )
        }
      </div>
    </div>
  )
}
