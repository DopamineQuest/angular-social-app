export interface User {
  _id: string,
  username: string;
  friends: User[];
}
