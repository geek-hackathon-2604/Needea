-- プロフィール（auth.usersと連動）
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  avatar_url text,
  github_url text,
  created_at timestamptz default now()
);

-- アイディア
create table public.ideas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  title text not null,
  content text not null,
  chat_history jsonb default '[]',
  tags text[] default '{}',
  status text default 'open' check (status in ('open', 'in_progress', 'resolved')),
  visibility text default 'public' check (visibility in ('public', 'private')),
  created_at timestamptz default now()
);

-- いいね
create table public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  idea_id uuid references public.ideas on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, idea_id)
);

-- コメント
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  idea_id uuid references public.ideas on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

-- プロトタイプ（作ってみた）
create table public.prototypes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  idea_id uuid references public.ideas on delete cascade not null,
  title text not null,
  description text,
  github_url text,
  demo_url text,
  created_at timestamptz default now()
);

-- サインアップ時にprofilesを自動作成
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS有効化
alter table public.profiles enable row level security;
alter table public.ideas enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.prototypes enable row level security;

-- profilesのポリシー
create policy "profiles are viewable by everyone" on public.profiles for select using (true);
create policy "users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ideasのポリシー
create policy "public ideas are viewable by everyone" on public.ideas for select using (visibility = 'public' or auth.uid() = user_id);
create policy "authenticated users can insert ideas" on public.ideas for insert with check (auth.uid() = user_id);
create policy "users can update own ideas" on public.ideas for update using (auth.uid() = user_id);
create policy "users can delete own ideas" on public.ideas for delete using (auth.uid() = user_id);

-- likesのポリシー
create policy "likes are viewable by everyone" on public.likes for select using (true);
create policy "authenticated users can like" on public.likes for insert with check (auth.uid() = user_id);
create policy "users can unlike" on public.likes for delete using (auth.uid() = user_id);

-- commentsのポリシー
create policy "comments are viewable by everyone" on public.comments for select using (true);
create policy "authenticated users can comment" on public.comments for insert with check (auth.uid() = user_id);
create policy "users can delete own comments" on public.comments for delete using (auth.uid() = user_id);

-- prototypesのポリシー
create policy "prototypes are viewable by everyone" on public.prototypes for select using (true);
create policy "authenticated users can post prototypes" on public.prototypes for insert with check (auth.uid() = user_id);
create policy "users can delete own prototypes" on public.prototypes for delete using (auth.uid() = user_id);
