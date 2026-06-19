import { Types } from 'mongoose';
interface IActivity {
    _id?: string;
    user: Types.ObjectId;
    type: string;
    duration: number;
    calories: number;
    distance?: number;
    description: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Activity: import("mongoose").Model<IActivity, {}, {}, {}, import("mongoose").Document<unknown, {}, IActivity, {}, import("mongoose").DefaultSchemaOptions> & IActivity & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export {};
//# sourceMappingURL=Activity.d.ts.map