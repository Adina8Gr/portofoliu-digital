/* eslint-disable prettier/prettier */
export class CreatePortfolioDto {
  title: string;
  description: string;
  imageUrl: string;
  clientLink: string;
  status: 'hidden' | 'visible';
}
