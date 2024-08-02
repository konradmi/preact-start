import { useContext, useState } from 'preact/hooks'
import { createContext } from 'preact'

export const LoaderDataContext = createContext<any>(null);

const LoaderDataContextProvider = LoaderDataContext.Provider;

export const LoaderDataProvider = ({ children, initialValue }: { children?: preact.ComponentChildren, initialValue: any }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <LoaderDataContextProvider value={{ value, setValue }}>
      {children}
    </LoaderDataContextProvider>
  );
}

export const useLoaderData = () => {
  const context = useContext(LoaderDataContext)

  if (!context) {
    throw new Error('useLoaderData must be used within a LoaderDataProvider')
  }
  return context  
}
