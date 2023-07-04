import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";

import request from "@/service/index";
import { useStore } from "@/store/index";
import type { MenuProps } from "antd";
import type { NextPage } from "next";
import Login from "../Login";
import { navs } from "./config";

import styles from "./index.module.scss";

const Navbar: NextPage = () => {
    const store = useStore();
    const { id: userId, avatar } = store.user.userInfo;
    const { pathname, push } = useRouter();
    const [isShowLogin, setIsShowLogin] = useState(false);

    const handleGotoEditorPage = () => {};

    const handleLogin = () => setIsShowLogin(true);

    const handleClose = () => setIsShowLogin(false);

    const handleGotoPersonalPage = () => push(`/user/${userId}`);

    const handleLogout = () => {
        request.post("/api/user/logout").then((res: any) => {
            if (res?.code === 0) store.user.setUserInfo({});
        });
    };

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Menu.Item onClick={handleGotoPersonalPage}>
                    <HomeOutlined />
                    &nbsp; 个人主页
                </Menu.Item>
            ),
        },
        {
            key: "2",
            label: (
                <Menu.Item onClick={handleLogout}>
                    <LoginOutlined />
                    &nbsp; 退出系统
                </Menu.Item>
            ),
        },
    ];

    return (
        <div className={styles.navbar}>
            <section className={styles.logoArea}>BLOG-C</section>
            <section className={styles.linkArea}>
                {navs.map(item => (
                    <Link legacyBehavior key={item.label} href={item.value}>
                        <a
                            className={
                                pathname === item.value ? styles.active : ""
                            }
                        >
                            {item.label}
                        </a>
                    </Link>
                ))}
            </section>
            <section className={styles.operationArea}>
                <Button onClick={handleGotoEditorPage}>写文章</Button>
                {userId ? (
                    <Dropdown menu={{ items }} placement="bottomLeft">
                        <Avatar src={avatar} size={32} />
                    </Dropdown>
                ) : (
                    <Button type="primary" onClick={handleLogin}>
                        登录
                    </Button>
                )}
            </section>
            <Login isShow={isShowLogin} onClose={handleClose} />
        </div>
    );
};

export default Navbar;
