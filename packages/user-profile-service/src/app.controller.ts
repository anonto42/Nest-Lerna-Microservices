import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {MESSAGE_PATTERNS} from "common/src/constants/services";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern(MESSAGE_PATTERNS.USER.GET_PROFILE)
    async getProfile(@Payload() data: { userId: string; currentUserId?: string }) {
        return this.appService.getProfile(data.userId, data.currentUserId);
    }

    @MessagePattern(MESSAGE_PATTERNS.USER.FOLLOW_USER)
    async followUser(@Payload() data: { followerId: string; followingId: string }) {
        return this.appService.followUser(data.followerId, data.followingId);
    }

    @MessagePattern(MESSAGE_PATTERNS.USER.UPDATE_PROFILE)
    async updateProfile(@Payload() data: { userId: string; updates: Partial<User> }) {
        return this.appService.updateProfile(data.userId, data.updates);
    }
}
