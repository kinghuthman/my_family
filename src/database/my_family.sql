-- users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Automatically generates a UUID
    user_id VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    connected_user_id UUID NOT NULL REFERENCES users(id),
    relation_type VARCHAR(50) NOT NULL, -- e.g., "nuclear", "extended", "friend"
    connection_type VARCHAR(50) NOT NULL, -- e.g., "husband", "coworker", "neighbor"
    permissions JSONB DEFAULT '{}', -- Store custom visibility rules (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--dashboards
CREATE TABLE dashboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL, -- e.g., "King Family Dashboard"
    owner_ids UUID[] NOT NULL, -- Array of user IDs (owners)
    member_ids UUID[] NOT NULL, -- Array of user IDs (members)
    visibility_hierarchy JSONB DEFAULT '["nuclear", "extended", "close friends", "friends", "public"]', 
    auto_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--planer table
CREATE TABLE planner_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dashboard_id UUID NOT NULL REFERENCES dashboards(id),
    user_id UUID NOT NULL REFERENCES users(id),
    parent_item_id UUID REFERENCES planner_items(id), -- For subtasks
    type VARCHAR(50) NOT NULL, -- "event", "appointment", "task"
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP, 
    reminder TIMESTAMP, 
    checklist JSONB DEFAULT '[]', -- Array of items with status: todo, in-progress, complete
    permissions JSONB DEFAULT '{}', -- Global and item-specific overrides
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- posts
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dashboard_id UUID NOT NULL REFERENCES dashboards(id),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- "text", "image", "video"
    content TEXT, -- Text content for "text" posts
    media JSONB, -- JSON array for "image" or "video" URLs
    permissions JSONB DEFAULT '{}', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES comments(id), -- For nested replies
    post_id UUID NOT NULL REFERENCES posts(id),
    planner_item_id UUID REFERENCES planner_items(id), -- Optional (if commenting on a task/event)
    user_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL, -- Max 3000 characters
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visibility Logic json (permissions column)
{
  "visibility": "nuclear", 
  "exceptions": ["user1_id", "user2_id"], 
  "allowed_users": ["user3_id", "user4_id"]
}

-- checklist json example
[
  {"item": "Send invites", "status": "complete"},
  {"item": "Prepare presentation", "status": "in-progress"},
  {"item": "Confirm venue", "status": "todo"}
]
