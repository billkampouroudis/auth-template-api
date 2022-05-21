import { prepareResponse } from '../utils/response';

export const authSerializer = (user) => {
  const fieldsToHide = ['password', 'salt'];
  return prepareResponse(fieldsToHide, user);
};
