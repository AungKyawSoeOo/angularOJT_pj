export interface User {
    name: string;
    gender: string;
    team: string;
    reading: boolean;
    swimming: boolean;
    cooking: boolean;
    dob: Date;
    createdAt: Date;
    deleted?: boolean;
    hobbies: string[];
}
