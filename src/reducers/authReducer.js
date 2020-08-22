const initialState = {token: '', user: '', loggedIn: false};

const practiceScoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loggedIn = true;
      return state;
    case 'LOG_OUT':
      state.token = '';
      state.user = '';
      state.loggedIn = false;
      return state;
    default:
      return state;
  }
};

export default practiceScoreReducer;
