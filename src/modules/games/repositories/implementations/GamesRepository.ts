import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("game")
      .where("LOWER(game.title) like LOWER(:title)", { title: '%' + param + '%' })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT(id) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const userRepo = await getRepository(User)

    return await userRepo
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.games", 'game')
      .where("game.id = :id", { id })
      .getMany();
    // Complete usando query builder
  }
}
