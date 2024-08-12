//Root module

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`], //One env. file per stage
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      //Wait until ConfigModule is finished before using it
      imports: [ConfigModule], //What is being imported
      inject: [ConfigService], //What needs to be injected from the import
      useFactory: async (configService: ConfigService) => {
        //A function called by NestJS whenever this module is initialized
        return {
          //Whatever is returned will be the config
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          migrationsRun: false,
          migrations: ['dist/migrations/*.ts'],
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
