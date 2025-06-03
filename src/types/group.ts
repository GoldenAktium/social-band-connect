
export interface Group {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  status: string; // Changed from union type to string to match database
  created_at: string;
  profiles?: {
    id: string;
    name: string | null;
    avatar_url: string | null;
    instrument: string | null;
  } | null;
}

export interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  created_at: string;
}
