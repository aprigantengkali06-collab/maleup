export type PhaseType = 'foundation' | 'fat_loss' | 'conditioning' | 'strength' | 'maintenance';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'snack1' | 'snack2';
export type WorkoutType = 'rest' | 'walk' | 'strength_upper' | 'strength_lower' | 'full_body' | 'hiit' | 'tabata' | 'mobility';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Profile {
  id: string;
  name: string;
  height_cm: number;
  starting_weight_kg: number;
  current_weight_kg: number;
  target_weight_kg: number;
  starting_waist_cm: number;
  age: number;
  starting_penis_length: string;
  starting_penis_girth: string;
  current_phase: 1 | 2 | 3 | 4 | 5;
  current_week: number;
  program_start_date: string;
  tdee: number;
  bmi: number;
  created_at?: string;
  updated_at?: string;
}

export interface Phase {
  id?: number;
  phase_number: 1 | 2 | 3 | 4 | 5;
  name: string;
  phase_type: PhaseType;
  week_start: number;
  week_end: number;
  daily_calories_min: number;
  daily_calories_max: number;
  protein_target_g: number;
  carb_target_g: number;
  fat_target_g: number;
  description: string;
  exercise_description: string;
  kegel_description: string;
}

export interface Food {
  id: number;
  name: string;
  name_en: string;
  calories_per_100g: number;
  protein_per_100g: number;
  fat_per_100g: number;
  carb_per_100g: number;
  fiber_per_100g: number;
  serving_size_g: number;
  serving_description: string;
  category:
    | 'protein_hewani'
    | 'protein_nabati'
    | 'karbohidrat'
    | 'sayuran'
    | 'bumbu'
    | 'dairy'
    | 'lainnya';
}

export interface DailyMealPlan {
  id: number;
  phase_number?: number;
  phaseNumber?: number;
  phaseId?: string | null;
  week_number?: number;
  weekNumber?: number;
  day_of_week?: DayOfWeek;
  dayOfWeek?: DayOfWeek;
  day_number?: number;
  dayNumber?: number;
  day_name?: string;
  dayName?: string;
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
  meals?: Meal[];
}

export interface Meal {
  id: number;
  daily_meal_plan_id?: number;
  dailyMealPlanId?: number;
  meal_type?: MealType;
  mealType?: MealType;
  time_scheduled?: string;
  timeScheduled?: string;
  name?: string;
  mealName?: string;
  description?: string;
  recipe_instructions?: string;
  recipeInstructions?: string;
  cooking_time_minutes?: number;
  prep_time_minutes?: number;
  prepTimeMinutes?: number;
  total_calories?: number;
  calories?: number;
  total_protein_g?: number;
  protein?: number;
  total_fat_g?: number;
  fat?: number;
  total_carb_g?: number;
  carbs?: number;
  image_url?: string | null;
  imageUrl?: string | null;
  sort_order?: number;
  sortOrder?: number;
  meal_ingredients?: MealIngredient[];
  ingredients?: MealIngredient[];
}

export interface MealIngredient {
  id: number;
  meal_id?: number;
  mealId?: number;
  food_id?: number;
  foodId?: number;
  foodName?: string;
  quantity_g?: number;
  quantity?: number;
  unit?: string;
  notes?: string;
  quantity_description?: string;
  calories_portion?: number;
  protein_portion?: number;
  fat_portion?: number;
  carb_portion?: number;
  food?: Food;
}

export interface WorkoutPlan {
  id: number;
  phase_number: number;
  day_of_week: DayOfWeek;
  workout_type: WorkoutType;
  duration_minutes: number;
  description: string;
  warmup_description: string;
  cooldown_description: string;
  exercises?: Exercise[];
  timerConfig?: {
    rounds: number;
    workSeconds: number;
    restSeconds: number;
    setsPerRound?: number;
  };
}

export interface Exercise {
  id: number;
  workout_plan_id: number;
  name: string;
  sets: number;
  reps: string;
  work_seconds: number | null;
  rest_seconds: number | null;
  order_index: number;
  muscle_group: string;
  instructions: string;
  tips: string;
}

export interface KegelPlan {
  id: number;
  phase_number: number;
  sets: number;
  reps: number;
  hold_seconds: number;
  relax_seconds: number;
  times_per_day: number;
  include_reverse_kegel: boolean;
  description: string;
}

export interface WeightLog {
  id?: number;
  user_id: string;
  weight_kg: number;
  waist_cm: number | null;
  logged_at: string;
}

export interface MeasurementLog {
  id?: number;
  user_id: string;
  penis_length: string;
  penis_girth: string;
  erection_hardness_score: 1 | 2 | 3 | 4;
  notes: string | null;
  logged_at: string;
}

export interface MealLog {
  id?: number;
  user_id: string;
  meal_id: number | null;
  date: string;
  meal_type: MealType;
  calories_consumed: number;
  protein_consumed_g: number;
  completed: boolean;
  logged_at?: string;
}

export interface WorkoutLog {
  id?: number;
  user_id: string;
  workout_plan_id: number | null;
  date: string;
  workout_type: WorkoutType;
  completed: boolean;
  duration_actual_minutes: number;
  intensity_rating: 1 | 2 | 3 | 4 | 5 | null;
  notes: string | null;
  logged_at?: string;
}

export interface KegelLog {
  id?: number;
  user_id: string;
  date: string;
  session: 'morning' | 'night';
  sets_completed: number;
  reps_completed: number;
  completed: boolean;
  logged_at?: string;
}

export interface Achievement {
  id?: number;
  name: string;
  description: string;
  icon: string;
  condition_type: string;
  condition_value: number;
  category: string;
}

export interface UserAchievement {
  id?: number;
  user_id: string;
  achievement_id: number;
  unlocked_at: string;
  achievement?: Achievement;
}

export interface PushSubscriptionRecord {
  id?: number;
  user_id: string;
  subscription_json: Record<string, unknown>;
  created_at?: string;
}

export interface MacroSummary {
  calories: number;
  protein: number;
  fat: number;
  carb: number;
  calorieTargetMin: number;
  calorieTargetMax: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
}

export interface TodaySummary {
  caloriesConsumed: number;
  caloriesTarget: number;
  workoutsCompleted: number;
  waterIntakeLiters?: number; // deprecated: no actual tracking; removed from dashboard
  completedMeals: number;
  totalMeals: number;
  kegelDone: number;
  streakDays: number;
}

export interface DashboardData {
  profile: Profile | null;
  phase: Phase | null;
  todaySummary: TodaySummary;
  todayMealPlan: DailyMealPlan | null;
  todayWorkout: WorkoutPlan | null;
  todayKegel: KegelPlan | null;
  latestWeightLogs: WeightLog[];
  latestMeasurementLogs: MeasurementLog[];
  achievements: UserAchievement[];
  macroSummary: MacroSummary;
}

export interface ChartDataPoint {
  date: string;
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface ProjectionData {
  week: number;
  projectedWeight: number;
  projectedWaist: number;
  projectedPenisLength: number;
  phase: 1 | 2 | 3 | 4 | 5;
}

export interface TimerState {
  mode: 'idle' | 'hiit' | 'kegel';
  isRunning: boolean;
  currentSet: number;
  currentRep: number;
  currentPhase: 'work' | 'rest' | 'prepare';
  timeRemaining: number;
  totalSets: number;
  totalReps: number;
  workDuration: number;
  restDuration: number;
  exercises: string[];
  currentExerciseIndex: number;
}

export interface OnboardingFormData {
  name: string;
  age: number;
  heightCm: number;
  startingWeightKg: number;
  currentWeightKg: number;
  targetWeightKg: number;
  startingWaistCm: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  startLengthCm: number;
  startGirthCm: number;
  startDate: string;
}
