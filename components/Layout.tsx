import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page">
      <Link href={"/"}>
        <div className="logo">
          <Image src="/logo.png" alt="logo" width={150} height={150}/>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
