import { createContext, useState, useMemo, ReactNode } from "react";

type MenuContextProviderProps = { children: ReactNode };
type stringContext = {
  menu: string;
  setMenu: (c: string) => void;
};

const MenuContext = createContext<stringContext>({
  menu: "Accueil",
  setMenu: () => {},
});

export function MenuContextProvider({ children }: MenuContextProviderProps) {
  const [menu, setMenu] = useState("Accueil");

  const value = useMemo(
    () => ({
      menu,
      setMenu,
    }),
    [menu]
  );

  // const value = {
  //   menu,
  //   setMenu,
  // };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export default MenuContext;
