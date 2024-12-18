export type TTask = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export enum TaskType {
	Completed = 'completed',
	Uncompleted = 'uncompleted',
}
