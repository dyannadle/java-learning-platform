-- Create the User Progress table
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  module_id integer not null,
  score integer default 0,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Prevent duplicate entries
  unique(user_id, module_id)
);

-- Turn on Row Level Security
alter table public.user_progress enable row level security;

-- Allow users to view their own progress
create policy "Users can view their own progress" 
on public.user_progress for select 
using (auth.uid() = user_id);

-- Allow users to insert their own progress
create policy "Users can insert their own progress" 
on public.user_progress for insert 
with check (auth.uid() = user_id);

-- Allow users to delete their own progress (for reset)
create policy "Users can delete their own progress" 
on public.user_progress for delete 
using (auth.uid() = user_id);
