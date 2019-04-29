import * as Path from 'path';
import * as Joi from 'typesafe-joi';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GqlOptionsFactory, GqlModuleOptions         } from '@nestjs/graphql';
import { JwtOptionsFactory, JwtModuleOptions         } from '@nestjs/jwt';
import { AuthOptionsFactory, AuthModuleOptions       } from '@nestjs/passport';
import { ExtractJwt, StrategyOptions as PassportJwtStrategyOptions } from 'passport-jwt';

import { getResolveContext } from '@modules/common/resolve-context';
import { EnvService        } from '@utils/env/env.service';
import { IntegerRange      } from '@utils/math/integer-range.class';

@Injectable()
export class ConfigService
implements TypeOrmOptionsFactory, GqlOptionsFactory, JwtOptionsFactory, AuthOptionsFactory {
    static readonly limits = {
        proposal: {
            name:      new IntegerRange(1, 256),
            introText: new IntegerRange(0, 256),
            bodyText:  new IntegerRange(0, 5001),
        },
    
        user: {
            name:     new IntegerRange(3, 256),
            password: new IntegerRange(5, 37),
            login:    new IntegerRange(2, 37),
        },
    
        imageUrl:     new IntegerRange(0, 256)
    } as const;

    readonly default = {
        user:     { avatarUrl:      '/assets/default-user-avatar.svg'           },
        proposal: { mainPictureUrl: '/assets/default-proposal-main-picture.svg' }
    } as const;


    readonly passwordSalt      = this.env.readEnvOrFail('PASSWORD_SALT');
    readonly port              = this.env.readPortFromEnvOrFail('PORT');
    readonly frontendPublicDir = this.pathFromRoot('frontend/dist/frontend');
    

    readonly jwtKeypair = this.env.parseFileSyncOrThrow(
        this.pathFromRoot('backend/.rsa-keypair.json'),
        Joi.object({
            private: Joi.string().required(),
            public:  Joi.string().required()
        }).required()
    );

    constructor(
        private readonly env: EnvService
    ) {}

    pathFromRoot(...pathParts: string[]) {        
        return Path.normalize(Path.join(__dirname, '../../../../', ...pathParts));
    }

    createGqlOptions(): GqlModuleOptions {
        return {
            playground:     true,
            introspection:  true,
            debug:          true,
            autoSchemaFile: this.pathFromRoot('common/schema.graphql'),
            path:           '/gql',
            context:        getResolveContext
        };
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {   
            type:        'postgres',
            port:        this.env.readPortFromEnvOrFail('DB_PORT'),
            host:        this.env.readEnvOrFail('DB_HOST'),
            username:    this.env.readEnvOrFail('DB_USER'),
            password:    this.env.readEnvOrFail('DB_PASSWORD'),
            database:    this.env.readEnvOrFail('DB_DB'),
            entities:   [this.pathFromRoot('backend/src/modules/**/*.entity.ts')],
            keepConnectionAlive:   true,
            maxQueryExecutionTime: 200, //TODO remove on production
            logging:     true,          // 
            synchronize: true           //   
        };
    }

    createAuthOptions(): AuthModuleOptions {
        return { defaultStrategy: 'jwt' };
    }

    createPassportJwtStrategyOptions(): PassportJwtStrategyOptions {
        return { 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:    this.jwtKeypair.private,
            algorithms: ['RS256']
        };
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            publicKey:          this.jwtKeypair.public,
            secretOrPrivateKey: this.jwtKeypair.private,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: this.env.readEnvOrFail('TOKEN_EXPIRATION_ZEIT'),
            }
        };
    }
}
