\c meditation_timer meditation_timer 
create table public.meditations (
        id uuid not null constraint id primary key,
        device_uuid uuid not null,
        started timestamp not null,
        duration_in_minutes integer
    );