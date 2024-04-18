import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { HttpStatus, Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import { CommonError } from '../../core-common/common-error';
import { Result } from '../../core-common/result-model';
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

    public async batchPutPresignedUrls(bucketName: string, keys: string[]): Promise<Result<any>> {
        try {
            const promises = keys.map(async key => {
                const command = new PutObjectCommand({ Bucket: bucketName, Key: key });
                const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
                return { key, url };
            });
            const response = await Promise.all(promises);
            return Result.success(response)
        } catch (error) {
            return Result.failed(new CommonError('Error: Failed to Get Upload Urls', { bucketName, keys }))
        }
    }
    public async getAllPresignedUrls(folderName: string, bucketName: string): Promise<Result<any>> {
        try {
            const listObjectsParams = {
                Bucket: bucketName,
                Prefix: folderName,
            };

            const listCommand = new ListObjectsV2Command(listObjectsParams);
            const data = await this.s3Client.send(listCommand);
            const files = data.Contents;

            if (!files) {
                return Result.failed(new CommonError('Images not found !!', listObjectsParams, HttpStatus.NOT_FOUND))
            }

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
            return Result.success(presignedUrls);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    public async s3UrlToBase64(s3Url: string) {
        try {
            // Extract bucket name and key from S3 URL
            const { bucket, key } = this.parseS3Url(s3Url);

            // Download image from S3
            const getObjectParams = {
                Bucket: bucket,
                Key: key
            };
            const { Body } = await this.s3Client.send(new GetObjectCommand(getObjectParams));

            // Convert image to base64
            const base64Image = Buffer.from(await this.stream2buffer(Body)).toString('base64');
            return base64Image;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    public async s3UrlToBuffer(s3Url: string) {
        try {
            // Extract bucket name and key from S3 URL
            const { bucket, key } = this.parseS3Url(s3Url);

            // Download image from S3
            const getObjectParams = {
                Bucket: bucket,
                Key: key
            };
            const { Body } = await this.s3Client.send(new GetObjectCommand(getObjectParams));
            // Convert image to base64
            const base64Image = Buffer.from(await this.stream2buffer(Body));
            return { base64Image };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    private parseS3Url(s3Url: string) {
        const [, bucket, key] = s3Url.match(/^s3:\/\/([^\/]+)\/(.*)$/);
        return { bucket, key };
    }

    private async stream2buffer(stream: Stream): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            const _buf = Array<any>();
            stream.on("data", chunk => _buf.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(_buf)));
            stream.on("error", err => reject(`error converting stream - ${err}`));
        });
    }

    public async uploadToS3(uploadParams: any) {
        try {
            const command = new PutObjectCommand(uploadParams);
            await this.s3Client.send(command);
            const objectUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
            console.log('File uploaded successfully to S3:', objectUrl);
            return objectUrl;
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw error;
        }
    }
}