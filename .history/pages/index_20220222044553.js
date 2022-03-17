import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='w-full grid '>
      <Image src="/bunnyHome.png" layout='fill' alt="lol" />
      </div>
    </div>
  )
}

export default Home