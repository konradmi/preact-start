import { useContext } from 'preact/hooks'
import { createContext } from 'preact'

export const LoaderDataContext = createContext(null)

export const useLoaderData = () => {
  const context = useContext(LoaderDataContext)

  if (!context) {
    throw new Error('useLoaderData must be used within a LoaderDataProvider')
  }
  return context  
}
