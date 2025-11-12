
export const SERVICES = {
    AUTH: 'AUTH_SERVICE',
    USER: 'USER_SERVICE',
    POST: 'POST_SERVICE',
    FEED: 'FEED_SERVICE',
    NOTIFICATION: 'NOTIFICATION_SERVICE',
    CHAT: 'CHAT_SERVICE',
    MEDIA: 'MEDIA_SERVICE',
    SEARCH: 'SEARCH_SERVICE',
} as const;

export const MESSAGE_PATTERNS = {
    AUTH: {
        REGISTER: 'auth.register',
        LOGIN: 'auth.login',
        VALIDATE_TOKEN: 'auth.validate-token',
    },
    USER: {
        GET_PROFILE: 'user.get-profile',
        UPDATE_PROFILE: 'user.update-profile',
        FOLLOW_USER: 'user.follow',
        UNFOLLOW_USER: 'user.unfollow',
    },
    POST: {
        CREATE: 'post.create',
        GET_BY_ID: 'post.get-by-id',
        GET_USER_POSTS: 'post.get-user-posts',
        LIKE_POST: 'post.like',
        COMMENT: 'post.comment',
    }
} as const;