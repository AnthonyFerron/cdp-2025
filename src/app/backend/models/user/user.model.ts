import { IdCountry, IdUser } from "../../types/custom.types";

export type UserDB = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  experience: number;
  levels: number;
  coins: number;
  role: string;
  id_country: number;
  create_at: Date;
};

export type User = {
  id: IdUser;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  experience: number;
  levels: number;
  coins: number;
  role: string;
  idCountry: IdCountry;
  createAt: Date;
};

export type UserCreateDto = {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  emailVerified?: unknown;
  experience?: unknown;
  levels?: unknown;
  coins?: unknown;
  role?: unknown;
  idCountry?: unknown;
};

export type UserUpdateDto = {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  emailVerified?: unknown;
  experience?: unknown;
  levels?: unknown;
  coins?: unknown;
  role?: unknown;
  idCountry?: unknown;
};

export type UserDeleteDto = {
  id?: IdUser;
};

export type UserAddCoinsDto = {
  id?: unknown;
  coins?: unknown;
};

export type UserAddExperienceDto = {
  id?: unknown;
  experience?: unknown;
};

export type UserCalculateLevelDto = {
  id?: unknown;
};
