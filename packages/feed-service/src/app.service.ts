import {Inject, Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
        private readonly postService: PostService,
    ) {}

    async generateFeedForUser(userId: string, page: number = 1, limit: number = 20) {
        const following = await this.getFollowing(userId);
        const feed = await this.postService.getPostsByUsers(following, page, limit);

        // Cache feed for 5 minutes
        await this.redis.setex(`feed:${userId}`, 300, JSON.stringify(feed));
        return feed;
    }

    async getCachedFeed(userId: string) {
        const cached = await this.redis.get(`feed:${userId}`);
        return cached ? JSON.parse(cached) : null;
    }
}
