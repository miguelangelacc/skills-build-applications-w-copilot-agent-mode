interface IWorkout {
    _id?: string;
    name: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    exercises: Array<{
        name: string;
        sets: number;
        reps: number;
    }>;
    caloriesBurned: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Workout: import("mongoose").Model<IWorkout, {}, {}, {}, import("mongoose").Document<unknown, {}, IWorkout, {}, import("mongoose").DefaultSchemaOptions> & IWorkout & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export {};
//# sourceMappingURL=Workout.d.ts.map