export interface IWorkout {
  id: string | number;
  name: string;
  image: string;
  category?: string | string[];
  equipment: string;
  duration: number;
  calories?: number;
  caloriesBurned?: number;
  rating: number;
  description?: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  instructions?: string[];
  isDone?: boolean;
}