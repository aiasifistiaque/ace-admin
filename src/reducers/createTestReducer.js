/** @format */

const initialState = false;

const createTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_CREATION':
      state = true;
      return state;
    case 'AFTER_TEST_CREATION':
      state = false;
      return state;
    case 'BEFORE_TEST_CREATION':
      state = false;
      return state;
    default:
      return state;
  }
};

export default createTestReducer;
