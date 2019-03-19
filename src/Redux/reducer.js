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
        case 'LOGOUT_USER':
          return { ...state, user: { teams: []}};

      // User Show
        case 'LOAD_USER_SHOWN':
          return { ...state, userShown: action.payload};

      // Tournaments
        case "LOAD_TOURNAMENTS":
          return { ...state, tournaments: action.payload};
        case 'RELOAD_TOURNAMENT':
          const updatedTournaments = state.tournaments.map(tourn => {
            if (tourn.id === action.payload.id) {
              return action.payload
            } else {
              return tourn
            }
          })
          return { ...state, tournaments: updatedTournaments}

      // Teams
        case 'LOAD_TEAM_SHOWN':
          return { ...state, teamShown: action.payload};

        default:
            return state;
    }
}
