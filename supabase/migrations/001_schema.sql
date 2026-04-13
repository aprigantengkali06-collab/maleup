create extension if not exists pgcrypto;

create type phase_type as enum ('foundation', 'fat_loss', 'conditioning', 'strength', 'maintenance');
create type meal_type as enum ('breakfast', 'lunch', 'dinner', 'snack');
create type workout_type as enum ('rest', 'walk', 'strength_upper', 'strength_lower', 'full_body', 'hiit', 'tabata', 'mobility');
create type day_of_week_type as enum ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  height_cm numeric(5,2) not null,
  starting_weight_kg numeric(5,2) not null,
  current_weight_kg numeric(5,2) not null,
  target_weight_kg numeric(5,2) not null,
  starting_waist_cm numeric(5,2) not null,
  age integer not null,
  starting_penis_length text not null,
  starting_penis_girth text not null,
  current_phase integer not null check (current_phase between 1 and 5),
  current_week integer not null check (current_week between 1 and 24),
  program_start_date date not null,
  tdee integer not null,
  bmi numeric(5,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists phases (
  id bigint generated always as identity primary key,
  phase_number integer not null unique check (phase_number between 1 and 5),
  name text not null,
  phase_type phase_type not null,
  week_start integer not null,
  week_end integer not null,
  daily_calories_min integer not null,
  daily_calories_max integer not null,
  protein_target_g integer not null,
  carb_target_g integer not null,
  fat_target_g integer not null,
  description text not null,
  exercise_description text not null,
  kegel_description text not null
);

create table if not exists foods (
  id bigint generated always as identity primary key,
  name text not null,
  name_en text not null,
  calories_per_100g numeric(7,2) not null,
  protein_per_100g numeric(7,2) not null,
  fat_per_100g numeric(7,2) not null,
  carb_per_100g numeric(7,2) not null,
  fiber_per_100g numeric(7,2) not null default 0,
  serving_size_g numeric(7,2) not null,
  serving_description text not null,
  category text not null check (category in ('protein_hewani','protein_nabati','karbohidrat','sayuran','bumbu','dairy','lainnya'))
);

create table if not exists daily_meal_plans (
  id bigint generated always as identity primary key,
  phase_number integer not null references phases(phase_number) on delete cascade,
  week_number integer not null check (week_number between 1 and 24),
  day_of_week day_of_week_type not null,
  unique (phase_number, week_number, day_of_week)
);

create table if not exists meals (
  id bigint generated always as identity primary key,
  daily_meal_plan_id bigint not null references daily_meal_plans(id) on delete cascade,
  meal_type meal_type not null,
  time_scheduled time not null,
  name text not null,
  recipe_instructions text not null,
  cooking_time_minutes integer not null,
  total_calories integer not null,
  total_protein_g numeric(7,2) not null,
  total_fat_g numeric(7,2) not null,
  total_carb_g numeric(7,2) not null
);

create table if not exists meal_ingredients (
  id bigint generated always as identity primary key,
  meal_id bigint not null references meals(id) on delete cascade,
  food_id bigint not null references foods(id) on delete restrict,
  quantity_g numeric(7,2) not null,
  quantity_description text not null,
  calories_portion numeric(7,2) not null,
  protein_portion numeric(7,2) not null,
  fat_portion numeric(7,2) not null,
  carb_portion numeric(7,2) not null
);

create table if not exists workout_plans (
  id bigint generated always as identity primary key,
  phase_number integer not null references phases(phase_number) on delete cascade,
  day_of_week day_of_week_type not null,
  workout_type workout_type not null,
  duration_minutes integer not null,
  description text not null,
  warmup_description text not null,
  cooldown_description text not null
);

create table if not exists exercises (
  id bigint generated always as identity primary key,
  workout_plan_id bigint not null references workout_plans(id) on delete cascade,
  name text not null,
  sets integer not null,
  reps text not null,
  work_seconds integer,
  rest_seconds integer,
  order_index integer not null,
  muscle_group text not null,
  instructions text not null,
  tips text not null
);

create table if not exists kegel_plans (
  id bigint generated always as identity primary key,
  phase_number integer not null unique references phases(phase_number) on delete cascade,
  sets integer not null,
  reps integer not null,
  hold_seconds integer not null,
  relax_seconds integer not null,
  times_per_day integer not null,
  include_reverse_kegel boolean not null default false,
  description text not null
);

create table if not exists weight_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  weight_kg numeric(5,2) not null,
  waist_cm numeric(5,2),
  logged_at timestamptz not null default now()
);

create table if not exists measurement_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  penis_length text not null,
  penis_girth text not null,
  erection_hardness_score integer not null check (erection_hardness_score between 1 and 4),
  notes text,
  logged_at timestamptz not null default now()
);

create table if not exists meal_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  meal_id bigint references meals(id) on delete set null,
  date date not null,
  meal_type meal_type not null,
  calories_consumed integer not null,
  protein_consumed_g numeric(7,2) not null,
  completed boolean not null default false,
  logged_at timestamptz not null default now()
);

create table if not exists workout_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  workout_plan_id bigint references workout_plans(id) on delete set null,
  date date not null,
  workout_type workout_type not null,
  completed boolean not null default false,
  duration_actual_minutes integer not null default 0,
  intensity_rating integer check (intensity_rating between 1 and 5),
  notes text,
  logged_at timestamptz not null default now()
);

create table if not exists kegel_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  date date not null,
  session text not null check (session in ('morning', 'night')),
  sets_completed integer not null,
  reps_completed integer not null,
  completed boolean not null default false,
  logged_at timestamptz not null default now()
);

create table if not exists achievements (
  id bigint generated always as identity primary key,
  name text not null unique,
  description text not null,
  icon text not null,
  condition_type text not null,
  condition_value numeric(10,2) not null,
  category text not null
);

create table if not exists user_achievements (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  achievement_id bigint not null references achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique(user_id, achievement_id)
);

create table if not exists push_subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  subscription_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_current_phase on profiles(current_phase);
create index if not exists idx_profiles_current_week on profiles(current_week);
create index if not exists idx_daily_meal_plans_phase_week_day on daily_meal_plans(phase_number, week_number, day_of_week);
create index if not exists idx_meals_daily_meal_plan_id on meals(daily_meal_plan_id);
create index if not exists idx_meal_ingredients_meal_id on meal_ingredients(meal_id);
create index if not exists idx_workout_plans_phase_day on workout_plans(phase_number, day_of_week);
create index if not exists idx_exercises_workout_plan_id on exercises(workout_plan_id);
create index if not exists idx_kegel_plans_phase_number on kegel_plans(phase_number);
create index if not exists idx_weight_logs_user_id on weight_logs(user_id);
create index if not exists idx_weight_logs_logged_at on weight_logs(logged_at);
create index if not exists idx_measurement_logs_user_id on measurement_logs(user_id);
create index if not exists idx_measurement_logs_logged_at on measurement_logs(logged_at);
create index if not exists idx_meal_logs_user_id on meal_logs(user_id);
create index if not exists idx_meal_logs_date on meal_logs(date);
create index if not exists idx_workout_logs_user_id on workout_logs(user_id);
create index if not exists idx_workout_logs_date on workout_logs(date);
create index if not exists idx_kegel_logs_user_id on kegel_logs(user_id);
create index if not exists idx_kegel_logs_date on kegel_logs(date);
create index if not exists idx_user_achievements_user_id on user_achievements(user_id);
create index if not exists idx_push_subscriptions_user_id on push_subscriptions(user_id);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on profiles
for each row
execute function set_updated_at();

create or replace function sync_profile_weight_from_log()
returns trigger
language plpgsql
as $$
declare
  height_value numeric;
begin
  select height_cm into height_value from profiles where id = new.user_id;
  update profiles
  set
    current_weight_kg = new.weight_kg,
    bmi = case when height_value is null or height_value = 0 then bmi else round((new.weight_kg / power(height_value / 100.0, 2))::numeric, 2) end,
    updated_at = now()
  where id = new.user_id;
  return new;
end;
$$;

create trigger weight_logs_sync_profile
after insert on weight_logs
for each row
execute function sync_profile_weight_from_log();

alter table profiles enable row level security;
alter table phases enable row level security;
alter table foods enable row level security;
alter table daily_meal_plans enable row level security;
alter table meals enable row level security;
alter table meal_ingredients enable row level security;
alter table workout_plans enable row level security;
alter table exercises enable row level security;
alter table kegel_plans enable row level security;
alter table weight_logs enable row level security;
alter table measurement_logs enable row level security;
alter table meal_logs enable row level security;
alter table workout_logs enable row level security;
alter table kegel_logs enable row level security;
alter table achievements enable row level security;
alter table user_achievements enable row level security;
alter table push_subscriptions enable row level security;

create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_delete_own" on profiles for delete using (auth.uid() = id);

create policy "phases_read_authenticated" on phases for select using (auth.role() = 'authenticated');
create policy "foods_read_authenticated" on foods for select using (auth.role() = 'authenticated');
create policy "daily_meal_plans_read_authenticated" on daily_meal_plans for select using (auth.role() = 'authenticated');
create policy "meals_read_authenticated" on meals for select using (auth.role() = 'authenticated');
create policy "meal_ingredients_read_authenticated" on meal_ingredients for select using (auth.role() = 'authenticated');
create policy "workout_plans_read_authenticated" on workout_plans for select using (auth.role() = 'authenticated');
create policy "exercises_read_authenticated" on exercises for select using (auth.role() = 'authenticated');
create policy "kegel_plans_read_authenticated" on kegel_plans for select using (auth.role() = 'authenticated');
create policy "achievements_read_authenticated" on achievements for select using (auth.role() = 'authenticated');

create policy "weight_logs_select_own" on weight_logs for select using (auth.uid() = user_id);
create policy "weight_logs_insert_own" on weight_logs for insert with check (auth.uid() = user_id);
create policy "weight_logs_update_own" on weight_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "weight_logs_delete_own" on weight_logs for delete using (auth.uid() = user_id);

create policy "measurement_logs_select_own" on measurement_logs for select using (auth.uid() = user_id);
create policy "measurement_logs_insert_own" on measurement_logs for insert with check (auth.uid() = user_id);
create policy "measurement_logs_update_own" on measurement_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "measurement_logs_delete_own" on measurement_logs for delete using (auth.uid() = user_id);

create policy "meal_logs_select_own" on meal_logs for select using (auth.uid() = user_id);
create policy "meal_logs_insert_own" on meal_logs for insert with check (auth.uid() = user_id);
create policy "meal_logs_update_own" on meal_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "meal_logs_delete_own" on meal_logs for delete using (auth.uid() = user_id);

create policy "workout_logs_select_own" on workout_logs for select using (auth.uid() = user_id);
create policy "workout_logs_insert_own" on workout_logs for insert with check (auth.uid() = user_id);
create policy "workout_logs_update_own" on workout_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "workout_logs_delete_own" on workout_logs for delete using (auth.uid() = user_id);

create policy "kegel_logs_select_own" on kegel_logs for select using (auth.uid() = user_id);
create policy "kegel_logs_insert_own" on kegel_logs for insert with check (auth.uid() = user_id);
create policy "kegel_logs_update_own" on kegel_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "kegel_logs_delete_own" on kegel_logs for delete using (auth.uid() = user_id);

create policy "user_achievements_select_own" on user_achievements for select using (auth.uid() = user_id);
create policy "user_achievements_insert_own" on user_achievements for insert with check (auth.uid() = user_id);
create policy "user_achievements_delete_own" on user_achievements for delete using (auth.uid() = user_id);

create policy "push_subscriptions_select_own" on push_subscriptions for select using (auth.uid() = user_id);
create policy "push_subscriptions_insert_own" on push_subscriptions for insert with check (auth.uid() = user_id);
create policy "push_subscriptions_update_own" on push_subscriptions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "push_subscriptions_delete_own" on push_subscriptions for delete using (auth.uid() = user_id);
