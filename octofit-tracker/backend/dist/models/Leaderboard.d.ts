import { Types } from 'mongoose';
interface ILeaderboard {
    _id?: string;
    entity: 'user' | 'team';
    entityId: Types.ObjectId;
    score: number;
    rank: number;
    totalActivities: number;
    totalCalories: number;
    updatedAt?: Date;
}
export declare const Leaderboard: import("mongoose").Model<ILeaderboard, {}, {}, {}, import("mongoose").Document<unknown, {}, ILeaderboard, {}, import("mongoose").DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export {};
//# sourceMappingURL=Leaderboard.d.ts.map