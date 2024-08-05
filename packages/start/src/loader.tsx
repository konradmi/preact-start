import { useContext, useState } from 'preact/hooks'
import { createContext } from 'preact'

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
