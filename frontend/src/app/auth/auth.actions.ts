import { CredentialsInput, SignUpInput } from '@app/gql/generated';
import { createAction } from '@utils/ngxs/create-action';

export class SignIn extends createAction<CredentialsInput>('[Auth] SignIn') {}

export class SignUp extends createAction<SignUpInput>('[Auth] SignUp') {}

export class SignOut { static readonly type = '[Auth] SignOut'; }
