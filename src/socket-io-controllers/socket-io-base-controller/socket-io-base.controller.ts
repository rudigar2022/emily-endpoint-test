import { injectable } from 'inversify';
import 'reflect-metadata';

import * as SocketIo from 'socket.io';

import { LoggerService } from '../../services/services';

@injectable()
export class SocketIoBaseController {
  constructor(private loggerService: LoggerService) {}

  /**
   * Configure a listener for a specific Socket IO event and register the respective handler
   * @param socket The socket that are connected to the server
   * @param request The name of the event that will be executed on Socket IO
   * @param response The name of the event that will be returned by Socket IO 'emit' function
   * @param handler A Service or Controller method that will handle the Socket IO event execution
   */
  public addListener<RequestType, ResponseType>(
    socket: SocketIo.Socket,
    request: string,
    response: string,
    handler: (data: RequestType) => Promise<ResponseType>
  ): void {
    socket.on(request, async (data: any) => {
      this.loggerService.info(
        `Executing ${request} for route ${socket.handshake.query.login}...`
      );
      try {
        let result = await handler(data);
        socket.emit(response, result);

        this.loggerService.info(
          `${request} execution completed for ${socket.handshake.query.login}`
        );
      } catch (error) {
        this.loggerService.error(
          `${request} execution failed for ${socket.handshake.query.login}`
        );
        this.loggerService.error(JSON.stringify(error));
      }
    });
  }
}
