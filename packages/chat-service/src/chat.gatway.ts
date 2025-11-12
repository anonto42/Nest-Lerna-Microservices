

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('send_message')
    async handleMessage(
        @MessageBody() data: { roomId: string; message: string; userId: string },
    ) {
        const message = await this.chatService.saveMessage(data);

        // Broadcast to room
        this.server.to(data.roomId).emit('new_message', message);

        // Send notification
        this.notificationClient.emit('notification.create', {
            type: 'MESSAGE',
            userId: data.userId,
            targetId: data.roomId,
            data: { message: data.message },
        });
    }

    @SubscribeMessage('join_room')
    handleJoinRoom(@MessageBody() data: { roomId: string; userId: string }) {
        this.server.socketsJoin(data.roomId);
    }
}