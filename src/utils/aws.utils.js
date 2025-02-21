import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3Client from "../libs/awsConfig.js";

const putObject = async (fileName, path, contentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `${path}/${fileName}`,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
};

const getObjectUrl = async (key) => {
    // const command = new GetObjectCommand({
    //     Bucket: process.env.AWS_BUCKET,
    //     Key: key,
    // });
    // const url = await getSignedUrl(s3Client, command);
    // return url;
    const url = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET}/${key}`;
    return url;
};

export {
    putObject,
    getObjectUrl,
};