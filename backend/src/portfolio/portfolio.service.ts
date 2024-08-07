/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  private portfolios: Portfolio[] = [];

  create(createPortfolioDto: CreatePortfolioDto) {
    const newPortfolio = {
      id: this.portfolios.length + 1,
      ...createPortfolioDto,
    };
    this.portfolios.push(newPortfolio);
    return newPortfolio;
  }

  findAll() {
    return this.portfolios;
  }

  findOne(id: number) {
    return this.portfolios.find((portfolio) => portfolio.id === id);
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    const index = this.portfolios.findIndex((portfolio) => portfolio.id === id);
    if (index > -1) {
      this.portfolios[index] = {
        ...this.portfolios[index],
        ...updatePortfolioDto,
      };
      return this.portfolios[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.portfolios.findIndex((portfolio) => portfolio.id === id);
    if (index > -1) {
      const removedPortfolio = this.portfolios.splice(index, 1);
      return removedPortfolio[0];
    }
    return null;
  }
}
