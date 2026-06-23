interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export {};
//# sourceMappingURL=User.d.ts.map