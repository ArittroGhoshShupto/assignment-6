export interface IWorkout {
  id: number | string;
  name: string;
  image?: string;
  muscleGroups?: string[];
  category?: string | string[];
  equipment?: string;
  difficulty?: string;
  duration?: number;
  caloriesBurned?: number;
  calories?: number;
  sets?: number;
  reps?: string;
  rating?: number;
  description?: string;
  instructions?: string[];
  isDone?: boolean;
}