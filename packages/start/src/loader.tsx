/// <reference types="dom-navigation" />

import { createContext } from 'preact'
import fileRoutes from "vinxi/routes"
import { useContext, useState, useEffect } from 'preact/hooks'
import { preloadData } from "./utils.js"

export const LoaderDataContext = createContext<{
  value: LoaderData,
  setValue: (value: LoaderData) => void
} | null>(null);

const LoaderDataContextProvider = LoaderDataContext.Provider;

export type LoaderData = {
  loading: boolean,
  data: any,
  error: boolean,
}

type LoaderDataProviderProps = {
  children?: preact.ComponentChildren,
  initialValue: LoaderData
}

export const LoaderDataProvider = ({ children, initialValue }: LoaderDataProviderProps) => {
  const [value, setValue] = useState<LoaderData>(initialValue);

  const navigationEventHandler = (navigateEvent: NavigateEvent) => {
    const url = new URL(navigateEvent.destination.url).pathname
    preloadData(fileRoutes, { value, setValue }, url)
  }

  useEffect(() => {
    window.navigation.addEventListener('navigate', navigationEventHandler)
    return () => window.navigation.removeEventListener('navigate', navigationEventHandler)
  }, [])

  return (
    <LoaderDataContextProvider value={{ value, setValue }}>
      {children}
    </LoaderDataContextProvider>
  );
}

export const useContextData = () => {
  const context = useContext(LoaderDataContext)

  if (!context) {
    throw new Error('useLoaderData must be used within a LoaderDataProvider')
  }
  return context
}

export const useLoaderData = () => {
  const context = useContextData()
  return context.value.data
}
