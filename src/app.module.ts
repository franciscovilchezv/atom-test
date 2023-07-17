import { Module, ValidationPipe } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { SharedModule } from './shared/shared.module';
import { FirebaseModule } from 'nestjs-firebase';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TaskModule,
    SharedModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: process.env.FIRESTORE_KEY,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
