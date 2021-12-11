import React from "react";
import styles from "./Layout.module.scss";
import Header from '../Header/index';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <div className={styles.layout}>
        <Header />
        {children}
    </div>
);

export default Layout;
