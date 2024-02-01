export enum USER_ROLE {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export const USER_SCOPE = {
  [USER_ROLE.EMPLOYEE]: ['book:read', 'book:add', 'book:update', 'book:delete'],
  [USER_ROLE.ADMIN]: ['book:read', 'book:add', 'book:update', 'book:delete'],
};
