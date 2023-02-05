import { createContext, useState, useMemo, ReactNode } from "react";

type menuContextProviderProps = { children: ReactNode };
type TypeContext = {
  menu: string;
  setMenu: (c: string) => void;
};

const MenuContext = createContext<TypeContext>({
  menu: "",
  setMenu: () => {},
});

export function MenuContextProvider({ children }: menuContextProviderProps) {
  const [menu, setMenu] = useState<string>("");
  const value = useMemo(
    () => ({
      menu,
      setMenu,
    }),
    [menu]
  );
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export default MenuContext;
