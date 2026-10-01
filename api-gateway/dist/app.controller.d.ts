import { AppService } from './app.service.js';
import { ProxyService } from './proxy/service/proxy.service.js';
export declare class AppController {
    private readonly appService;
    private readonly proxyService;
    constructor(appService: AppService, proxyService: ProxyService);
    getHello(): string;
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        services: {
            users: {
                status: string;
                data: any;
                error?: undefined;
            } | {
                status: string;
                error: any;
                data?: undefined;
            };
            products: {
                status: string;
                data: any;
                error?: undefined;
            } | {
                status: string;
                error: any;
                data?: undefined;
            };
            checkout: {
                status: string;
                data: any;
                error?: undefined;
            } | {
                status: string;
                error: any;
                data?: undefined;
            };
            payments: {
                status: string;
                data: any;
                error?: undefined;
            } | {
                status: string;
                error: any;
                data?: undefined;
            };
        };
    }>;
}
