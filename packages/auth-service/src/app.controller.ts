import {Controller} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {MESSAGE_PATTERNS} from "common/src/constants/services";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(MESSAGE_PATTERNS.AUTH.REGISTER)
    async register(@Payload() data: {
        email: string;
        password: string;
        username: string;
        firstName: string;
        lastName: string;
    }) {
        return this.authService.register(data);
    }

    @MessagePattern(MESSAGE_PATTERNS.AUTH.LOGIN)
    async login(@Payload() data: { email: string; password: string }) {
        return this.authService.login(data);
    }

    @MessagePattern(MESSAGE_PATTERNS.AUTH.VALIDATE_TOKEN)
    async validateToken(@Payload() token: string) {
        return this.authService.validateToken(token);
    }
}
