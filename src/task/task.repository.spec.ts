import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { FirebaseService } from '../shared/firebase/firebase.service';
import { FirebaseModule } from 'nestjs-firebase';

describe('TaskRepository', () => {
  let provider: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FirebaseModule.forRoot({
          googleApplicationCredential: process.env.FIRESTORE_KEY,
        }),
      ],
      providers: [TaskRepository, FirebaseService],
    }).compile();

    provider = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
