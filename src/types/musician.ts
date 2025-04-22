
export interface Musician {
  id: string;
  name: string;
  instrument: string | null;
  location: string | null;
  distance: string | null;
  rating: number;
  reviews: number;
  experience: string | null;
  genres: string[] | null;
  availability: string | null;
  avatar_url: string | null;
  online: boolean;
  user_type: 'musician' | 'band' | null;
}
