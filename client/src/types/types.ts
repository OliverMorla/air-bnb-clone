// Data Response Types
export interface IRecord {
  recordid: string;
  fields: {
    name?: string;
    neighbourhood?: string;
    neighbourhood_cleansed?: string;
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

// Loader Responses Interfaces
export interface LoaderResponse {
  records: IRecord[];
}

export interface profileLoaderResponse {
  user: User;
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

// Room Input Types
export type RoomInputTypes = {
  guest: number | string;
  nights: number | string;
  check_in_date: number | string;
  check_out_date: number | string;
  price: number | string | undefined;
  user_id?: number | string | 1;
  name: string | undefined;
};

// Authenticated User Interface
export interface User {
  id: number | string;
  displayName?: string;
  username?: string;
  email: string;
  date_of_birth: string;
  password: string;
}

export interface AuthenticatedUser {
  authenticated: boolean;
  message: string;
  user?: User;
}

// Authentication Context Interface
export interface AuthContextProps {
  userInfo: AuthenticatedUser | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthenticatedUser | undefined>>;
  login: (inputs: BodyInit) => Promise<any>;
  register: (inputs: BodyInit) => Promise<any>;
  logout: () => Promise<any>;
  getUser: () => Promise<any>;
  getOrders: (inputs: BodyInit) => Promise<any>;
}

// Order Interface for Orders Endpoint
export interface Order {
    order_id: number | undefined;
    room_name: string | undefined;
    check_in_date: string | undefined;
    check_out_date: string | undefined;
    number_of_guest: number | undefined;
    number_of_nights: number | undefined;
    total_price: number | undefined
}

export interface ProfileTypes extends User {}
