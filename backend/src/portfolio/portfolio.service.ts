/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  private portfolios: Portfolio[] = [];
  private nextId = 1;

  create(createPortfolioDto: CreatePortfolioDto): Portfolio {
    const newPortfolio = {
      id: this.nextId++,
      ...createPortfolioDto,
    };
    this.portfolios.push(newPortfolio);
    return newPortfolio;
  }

  findAll(): Portfolio[] {
    return this.portfolios;
  }

  findOne(id: number): Portfolio {
    const portfolio = this.portfolios.find((portfolio) => portfolio.id === id);
    if (!portfolio) {
      throw new NotFoundException(`Portfolio item with id ${id} not found`);
    }
    return portfolio;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto): Portfolio {
    const index = this.portfolios.findIndex((portfolio) => portfolio.id === id);
    if (index === -1) {
      throw new NotFoundException(`Portfolio item with id ${id} not found`);
    }
    this.portfolios[index] = { ...this.portfolios[index], ...updatePortfolioDto };
    return this.portfolios[index];
  }

  remove(id: number): Portfolio {
    const index = this.portfolios.findIndex((portfolio) => portfolio.id === id);
    if (index === -1) {
      throw new NotFoundException(`Portfolio item with id ${id} not found`);
    }
    const removedPortfolio = this.portfolios.splice(index, 1);
    return removedPortfolio[0];
  }
}
