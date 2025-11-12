import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          gateway: {
              supergraphSdl: new IntrospectAndCompose({
                  subgraphs: [
                      { name: 'auth', url: 'http://localhost:3001/graphql' },
                      { name: 'users', url: 'http://localhost:3002/graphql' },
                      { name: 'posts', url: 'http://localhost:3003/graphql' },
                  ],
              }),
          },
      }),
      ClientsModule.register([
          {
              name: SERVICES.AUTH,
              transport: Transport.REDIS,
              options: { host: 'localhost', port: 6379 },
          },
          // ... other services
      ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
