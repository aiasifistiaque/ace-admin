/** @format */

export const getTestStatus = code => {
  let status;
  switch (code) {
    case 0:
      status = 'pending';
      break;
    case 1:
      status = 'approved';
      break;
    case 2:
      status = 'disapproved';
      break;
    case 3:
      status = 'deleted';
      break;
    default:
      status = 'pending';
  }
  return status;
};
