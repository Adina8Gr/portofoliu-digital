/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [PortfolioModule, FilesModule],
})
export class AppModule {}
