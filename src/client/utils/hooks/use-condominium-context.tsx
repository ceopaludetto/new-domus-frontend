import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface CondominiumContextProps {
  condominiumID: string | null;
  changeCondominiumID: (nextCondominium: string | null) => string | null;
}

const CondominiumContext = createContext<CondominiumContextProps | null>(null);

interface CondominiumProviderProps {
  initialValue?: string;
  children: ReactNode;
}

export function CondominiumProvider({ children, initialValue }: CondominiumProviderProps) {
  const [condominiumID, setCondominiumID] = useState<string | null>(initialValue ?? null);

  const changeCondominiumID = useCallback((next: string | null) => {
    setCondominiumID(next);
    return next;
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CondominiumContext.Provider value={{ condominiumID, changeCondominiumID }}>{children}</CondominiumContext.Provider>
  );
}

export function useCondominiumContext() {
  const context = useContext(CondominiumContext);
  if (!context) throw new Error("useCondominiumContext must be wrapped by CondominiumProvider");

  return context;
}
