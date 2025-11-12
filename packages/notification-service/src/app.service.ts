import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async createNotification(data: {
        type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'MESSAGE';
        userId: string;
        targetId: string;
        data: any;
    }) {
        const notification = await this.notificationModel.create({
            ...data,
            isRead: false,
            createdAt: new Date(),
        });

        // Real-time push
        this.webSocketGateway.sendNotification(data.userId, notification);

        // Email for important notifications
        if (['FOLLOW', 'MESSAGE'].includes(data.type)) {
            this.emailService.sendNotificationEmail(data.userId, notification);
        }
    }
}
