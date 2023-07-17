import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import { HttpModule } from '@nestjs/axios';
import { FirebaseModule } from 'nestjs-firebase';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        FirebaseModule.forRoot({
          googleApplicationCredential: process.env.FIRESTORE_KEY,
        }),
      ],
      providers: [FirebaseService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
