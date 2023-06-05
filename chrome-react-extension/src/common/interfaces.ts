export interface IUser {
  id: string;
  email: string;
  location?: string;
  picture?: string;
  name?: string;
  job?: string;
  gender?: boolean;
  interests?: string;
}

export interface IVideo {
  id: string;
  title: string;
  description: string;
  kind: string;
  categoryId: number;
  thumbnail: string;
}

export interface IChannel {
  id: string;
  title: string;
  description: string;
  categories: string;
  thumbnail: string;
}

export interface IGroup {
  id: string;
  mainLocations: string[];
  mainCategories: string[];
  mainJob: string;
}
