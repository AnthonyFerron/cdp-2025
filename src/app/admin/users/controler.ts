import { User } from "./type";
import getUsersRequest from "@/app/requests/admin/user/getUsers";
import getUserRequest from "@/app/requests/admin/user/getUser";
import createUserRequest from "@/app/requests/admin/user/createUser";
import updateUserRequest from "@/app/requests/admin/user/updateUser";
import deleteUserRequest from "@/app/requests/admin/user/deleteUser";

export async function getUsers(): Promise<User[]> {
  const data = await getUsersRequest();
  return data || [];
}

export async function getUser(id: string): Promise<User | null> {
  return await getUserRequest(id);
}

export async function createUser(user: User): Promise<User | null> {
  const res = await createUserRequest({
    id: user.id,
    name: user.name || "",
    email: user.email,
    emailVerified: user.emailVerified,
    experience: user.experience,
    levels: user.levels,
    coins: user.coins,
    role: user.role,
    idCountry: user.idCountry,
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}

export async function updateUser(id: string, user: User): Promise<User | null> {
  const res = await updateUserRequest({
    id: id,
    name: user.name || "",
    email: user.email,
    emailVerified: user.emailVerified,
    experience: user.experience,
    levels: user.levels,
    coins: user.coins,
    role: user.role,
    idCountry: user.idCountry,
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}

export async function deleteUser(id: string): Promise<void> {
  await deleteUserRequest({ id });
}
