import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Body from './Body'

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div>
      <Header setSearchKeyword={setSearchKeyword} />
      <Body searchKeyword={searchKeyword} />
      <hr />
      <Footer />
    </div>
  )
}
