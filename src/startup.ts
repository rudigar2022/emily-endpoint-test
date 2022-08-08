import { injectable } from 'inversify';
import 'reflect-metadata';

import * as Os from 'os';
import Cluster = require('cluster');

import * as Configurations from './configurations/configurations.json';
import { EmilyServer } from './server/server';
import { LoggerService } from './services/services';

import { IoCContainer } from './ioc/ioc';

@injectable()
export class Startup {
  constructor(
    protected server: EmilyServer,
    public loggerService: LoggerService
  ) {}

  /**
   * initializeServerInstance
   */
  public initializeServerInstance() {
    // When the server are configured for use Cluster
    if (Configurations.server.useCluster) {
      if (Cluster.isMaster) {
        //let numReqs = 0;
        const messageHandler = (_msg: any) => {
          // if (msg.cmd && msg.cmd === 'notifyRequest') {
          //   numReqs += 1;
          // }
        };

        this.loggerService.info(`Master ${process.pid} is running`);

        // setInterval(() => {
        //   this.loggerService.info(`numReqs = ${numReqs}`);
        // }, 1000);

        // Fork worker
        for (let i = 0; i < Os.cpus().length; i++) {
          Cluster.fork().on('message', messageHandler);
        }

        Cluster.on('exit', (worker, code, signal) => {
          this.loggerService.warning(
            `Worker ${worker.process.pid} died. Code: ${code} Signal: ${signal}`
          );

          this.loggerService.info(`Starting new Worker`);

          Cluster.fork().on('message', messageHandler);
        });
      } else {
        this.loggerService.info(`Worker started ID: ${process.pid}`);
        this.server.initializeEmiliaServer();
      }
    } else {
      // When the server are configured for NOT use Cluster
      this.server.initializeEmiliaServer();
    }
  }
}

// --------------- Refister server instance -----------------
IoCContainer.registerInstances();
IoCContainer.container
  .bind<Startup>(Startup)
  .toSelf()
  .inSingletonScope();

// --------------- Resolve server instance ------------------
let startup: Startup = IoCContainer.container.get<Startup>(Startup);
startup.initializeServerInstance();
