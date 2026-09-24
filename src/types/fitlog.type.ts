export interface IWorkout {
  id: string;
  name: string;
  image: string;
  category: string[];
  equipment: string;
  duration: string;
  calories: number;
  rating: number;
}