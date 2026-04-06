import { getCarFilters } from '@/actions/car-listing'
import React from 'react'
import CarPage from './[id]/page'

export const metadata = {
    title : "Cars | Vehiql",
    description : "Browse and search for your dream car"
}


const CarsPage =async () => {

    const filtersData = await getCarFilters()
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-4 gradient-title">Browse Cars</h1>
    </div>
  )
}

export default CarsPage;
