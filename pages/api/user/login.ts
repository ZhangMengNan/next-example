import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookie } from "next-cookie";

import { ironOptions } from "@/config/index";
import { setCookie } from "@/utils/index";
import { User, UserAuth } from "db/entity/index";
import { prepareConnection } from "db/index";

import { ISession } from "@/pages/api/types";

async function login(req: NextApiRequest, res: NextApiResponse) {
    const { session } = req as { session: any };
    const cookies = Cookie.fromApiRoute(req, res);
    // const { phone = '', verify = '', identity_type = 'phone' } = req.body;
    // const db = await prepareConnection();
    // const userAuthRepo = db.getRepository(UserAuth);
    const userInfo: Pick<User, "id" | "nickname" | "avatar"> = {
        id: 1,
        nickname: "nnn",
        avatar: "",
    };

    session.userId = userInfo.id;
    session.nickname = userInfo.nickname;
    session.avatar = userInfo.avatar;

    await session.save();

    setCookie(cookies, {
        id: userInfo.id,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
    });

    res?.status(200).json({
        code: 0,
        msg: "登录成功",
        data: {
            id: userInfo.id,
            nickname: userInfo.nickname,
            avatar: userInfo.avatar,
        },
    });

    // if (String(session.verifyCode) === String(verify)) {
    //   // 验证码正确，在 user_auths 表中查找 identity_type 是否有记录
    //   const userAuth = await userAuthRepo.findOne(
    //     { identity_type, identifier: phone },
    //     { relations: ['user'] }
    //   );

    //   // 已存在的用户
    //   if (userAuth) userInfo = userAuth.user;
    //   else {
    //     // 新用户，自动注册
    //     const user = new User();
    //     user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
    //     user.avatar = '/images/avatar.jpg';
    //     user.job = '暂无';
    //     user.introduce = '暂无';

    //     const userAuth = new UserAuth();
    //     userAuth.identifier = phone;
    //     userAuth.identity_type = identity_type;
    //     userAuth.credential = session.verifyCode;
    //     userAuth.user = user;

    //     const { user: resUserAuth } = await userAuthRepo.save(userAuth);
    //     userInfo = resUserAuth;
    //   }

    //   session.userId = userInfo.id;
    //   session.nickname = userInfo.nickname;
    //   session.avatar = userInfo.avatar;

    //   await session.save();

    //   setCookie(cookies, {
    //     id: userInfo.id,
    //     nickname: userInfo.nickname,
    //     avatar: userInfo.avatar,
    //   });

    //   res?.status(200).json({
    //     code: 0,
    //     msg: '登录成功',
    //     data: {
    //       id: userInfo.id,
    //       nickname: userInfo.nickname,
    //       avatar: userInfo.avatar,
    //     },
    //   });
    // } else res?.status(200).json({ code: -1, msg: '验证码错误' });
}

export default withIronSessionApiRoute(login, ironOptions);
