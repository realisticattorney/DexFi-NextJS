import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='w-full h-max'>
      <Image src="/help.png" layout='fill' alt="lol" />
      </div>
    </div>
  )
}

export default Home