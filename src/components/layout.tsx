import { FC, ReactNode } from "react";
import Top from "./top";

interface IProps{
    children : ReactNode
}

const Layout : FC<IProps> = ({ children }) => {
    return (
      <div>
        <Top/>
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    )
  }

  export default Layout;