import React, { useState } from 'react'
import Header from './Header'
import AllMyPosts from './AllMyPosts'

function AllMyPostsHome() {
    const [searchKeyword, setSearchKeyword] = useState('')
  return (
    <div>
      <Header setSearchKeyword={setSearchKeyword}></Header>
      <hr />
      <AllMyPosts searchKeyword={searchKeyword}></AllMyPosts>
    </div>
  )
}

export default AllMyPostsHome
