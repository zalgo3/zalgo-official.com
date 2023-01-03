import {NextApiRequest, NextApiResponse} from 'next';
import {getPostDataAll, type PostData} from 'lib/posts';
import fs from 'fs';
import path from 'path';
import matter, {GrayMatterFile, Input} from 'gray-matter';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<PostData[]>
) => {
    const posts = await getPostDataAll({limit: req.query.limit});
    res.status(200).json({posts});
};

export default handler;
