interface IQuestions {
    question: string;
    type: string;
    category: string;
    answers: IAnswer[];
    questionAnswerResult?: string[];
}

interface IAnswer {
    answer: string;
    reason: string;
}

export interface ICourseRequestPost {
    id: string;
    name: string;
    category: string;
    passingGrade: number;
    completeTime: number;
    questionCategories: string[];
    questions: IQuestions[];
    date: Date;
}

export interface ICourse {
    key: string;
    content: {
    id: string;
    name: string;
    category: string;
    passingGrade: number;
    completeTime: number;
    questionCategories: string[];
    questions: object[];
    date: Date;
};
}

export interface IUser {
    username: string;
    password: string;
    type: string;
}