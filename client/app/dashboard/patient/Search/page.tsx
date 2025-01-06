import React from 'react'
import PublicNavbar from '../_components/PublicNavbar'
import SearchBar from './_components/SearchBar'
import SearchResults from './_components/SearchResults'

export default function page() {
  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto">
        <SearchBar />
        <SearchResults />
      </div>

    </div>
  )
}
