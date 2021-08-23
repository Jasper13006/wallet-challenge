import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { WalletModule } from './modules/wallet/wallet.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configuration],
      cache:true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type:  configService.get('DATABASE').CONNECTION,
        host:  configService.get('DATABASE').HOST,
        port:  configService.get('DATABASE').PORT,
        username:  configService.get('DATABASE').USERNAME,
        password:  configService.get('DATABASE').PASSWORD,
        database:  configService.get('DATABASE').DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    UsersModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
