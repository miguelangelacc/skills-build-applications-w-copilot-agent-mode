import { Types } from 'mongoose';
interface ITeam {
    _id?: string;
    name: string;
    description: string;
    leader: Types.ObjectId;
    members: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Team: import("mongoose").Model<ITeam, {}, {}, {}, import("mongoose").Document<unknown, {}, ITeam, {}, import("mongoose").DefaultSchemaOptions> & ITeam & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
export {};
//# sourceMappingURL=Team.d.ts.map