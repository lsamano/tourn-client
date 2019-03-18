const initialState = {
  user: {
    teams: []
  },
  tournaments: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

      // Auth and Sign Up
        case 'LOGIN_USER':
          return { ...state, user: action.payload};
        case 'SIGNUP_USER':
          return { ...state, user: action.payload};
        case 'LOGOUT_USER':
          return { ...state, user: { teams: []}};

      // User Show
        case 'LOAD_USER_SHOWN':
          return { ...state, userShown: action.payload};
          
      // Tournaments
        case "LOAD_TOURNAMENTS":
          return { ...state, tournaments: action.payload};
        default:
            return state;
    }
}
