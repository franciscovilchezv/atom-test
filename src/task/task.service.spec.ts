import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { FirebaseService } from '../shared/firebase/firebase.service';
import { FirebaseModule } from 'nestjs-firebase';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FirebaseModule.forRoot({
          googleApplicationCredential: process.env.FIRESTORE_KEY,
        }),
      ],
      providers: [TaskService, TaskRepository, FirebaseService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
