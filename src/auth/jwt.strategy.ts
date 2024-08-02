import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //After token was validated
  async validate(payload: JwtPayload): Promise<User> {
    //Fetch user from database
    const { username } = payload;
    const user: User = await this.usersRepository.findOneBy({ username });

    //If user doesn't exist
    if (!user) {
      throw new UnauthorizedException();
    }

    //Passport will inject the user to the request object of the controller
    return user;
  }
}
