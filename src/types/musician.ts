
export interface Musician {
  id: string;
  name: string | null;
  instrument: string | null;
  location: string | null;
  distance: string | null;
  rating: number | null;
  reviews: number | null;
  experience: string | null;
  genres: string[] | null;
  availability: string | null;
  avatar_url: string | null;
  online: boolean | null;
  user_type: 'musician' | 'band' | null;
}
