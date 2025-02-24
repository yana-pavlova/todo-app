export type TTask = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export enum TaskType {
	All = 'all',
	Completed = 'completed',
	Uncompleted = 'uncompleted',
}
