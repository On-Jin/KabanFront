import type {NextApiRequest, NextApiResponse} from 'next'
import {cookies} from "next/headers";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    console.log(`default=${req.cookies['default']}`);
    const apiLogin = await fetch(`http://localhost:5264/protected`, {
        headers: {
            Cookie: `default=${req.cookies['default']}`
        }
    });
    console.log(apiLogin.status);
    res.status(apiLogin.status).json({message: await apiLogin.text()})
}