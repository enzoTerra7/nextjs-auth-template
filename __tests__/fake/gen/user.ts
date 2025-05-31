import { User } from "@/db/table/user";
import { faker } from "@faker-js/faker";

function createUser(
  role: "admin" | "user" | undefined = "admin",
  data?: Partial<Omit<User, "role">>
): User {
  const user: User = {
    createdAt: faker.date.recent({
      days: 7,
    }),
    email: faker.internet.email(),
    emailVerifiedAt: faker.date.recent({
      days: 6,
    }),
    id: faker.number.int(),
    name: faker.person.fullName(),
    password: faker.internet.password({
      length: 10,
    }),
    role,

    ...data,
  };

  return user;
}

export const fakeUser = {
  createUser,
};
