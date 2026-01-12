export interface User {
  user_id: string;
  username: string;
  email: string;
  display_name: string | null;
  account_visibility?: number;
  created_at: string;
}

export interface TagResponse {
  id: number;
  name: string;
}

export interface LifeEvent {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  event_type: number;
  visibility: number;
  importance_score: number;
  event_date: string; // YYYY-MM-DD
  created_at: string;
  updated_at: string | null;
  tags?: TagResponse[];
}

export type CreateEventDTO = {
  title: string;
  description?: string;
  event_type?: number;
  visibility?: number;
  importance_score?: number;
  event_date: string;
};
