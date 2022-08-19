export enum VoteState {
    novote = 0,
    upvoted = 1,
    downvoted = -1
}

export interface AllQuotes {
    curPageIdx: number
    pageSize: number
    quotes: Quote[]
}

export interface User {
    id: number,
    username: string,
    userProfileImg: string,
    karmaPoints: number
}

export interface Quote {
    id: number
    voteCount: number
    voteState: VoteState,
    text: string,
    user: User
}
