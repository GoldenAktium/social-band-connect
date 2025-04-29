
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
  status: 'invited' | 'active' | 'declined';
  created_at: string;
}

export interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  created_at: string;
}
