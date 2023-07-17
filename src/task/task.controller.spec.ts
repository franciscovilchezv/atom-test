import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { FirebaseModule } from 'nestjs-firebase';
import { TaskRepository } from './task.repository';
import { FirebaseService } from '../shared/firebase/firebase.service';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      imports: [
        FirebaseModule.forRoot({
          googleApplicationCredential: process.env.FIRESTORE_KEY,
        }),
      ],
      providers: [TaskService, TaskRepository, FirebaseService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
