import React from "react";
import styles from "./Layout.module.scss";
import Sidebar from './../Sidebar/index';

type AdminLayoutProps = {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => (
    <div className="container">
        <Sidebar />
        <div className="main">
            {children}
        </div>
    </div>
);

export default AdminLayout;
