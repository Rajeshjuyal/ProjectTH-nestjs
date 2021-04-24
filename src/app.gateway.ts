import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel('Notifications')
    private readonly notificationModel: Model<any>,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger();

  // this method is called when client is connected to websocket
  public handleConnection(client: Socket, ...args): any {
    this.logger.log('CLIENT CONNECTED');
    console.log('Client info', client.id);
  }

  // this method is called when client is disconnected from socket
  public handleDisconnect(client: Socket): any {
    this.logger.log('CLIENT DISCONNECTED');
    console.log('CLIENT info', client.id);
  }

  afterInit(server: Server): any {
    this.logger.log('WEBSOCKET GATWEAY INITIALIZED');
  }

  @SubscribeMessage('notification-list')
  public async notificationList(@MessageBody() data) {
    try {
      console.log(
        'ADMIN SUBSCRIBE NOTIFICATION...........................',
        data,
      );
      if (data && data.id) {
        let p = await this.notificationModel.findByIdAndUpdate(
          data.id,
          { status: false },
          { new: true },
        );
      } else {
        const list = await this.notificationModel
          .find({ status: true }, 'ORDERID order')
          .limit(5)
          .sort('-createdAt');
        this.server.emit('newOrderPlaced', list);
      }
    } catch (e) {
      console.log('COULD NOT UPDATE ORDER STATUS');
    }
  }
}
