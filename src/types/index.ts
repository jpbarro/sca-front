export type Target = {
    id: number;
    name: string;
    country: string;
    notes: string;
    complete: boolean;
    mission_id: number;
};

export type Mission = {
    id: number;
    cat_id: number;
    complete: boolean;
    targets: Target[];
};

export type SpyCat = {
    id: number;
    name: string;
    breed: string;
    years_of_experience: number;
    salary: number;
    mission: Mission;
};