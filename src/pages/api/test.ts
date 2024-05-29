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
    const apiLogin = await fetch(`${process.env.API_PROXY}/didi`, {
        headers: {
            Cookie: `default=${req.cookies['default']}`,
            // 'Access-Control-Allow-Credentials': "true",
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            // 'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        }
    });

    console.log('AYAYAYA')
    console.log(apiLogin.status);
    res.status(apiLogin.status).json({message: await apiLogin.text()})
    res.appendHeader("Location", apiLogin.headers.get("Location")!)
    // res.redirect();
}