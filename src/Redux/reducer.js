const initialState = {
  user: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
          return { ...state, user: action.payload};
        default:
            return state;
    }
}
