/** @format */

export const increment = x => {
  return {
    type: 'INCREMENT',
    payload: x
  };
};

export const beforeTestCreation = () => {
  return {
    type: 'BEFORE_TEST_CREATION'
  };
};

export const testCreation = () => {
  return {
    type: 'TEST_CREATION'
  };
};

export const afterTestCreation = () => {
  return {
    type: 'AFTER_TEST_CREATION'
  };
};
