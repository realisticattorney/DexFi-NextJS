import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='w-full'>
      <Image src="/help.png" width={191} height={130} alt="lol" />
      </div>
    </div>
  )
}

export default Home