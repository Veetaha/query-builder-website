export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: string;
};

export type AdminUserUpdateInput = {
    name?: Maybe<Scalars["String"]>;
    avatarUrl?: Maybe<Scalars["String"]>;
    /** Defines the login of the user to update */
    login: Scalars["String"];
    role?: Maybe<UserRole>;
};

/** Filter input parameters for `Boolean` type. */
export type BooleanFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    eq?: Maybe<Scalars["Boolean"]>;
    neq?: Maybe<Scalars["Boolean"]>;
};

export type CredentialsInput = {
    login: Scalars["String"];
    password: Scalars["String"];
};

/** Filter input parameters for `Date` type. */
export type DateFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    eq?: Maybe<Scalars["DateTime"]>;
    neq?: Maybe<Scalars["DateTime"]>;
    geq?: Maybe<Scalars["DateTime"]>;
    leq?: Maybe<Scalars["DateTime"]>;
    gt?: Maybe<Scalars["DateTime"]>;
    lt?: Maybe<Scalars["DateTime"]>;
    in?: Maybe<Array<Scalars["DateTime"]>>;
    nin?: Maybe<Array<Scalars["DateTime"]>>;
};

/** Defines a mode to unite all filter conditions for fields or inside one field. */
export enum FilterUnion {
    And = "And",
    Or = "Or",
    Nand = "Nand",
    Nor = "Nor"
}

export type IntFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    eq?: Maybe<Scalars["Int"]>;
    neq?: Maybe<Scalars["Int"]>;
    geq?: Maybe<Scalars["Int"]>;
    leq?: Maybe<Scalars["Int"]>;
    gt?: Maybe<Scalars["Int"]>;
    lt?: Maybe<Scalars["Int"]>;
    in?: Maybe<Array<Scalars["Int"]>>;
    nin?: Maybe<Array<Scalars["Int"]>>;
};

export type MetaProposalFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    props: ProposalFilterInput;
};

export type MetaRatingFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    props: RatingFilterInput;
};

export type MetaUserFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    props: UserFilterInput;
};

export type Mutation = {
    /** Returns `UserAndToken` for the client according to the given `credentials`. */
    signIn?: Maybe<UserAndToken>;
    /** Registers the client in the database and returns its `UserAndToken`. Throws if failed to register new client. */
    signUp: UserAndToken;
    /** Requires auth. Updates current client data and returns it. */
    updateMe: User;
    /** Requires 'Admin' rights. Updates user by the given login and returns it, but
     * retuns `null` if there nothing was found for the given login.
     */
    updateUser?: Maybe<User>;
    /** Requires auth. Creates or updates existing rating the client gave to the proposal. */
    rateProposal: Rating;
    /** Requires auth. Deletes rating instance on behalf of the client. Returns `true` if deletion was successful. */
    deleteRating: Scalars["Boolean"];
    /** Requires auth. Creates a proposal on behalf of the client and returns it. */
    createProposal: Proposal;
    /** Requires auth. Updates proposal and returns it, but throws if propsal doesn't
     * exist or client has no rights to mutate the proposal.
     */
    updateProposal: Proposal;
    /** Requires auth. Deletes the proposal by id and returns `true`, but throws  if
     * propsal doesn't exist or client has no rights to mutate the proposal.
     */
    deleteProposal: Scalars["Boolean"];
};

export type MutationSignInArgs = {
    params: CredentialsInput;
};

export type MutationSignUpArgs = {
    params: SignUpInput;
};

export type MutationUpdateMeArgs = {
    params: UserUpdateInput;
};

export type MutationUpdateUserArgs = {
    params: AdminUserUpdateInput;
};

export type MutationRateProposalArgs = {
    proposalId: Scalars["Int"];
    liked: Scalars["Boolean"];
};

export type MutationDeleteRatingArgs = {
    proposalId: Scalars["Float"];
};

export type MutationCreateProposalArgs = {
    params: ProposalCreateInput;
};

export type MutationUpdateProposalArgs = {
    params: ProposalUpdateInput;
};

export type MutationDeleteProposalArgs = {
    id: Scalars["Float"];
};

export type Proposal = {
    id: Scalars["Int"];
    creationDate: Scalars["DateTime"];
    lastUpdateDate: Scalars["DateTime"];
    creatorLogin: Scalars["String"];
    name: Scalars["String"];
    introText: Scalars["String"];
    bodyText: Scalars["String"];
    mainPictureUrl?: Maybe<Scalars["String"]>;
    /** Returns the total number of likes for this proposal. */
    likes: Scalars["Int"];
    /** Returns the total number of dislikes for this proposal. */
    dislikes: Scalars["Int"];
    /** Defines whether the author of this proposal is ready to accept requests for it. */
    isOpenned: Scalars["Boolean"];
    /** Returns the rating that the client has set to this proposal or `null` if
     * client is not authenticated or he hasn't set any rating to the target proposal.
     */
    myRating?: Maybe<Rating>;
    /** Returns existing `mainPictureUrl` or default one if former was not set. */
    mainPictureUrlOrDefault: Scalars["String"];
    /** Returns the user that created this proposal. */
    creator: User;
};

export type ProposalCreateInput = {
    name: Scalars["String"];
    introText: Scalars["String"];
    bodyText: Scalars["String"];
    mainPictureUrl?: Maybe<Scalars["String"]>;
};

export type ProposalFilterInput = {
    id?: Maybe<IntFilterInput>;
    name?: Maybe<StringFilterInput>;
    introText?: Maybe<StringFilterInput>;
    creatorLogin?: Maybe<StringFilterInput>;
    creationDate?: Maybe<DateFilterInput>;
    lastUpdateDate?: Maybe<DateFilterInput>;
};

export type ProposalPage = {
    /** Contains an array of items payload for this page. */
    data: Array<Proposal>;
    /** Total number of items a client can query with this request. It must me an integer that is >= 0. */
    total: Scalars["Int"];
};

export type ProposalPaginationInput = {
    /** Maximum amount of items to return for page. It must be an integer within the range [0, 500] */
    limit: Scalars["Int"];
    /** Offset that defines an index of the beginning of the page of items. It must be an integer that is >= 0. */
    offset: Scalars["Int"];
    /** Defines limitations for the items of the returned page. */
    filter?: Maybe<MetaProposalFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<ProposalSortInput>;
};

export type ProposalSortInput = {
    id?: Maybe<SortInput>;
    creationDate?: Maybe<SortInput>;
    lastUpdateDate?: Maybe<SortInput>;
    name?: Maybe<SortInput>;
    creatorLogin?: Maybe<SortInput>;
    introText?: Maybe<SortInput>;
};

export type ProposalUpdateInput = {
    id: Scalars["Int"];
    name?: Maybe<Scalars["String"]>;
    introText?: Maybe<Scalars["String"]>;
    bodyText?: Maybe<Scalars["String"]>;
    mainPictureUrl?: Maybe<Scalars["String"]>;
    isOpenned?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
    /** Returns user by login, or `null` if nothing was found. */
    getUserByLogin?: Maybe<User>;
    /** Paginates all users. */
    getUsersPage: UserPage;
    /** Requires auth. Returns `User` that represents the current client. */
    getMe: User;
    /** Paginates all ratings. */
    getRatingsPage: RatingPage;
    /** Paginates all proposals. */
    getProposalsPage: ProposalPage;
    /** Returns proposal by id, or `null` if nothing was found. */
    getProposalById?: Maybe<Proposal>;
};

export type QueryGetUserByLoginArgs = {
    login: Scalars["String"];
};

export type QueryGetUsersPageArgs = {
    params: UserPaginationInput;
};

export type QueryGetRatingsPageArgs = {
    params: RatingPaginationInput;
};

export type QueryGetProposalsPageArgs = {
    params: ProposalPaginationInput;
};

export type QueryGetProposalByIdArgs = {
    id: Scalars["Int"];
};

/** Represents a [dis]like instance that the users put to proposals. */
export type Rating = {
    /** Login of the user that rated the proposal. */
    raterLogin: Scalars["String"];
    /** Id of the proposal that the user rated. */
    proposalId: Scalars["Int"];
    /** Defines whether the user liked the proposal or not. */
    liked: Scalars["Boolean"];
    /** Returns the user that rated the given `proposal`. */
    rater: User;
    /** Returns proposal that was rated by the given `rater`. */
    proposal: Proposal;
};

export type RatingFilterInput = {
    proposalId?: Maybe<IntFilterInput>;
    raterLogin?: Maybe<StringFilterInput>;
    liked?: Maybe<BooleanFilterInput>;
};

export type RatingPage = {
    /** Contains an array of items payload for this page. */
    data: Array<Rating>;
    /** Total number of items a client can query with this request. It must me an integer that is >= 0. */
    total: Scalars["Int"];
};

export type RatingPaginationInput = {
    /** Maximum amount of items to return for page. It must be an integer within the range [0, 500] */
    limit: Scalars["Int"];
    /** Offset that defines an index of the beginning of the page of items. It must be an integer that is >= 0. */
    offset: Scalars["Int"];
    /** Defines limitations for the items of the returned page. */
    filter?: Maybe<MetaRatingFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<RatingSortInput>;
};

export type RatingSortInput = {
    proposalId?: Maybe<SortInput>;
    raterLogin?: Maybe<SortInput>;
    liked?: Maybe<SortInput>;
};

export type SignUpInput = {
    credentials: CredentialsInput;
    name: Scalars["String"];
};

/** Defines ascending or descending order for sorting items. */
export enum SortingOrder {
    Asc = "Asc",
    Desc = "Desc"
}

/** Defines sorting order for the given field. */
export type SortInput = {
    /** Defines whether to return `null` values first or not (`false` by default) */
    nullsFirst?: Maybe<Scalars["Boolean"]>;
    /** Defines the order for the given field to be sorted with. */
    ordering: SortingOrder;
};

/** Filter input parameters for `String` type */
export type StringFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    eq?: Maybe<Scalars["String"]>;
    neq?: Maybe<Scalars["String"]>;
    ilike?: Maybe<Scalars["String"]>;
    nilike?: Maybe<Scalars["String"]>;
    like?: Maybe<Scalars["String"]>;
    nlike?: Maybe<Scalars["String"]>;
    in?: Maybe<Array<Scalars["String"]>>;
    nin?: Maybe<Array<Scalars["String"]>>;
};

export type User = {
    creationDate: Scalars["DateTime"];
    lastUpdateDate: Scalars["DateTime"];
    role: UserRole;
    name: Scalars["String"];
    login: Scalars["String"];
    /** User avatar picture url, or null of was not set. */
    avatarUrl?: Maybe<Scalars["String"]>;
    /** Returns existing `avatarUrl` or default one if former was not set. */
    avatarUrlOrDefault: Scalars["String"];
};

export type UserAndToken = {
    /** User instance that represents the client data. */
    user: User;
    /** Bearer auth token that the client has to pass in "Authorization" header */
    token: Scalars["String"];
};

export type UserFilterInput = {
    avatarUrl?: Maybe<StringFilterInput>;
    creationDate?: Maybe<DateFilterInput>;
    lastUpdateDate?: Maybe<DateFilterInput>;
    login?: Maybe<StringFilterInput>;
    name?: Maybe<StringFilterInput>;
    role?: Maybe<UserRoleFilterInput>;
};

export type UserPage = {
    /** Contains an array of items payload for this page. */
    data: Array<User>;
    /** Total number of items a client can query with this request. It must me an integer that is >= 0. */
    total: Scalars["Int"];
};

export type UserPaginationInput = {
    /** Maximum amount of items to return for page. It must be an integer within the range [0, 500] */
    limit: Scalars["Int"];
    /** Offset that defines an index of the beginning of the page of items. It must be an integer that is >= 0. */
    offset: Scalars["Int"];
    /** Defines limitations for the items of the returned page. */
    filter?: Maybe<MetaUserFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<UserSortInput>;
};

/** Enumeration that defines users' access level */
export enum UserRole {
    Guest = "Guest",
    Regular = "Regular",
    Admin = "Admin"
}

export type UserRoleFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    eq?: Maybe<UserRole>;
    neq?: Maybe<UserRole>;
    in?: Maybe<Array<UserRole>>;
    nin?: Maybe<Array<UserRole>>;
};

export type UserSortInput = {
    avatarUrl?: Maybe<SortInput>;
    login?: Maybe<SortInput>;
    name?: Maybe<SortInput>;
    creationDate?: Maybe<SortInput>;
    lastUpdateDate?: Maybe<SortInput>;
    role?: Maybe<SortInput>;
};

export type UserUpdateInput = {
    name?: Maybe<Scalars["String"]>;
    avatarUrl?: Maybe<Scalars["String"]>;
};
export type EntireUserFragment = { __typename: "User" } & Pick<
    User,
    "creationDate" | "lastUpdateDate" | "role" | "name" | "login"
> & { avatarUrl: User["avatarUrlOrDefault"] };

export type EntireClientAndTokenFragment = {
    __typename?: "UserAndToken";
} & Pick<UserAndToken, "token"> & {
        client: { __typename?: "User" } & EntireUserFragment;
    };

export type GetMeQueryVariables = {};

export type GetMeQuery = { __typename?: "Query" } & {
    getMe: { __typename?: "User" } & EntireUserFragment;
};

export type SignUpMutationVariables = {
    params: SignUpInput;
};

export type SignUpMutation = { __typename?: "Mutation" } & {
    signUp: { __typename?: "UserAndToken" } & EntireClientAndTokenFragment;
};

export type SignInMutationVariables = {
    params: CredentialsInput;
};

export type SignInMutation = { __typename?: "Mutation" } & {
    signIn: Maybe<
        { __typename?: "UserAndToken" } & EntireClientAndTokenFragment
    >;
};

export type PaginatedProposalFragment = { __typename?: "Proposal" } & Pick<
    Proposal,
    | "id"
    | "name"
    | "introText"
    | "isOpenned"
    | "likes"
    | "dislikes"
    | "creationDate"
> & { mainPictureUrl: Proposal["mainPictureUrlOrDefault"] } & {
        creator: { __typename?: "User" } & Pick<
            User,
            "login" | "role" | "name"
        > & { avatarUrl: User["avatarUrlOrDefault"] };
    };

export type GetProposalsPageQueryVariables = {
    params: ProposalPaginationInput;
};

export type GetProposalsPageQuery = { __typename?: "Query" } & {
    getProposalsPage: { __typename?: "ProposalPage" } & Pick<
        ProposalPage,
        "total"
    > & {
            data: Array<
                { __typename?: "Proposal" } & PaginatedProposalFragment
            >;
        };
};

export type EntireProposalFragment = { __typename?: "Proposal" } & Pick<
    Proposal,
    | "id"
    | "creationDate"
    | "lastUpdateDate"
    | "name"
    | "introText"
    | "bodyText"
    | "likes"
    | "dislikes"
    | "isOpenned"
> & { mainPictureUrl: Proposal["mainPictureUrlOrDefault"] } & {
        creator: { __typename?: "User" } & Pick<
            User,
            "login" | "role" | "name"
        > & { avatarUrl: User["avatarUrlOrDefault"] };
        myRating: Maybe<{ __typename?: "Rating" } & Pick<Rating, "liked">>;
    };

export type GetProposalByIdQueryVariables = {
    id: Scalars["Int"];
};

export type GetProposalByIdQuery = { __typename?: "Query" } & {
    getProposalById: Maybe<
        { __typename?: "Proposal" } & EntireProposalFragment
    >;
};

export type RateProposalMutationVariables = {
    proposalId: Scalars["Int"];
    liked: Scalars["Boolean"];
};

export type RateProposalMutation = { __typename?: "Mutation" } & {
    rateProposal: { __typename?: "Rating" } & Pick<Rating, "liked">;
};

export type UpdateProposalMutationVariables = {
    params: ProposalUpdateInput;
};

export type UpdateProposalMutation = { __typename?: "Mutation" } & {
    updateProposal: { __typename?: "Proposal" } & EntireProposalFragment;
};

export type CreateProposalMutationVariables = {
    params: ProposalCreateInput;
};

export type CreateProposalMutation = { __typename?: "Mutation" } & {
    createProposal: { __typename?: "Proposal" } & Pick<Proposal, "id">;
};

export type GetUsersPageQueryVariables = {
    params: UserPaginationInput;
};

export type GetUsersPageQuery = { __typename?: "Query" } & {
    getUsersPage: { __typename?: "UserPage" } & Pick<UserPage, "total"> & {
            data: Array<
                { __typename?: "User" } & Pick<
                    User,
                    "role" | "name" | "login"
                > & { avatarUrl: User["avatarUrlOrDefault"] }
            >;
        };
};

import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export const EntireUserFragmentDoc = gql`
    fragment EntireUser on User {
        __typename
        creationDate
        lastUpdateDate
        role
        name
        login
        avatarUrl: avatarUrlOrDefault
    }
`;
export const EntireClientAndTokenFragmentDoc = gql`
    fragment EntireClientAndToken on UserAndToken {
        token
        client: user {
            ...EntireUser
        }
    }
    ${EntireUserFragmentDoc}
`;
export const PaginatedProposalFragmentDoc = gql`
    fragment PaginatedProposal on Proposal {
        id
        name
        introText
        isOpenned
        likes
        dislikes
        mainPictureUrl: mainPictureUrlOrDefault
        creationDate
        creator {
            login
            avatarUrl: avatarUrlOrDefault
            role
            name
        }
    }
`;
export const EntireProposalFragmentDoc = gql`
    fragment EntireProposal on Proposal {
        id
        creationDate
        lastUpdateDate
        name
        introText
        bodyText
        mainPictureUrl: mainPictureUrlOrDefault
        likes
        dislikes
        isOpenned
        creator {
            login
            avatarUrl: avatarUrlOrDefault
            role
            name
        }
        myRating {
            liked
        }
    }
`;
export const GetMeDocument = gql`
    query getMe {
        getMe {
            ...EntireUser
        }
    }
    ${EntireUserFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class GetMeGQL extends Apollo.Query<GetMeQuery, GetMeQueryVariables> {
    document = GetMeDocument;
}
export const SignUpDocument = gql`
    mutation signUp($params: SignUpInput!) {
        signUp(params: $params) {
            ...EntireClientAndToken
        }
    }
    ${EntireClientAndTokenFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class SignUpGQL extends Apollo.Mutation<
    SignUpMutation,
    SignUpMutationVariables
> {
    document = SignUpDocument;
}
export const SignInDocument = gql`
    mutation signIn($params: CredentialsInput!) {
        signIn(params: $params) {
            ...EntireClientAndToken
        }
    }
    ${EntireClientAndTokenFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class SignInGQL extends Apollo.Mutation<
    SignInMutation,
    SignInMutationVariables
> {
    document = SignInDocument;
}
export const GetProposalsPageDocument = gql`
    query getProposalsPage($params: ProposalPaginationInput!) {
        getProposalsPage(params: $params) {
            total
            data {
                ...PaginatedProposal
            }
        }
    }
    ${PaginatedProposalFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class GetProposalsPageGQL extends Apollo.Query<
    GetProposalsPageQuery,
    GetProposalsPageQueryVariables
> {
    document = GetProposalsPageDocument;
}
export const GetProposalByIdDocument = gql`
    query getProposalById($id: Int!) {
        getProposalById(id: $id) {
            ...EntireProposal
        }
    }
    ${EntireProposalFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class GetProposalByIdGQL extends Apollo.Query<
    GetProposalByIdQuery,
    GetProposalByIdQueryVariables
> {
    document = GetProposalByIdDocument;
}
export const RateProposalDocument = gql`
    mutation rateProposal($proposalId: Int!, $liked: Boolean!) {
        rateProposal(proposalId: $proposalId, liked: $liked) {
            liked
        }
    }
`;

@Injectable({
    providedIn: "root"
})
export class RateProposalGQL extends Apollo.Mutation<
    RateProposalMutation,
    RateProposalMutationVariables
> {
    document = RateProposalDocument;
}
export const UpdateProposalDocument = gql`
    mutation updateProposal($params: ProposalUpdateInput!) {
        updateProposal(params: $params) {
            ...EntireProposal
        }
    }
    ${EntireProposalFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class UpdateProposalGQL extends Apollo.Mutation<
    UpdateProposalMutation,
    UpdateProposalMutationVariables
> {
    document = UpdateProposalDocument;
}
export const CreateProposalDocument = gql`
    mutation createProposal($params: ProposalCreateInput!) {
        createProposal(params: $params) {
            id
        }
    }
`;

@Injectable({
    providedIn: "root"
})
export class CreateProposalGQL extends Apollo.Mutation<
    CreateProposalMutation,
    CreateProposalMutationVariables
> {
    document = CreateProposalDocument;
}
export const GetUsersPageDocument = gql`
    query getUsersPage($params: UserPaginationInput!) {
        getUsersPage(params: $params) {
            total
            data {
                role
                name
                login
                avatarUrl: avatarUrlOrDefault
            }
        }
    }
`;

@Injectable({
    providedIn: "root"
})
export class GetUsersPageGQL extends Apollo.Query<
    GetUsersPageQuery,
    GetUsersPageQueryVariables
> {
    document = GetUsersPageDocument;
}
