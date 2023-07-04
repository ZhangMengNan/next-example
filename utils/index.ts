interface ICookieInfo {
    id: number;
    nickname: string;
    avatar: string;
}

const setCookie = (cookies: any, { id, nickname, avatar }: ICookieInfo) => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 登录时效
    const path = "/";

    cookies.set("userId", id, { path, expires });
    cookies.set("nickname", nickname, { path, expires });
    cookies.set("avatar", avatar, { path, expires });
};

export { setCookie };
