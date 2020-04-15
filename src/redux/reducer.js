const initialState = {
  user: {
    // teams: []
  },
  tournaments: [],
  teams: [],
  filteredTournaments: [],
  searchTerm: "",
  teamShown: {},
  tournShown: {},
  userShown: {},
  errorMessage: ""
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ERROR_MESSAGE':
          return { ...state, errorMessage: action.payload };
      // Auth and Sign Up
        case 'LOGIN_USER':
          return { ...state, user: action.payload, errorMessage: "" };
        case 'LOGOUT_USER':
          return { ...state, user: {} };

      // User Show
        case 'LOAD_USER_SHOWN':
          return { ...state, userShown: action.payload };

      // Tournaments
        case "LOAD_TOURNAMENTS":
          return { ...state, tournaments: action.payload };
        case 'RELOAD_TOURNAMENT':
          const updatedTournaments = state.tournaments.map(tourn => {
            if (tourn.id === action.payload.id) {
              return action.payload
            } else {
              return tourn
            }
          })
          return { ...state, tournaments: updatedTournaments, tournShown: action.payload }
        case 'LOAD_TOURN_SHOWN':
          return { ...state, tournShown: action.payload }
        case 'ADD_FILTERED_TOURNAMENTS':
          return { ...state, filteredTournaments: action.payload }
        case 'AFFECT_STORE':
          return { ...state, searchTerm: action.payload }

      // Teams
        case 'LOAD_TEAM_SHOWN':
          return { ...state, teamShown: action.payload };
        case 'LOAD_TEAMS':
          return { ...state, teams: action.payload }

        default:
            return state;
    }
}
