export interface ICreateComment {
    postId: string;
    authorId: string;
    content: string;
};

export interface IUpdateComment {
    postId?: string;
    authorId?: string;
    content?: string;
}