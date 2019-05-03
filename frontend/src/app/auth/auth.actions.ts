import { createPayloadedAction } from '@utils/ngxs/create-payloaded-action';
import { createSimpleAction    } from '@utils/ngxs/create-simple-action';
import { CredentialsInput, SignUpInput } from '@app/gql/generated';


export const SignIn = createPayloadedAction<CredentialsInput>('[Auth] SignIn');
export type SignIn = InstanceType<typeof SignIn>;

export const SignUp = createPayloadedAction<SignUpInput>('[Auth] SignUp');
export type SignUp = InstanceType<typeof SignUp>;

export const SignOut = createSimpleAction('[Auth] SignOut');
