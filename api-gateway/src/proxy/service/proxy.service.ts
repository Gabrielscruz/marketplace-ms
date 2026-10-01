import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { serviceConfig } from '../../config/gateway.config.js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
    private readonly logger = new Logger(ProxyService.name);

    constructor(private readonly httpService: HttpService) { }

    async proxyRequest(
        serviceName: keyof typeof serviceConfig,
        method: string,
        path: string,
        data?: any,
        headers?: any,
        userInfo?: any
    ) {
        const service = serviceConfig[serviceName];
        const url = `${service.url}${path}`;

        this.logger.log(`Proxying request to ${url} with method ${method}`);

        try {
            const enhanceHeaders = {
                ...headers,
                'x-user-id': userInfo?.userId,
                'x-user-email': userInfo?.email,
                'x-user-role': userInfo?.role,
            };

            const response = await firstValueFrom(
                await this.httpService.request<any>({
                    method: method.toLocaleLowerCase() as any,
                    url,
                    data,
                    headers: enhanceHeaders,
                    timeout: service.timeout,
                })
            )
        } catch (error) {
            this.logger.error('Error occurred while proxying request');
        }

    }


    async gerServiceHealth(serviceName: keyof typeof serviceConfig) {
        try {
            const service = serviceConfig[serviceName];
            const response = await firstValueFrom(
                await this.httpService.get(`${service.url}/health`, {
                    timeout: 3000
                })
            );
            return {
                status: 'healthy',
                data: response.data,
            }
        } catch (error: any) {
            return {
                status: 'unhealthy',
                error: error.message ,
            }
        }
    }
}

