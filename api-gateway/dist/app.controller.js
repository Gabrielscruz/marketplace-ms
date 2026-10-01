var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ProxyService } from './proxy/service/proxy.service.js';
let AppController = class AppController {
    appService;
    proxyService;
    constructor(appService, proxyService) {
        this.appService = appService;
        this.proxyService = proxyService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                users: await this.proxyService.gerServiceHealth('users'),
                products: await this.proxyService.gerServiceHealth('products'),
                checkout: await this.proxyService.gerServiceHealth('checkout'),
                payments: await this.proxyService.gerServiceHealth('payments'),
            },
        };
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    Get('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHealth", null);
AppController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [AppService,
        ProxyService])
], AppController);
export { AppController };
//# sourceMappingURL=app.controller.js.map