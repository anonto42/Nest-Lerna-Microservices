import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {MESSAGE_PATTERNS} from "common/src/constants/services";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}


    @MessagePattern(MESSAGE_PATTERNS.POST.CREATE)
    async createPost(@Payload() data: {
        userId: string;
        content: string;
        mediaUrls: string[];
        isPublic: boolean;
    }) {
        return this.appService.createPost(data);
    }

    @MessagePattern(MESSAGE_PATTERNS.POST.LIKE_POST)
    async likePost(@Payload() data: { postId: string; userId: string }) {
        return this.appService.likePost(data.postId, data.userId);
    }

    @MessagePattern(MESSAGE_PATTERNS.POST.COMMENT)
    async addComment(@Payload() data: {
        postId: string;
        userId: string;
        content: string;
    }) {
        return this.appService.addComment(data.postId, data.userId, data.content);
    }
}
