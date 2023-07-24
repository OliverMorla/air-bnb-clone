// Data Response Types
export interface IRecord {
  recordid: string;
  fields: {
    name?: string;
    host_neighbourhood?: string;
    city?: string;
    xl_picture_url?: string;
    medium_url?: string;
    number_of_reviews?: number;
    room_type?: string;
    minimum_nights?: number;
    summary?: string;
    description?: string;
    bedrooms?: number;
    reviews_per_month?: number;
    smart_location?: string;
    host_name?: string;
    host_picture_url?: string;
    host_thumbnail_url?: string;
    price?: number;
    cleaning_fee?: number | 0;
    security_deposit?: number | 0;
    extra_people?: number;
    guests_included?: number;
    amenities?: string;
    property_type?: string;
    features?: string;
    beds?: number;
    bathrooms?: number;
  };
}

export interface LoaderResponse {
  records: IRecord[];
}

// Category Types
export interface Category {
  id: number;
  name: string;
  source: string;
}

// Login & Register Types
export type RegisterInputTypes = {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  date_of_birth: string;
};

export type LoginInputTypes = {
  email: string;
  password: string;
};

// Room Pages Types
export type RoomInputTypes = {
  guest: number | string;
  nights: number | string;
  check_in_date: number | string;
  check_out_date: number | string;
  price: number | string | undefined;
};


// Authenticated User
export interface User { 
    id: number | string;
    displayName: string;
    photos: object[]
  
}
export interface AuthenticatedUser {
  authenticated?: boolean;
  message?: string;
  user?: User;
}

// Authentication Context
export interface AuthContextProps {
  userInfo: AuthenticatedUser | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthenticatedUser | undefined>>;
  login: (inputs: BodyInit) => Promise<any>;
  logout: () => Promise<any>;
  register: (inputs: BodyInit) => Promise<any>;
}