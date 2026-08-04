import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../data-source';
import { PaquetesEntity } from './entities/paquetes.entity';
import { ZoomController } from './controllers/zoom.controller';
import { ZoomService } from './services/zoom.service';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([PaquetesEntity]),
  ],
  controllers: [AppController, ZoomController],
  providers: [AppService, ZoomService],
})
export class AppModule {}
