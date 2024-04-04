import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CREDENTIALS, REGION } from './s3-constant';

@Injectable()
export class AwsS3Service {
    private s3Client: S3Client = null

    constructor() {
        this.s3Client = new S3Client({
            credentials: CREDENTIALS,
            region: REGION
        });
    }

    public async getObjectContent(bucketName: string, key: string) {
        try {
            const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
            const data = await this.s3Client.send(command);
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    public async batchGetPresignedUrls(bucketName: string, keys: string[]) {
        try {
            const promises = keys.map(async key => {
                const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
                const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
                return { key, url };
            });
            return Promise.all(promises);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    public async batchPutPresignedUrls(bucketName: string, keys: string[]) {
        try {
            const promises = keys.map(async key => {
                const command = new PutObjectCommand({ Bucket: bucketName, Key: key });
                const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
                return { key, url };
            });
            return Promise.all(promises);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    public async getAllPresignedUrls(folderName: string, bucketName: string) {
        try {
            const listObjectsParams = {
                Bucket: bucketName,
                Prefix: folderName,
            };

            const listCommand = new ListObjectsV2Command(listObjectsParams);
            const data = await this.s3Client.send(listCommand);
            const files = data.Contents;

            const promises = files.map(async (file) => {
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: file.Key,
                };

                const getObjectCommand = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(this.s3Client, getObjectCommand, { expiresIn: 3600 });
                return { fileName: file.Key, url };
            });

            const presignedUrls = await Promise.all(promises);
            return presignedUrls;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}