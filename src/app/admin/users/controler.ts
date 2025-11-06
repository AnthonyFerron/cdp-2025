import { User } from "./type";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("/backend/api/user");
  const data = await res.json();
  return data.users as User[];
}

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`/backend/api/user/${id}`);
  const data = await res.json();
  return data as User;
}

export async function createUser(user: User): Promise<User> {
  const res = await fetch("/backend/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  const data = await res.json();
  return data as User;
}

export async function updateUser(id: string, user: User): Promise<User> {
  const res = await fetch(`/backend/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  const data = await res.json();
  return data as User;
}

export async function deleteUser(id: string): Promise<void> {
  await fetch(`/backend/api/user/${id}`, {
    method: "DELETE",
  });
}
