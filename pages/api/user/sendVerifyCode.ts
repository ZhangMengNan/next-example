import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";

import request from "@/service/index";
import { ironOptions } from "@/config/index";
import { ISession } from "@/pages/api/types";

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
    const { session } = req as { session: any };
    const { to = "", templateId = "1" } = req.body;
    const AppId = "8aaf07087d7fb5f6017d950ce83f04e1";
    const AccountId = "8aaf07087d7fb5f6017d950ce72c04da";
    const AuthToken = "91725ff244364cda9f1e1ea7d471e124";
    const NowDate = format(new Date(), "yyyyMMddHHmmss");
    const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
    const Authorization = encode(`${AccountId}:${NowDate}`);
    const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000; // 验证码随机数
    const expireMinute = "5"; // 过期时间
    const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`; // 测试地址

    const response = await request.post<
        any,
        {
            to: string;
            templateId: string;
            appId: string;
            datas: (string | number)[];
        }
    >(
        url,
        {
            to,
            templateId,
            appId: AppId,
            datas: [verifyCode, expireMinute],
        },
        { headers: { Authorization } }
    );
    const { statusCode, templateSMS, statusMsg } = response as any;

    if (statusCode === "000000") {
        session.verifyCode = verifyCode;
        await session.save(); // 保存

        res.status(200).json({
            code: 0,
            msg: statusMsg,
            data: { templateSMS },
        });
    } else {
        res.status(200).json({
            code: statusCode,
            msg: statusMsg,
        });
    }
}

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);
