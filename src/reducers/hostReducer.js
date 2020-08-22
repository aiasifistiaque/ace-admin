/** @format */

const HostReducer = (state = 'http://localhost:5000', action) => {
  switch (action.type) {
    case 'CHANGE_HOST':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default HostReducer;
