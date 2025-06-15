import { UnauthorizedError } from '@avyyx/server-utils';
import { injectable } from 'inversify';
import { JwtService } from './jwt.service';
import { UserRepository } from '../../user/user.repository';
import { SigninDto } from '../dtos/signin.dto';
import { generateHash } from '../../../utils';

@injectable()
export class SigninService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    /**
     * Signs in a user and returns a tokens pair.
     * @param {SigninDto} dto - The signin DTO.
     * @returns {Promise<TokensPair>} - The tokens pair.
     */
    async signin(dto: SigninDto) {
        const user = await this.userRepository.findByEmail(dto.email);

        if (!user) throw new UnauthorizedError('Invalid email or password');

        const { hash } = generateHash(dto.password, user.salt);

        if (hash !== user.password)
            throw new UnauthorizedError('Invalid email or password');

        return await this.jwtService.getTokensPair(user.id);
    }
}
