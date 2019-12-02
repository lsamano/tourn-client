import { push } from 'connected-react-router'

// Deployed backend URI
const backendUri = "https://tourn-backend.herokuapp.com/api/v1"

// const backendUri = "http://localhost:3000/api/v1"

const addErrorMessage = message => ({
  type: "ADD_ERROR_MESSAGE",
  payload: message
})

/// User Actions (Login and Sign Up)
const loginUser = userLogin => {
  return {
    type: "LOGIN_USER",
    payload: userLogin
  }
}

export const loginFetch = (userObj) => {
  return (dispatch) => {
    return fetch(`${backendUri}/login`, {
    method: "POST",
    body: JSON.stringify({user: userObj}),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
        dispatch(addErrorMessage(data.message))
      } else {
        localStorage.setItem("token", data.jwt)
        dispatch(loginUser(data.user))
      }
    })
  }
}

export const signupFetch = userInfo => {
  return (dispatch) => {
    return fetch(`${backendUri}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        dispatch(loginUser(data.user))
      });
  }
}

export const getProfileFetch = () => {
  return (dispatch) => {
    let token = localStorage.token;
    if (token) {
      return fetch(`${backendUri}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            localStorage.removeItem("token")
            dispatch(push('/login'))
          } else {
            dispatch(loginUser(data.user))
          }
        });
    }
  }
}

export const signOutUser = () => {
  return dispatch => {
    dispatch(logOutUser())
  }
}

const logOutUser = () => {
  return {
    type: "LOGOUT_USER"
  }
}

// User Show
export const getUserFetch = (id) => {
  return (dispatch) => {
    return fetch(`${backendUri}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(loadUserShown(data))
    })
  }
}

const loadUserShown = (userShown) => {
  return {
    type: "LOAD_USER_SHOWN",
    payload: userShown
  }
}

export const userPatchFetch = (user) => {
  return (dispatch) => {
    return fetch(`${backendUri}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({user: user})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loginUser(data))
      dispatch(loadUserShown(data))
    })
  }
}

// Tournament Actions
const loadTournaments = (tournaments) => ({
  type: "LOAD_TOURNAMENTS", payload: tournaments
})

export const tournamentPostFetch = (tournament) => {
  return (dispatch) => {
    return fetch(`${backendUri}/tournaments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({tournament: tournament})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadTournShown(data.tournament))
      dispatch(loginUser(data.user))
      dispatch(push(`/tournaments/${data.tournament.id}`))
    })
  }
}

export const getTournaments = () => {
  return (dispatch) => {
    return fetch(`${backendUri}/tournaments`)
    .then(res => res.json())
    .then(data => {
      dispatch(loadTournaments(data.tournaments))
      dispatch(addFilteredTournaments(data.tournaments))
    })
    .catch(console.error)
  }
}

export const tournamentDeleteFetch = id => {
  return dispatch => {
    return fetch(`${backendUri}/tournaments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadTournaments(data.tournaments))
      dispatch(addFilteredTournaments(data.tournaments))
      dispatch(loginUser(data.user))
      dispatch(push("/tournaments"))
    })
  }
}

const addFilteredTournaments = tournaments => ({
  type: 'ADD_FILTERED_TOURNAMENTS',
  payload: tournaments
})

export const updateSearch = (searchTerm, tournaments) => {
  return dispatch => {
    dispatch(affectStore(searchTerm))
    const filteredTournaments = tournaments.filter(tourn => tourn.title.toLowerCase().includes(searchTerm.toLowerCase()))
    dispatch(addFilteredTournaments(filteredTournaments))
  }
}

const affectStore = searchTerm => ({
  type: 'AFFECT_STORE',
  payload: searchTerm
})

export const getTournFetch = (id) => {
  return (dispatch) => {
    return fetch(`${backendUri}/tournaments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(loadTournShown(data))
    })
  }
}

const loadTournShown = tourn => ({
  type: "LOAD_TOURN_SHOWN",
  payload: tourn
})

// Team
export const getTeamFetch = (id) => {
  return (dispatch) => {
    return fetch(`${backendUri}/teams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        dispatch(loadTeamShown(data))
    })
  }
}

export const tournamentPatchFetch = (tournament) => {
  return (dispatch) => {
    return fetch(`${backendUri}/tournaments/${tournament.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({tournament: tournament})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(reloadTournament(data.tournament))
      dispatch(loginUser(data.user))
    })
  }
}

const reloadTournament = tournament => ({
  type: "RELOAD_TOURNAMENT",
  payload: tournament
})

// Team Actions
const loadTeamShown = (team) => {
  return {
    type: "LOAD_TEAM_SHOWN",
    payload: team
  }
}

export const teamPostFetch = (team) => {
  return (dispatch) => {
    return fetch(`${backendUri}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({team: team})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadTeamShown(data.team))
      dispatch(loginUser(data.user))
      dispatch(push(`/teams/${data.team.id}`))
    })
  }
}

export const teamPatchFetch = (team) => {
  return (dispatch) => {
    return fetch(`${backendUri}/teams/${team.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({team: team})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadTeamShown(data.team))
      dispatch(loginUser(data.user))
    })
  }
}

// Entry and Membership
export const entryPostFetch = entry => {
  return dispatch => {
    return fetch(`${backendUri}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({entry: entry})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(reloadTournament(data.tournament))
      dispatch(loginUser(data.user))
    })
  }
}

export const membershipPostFetch = membership => {
  return dispatch => {
    return fetch(`${backendUri}/memberships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({membership: membership})
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadTeamShown(data.team))
      dispatch(loginUser(data.user))
    })
  }
}

// Uses team_id to find membership to delete
export const membershipDeleteFetch = team_id => {
  return dispatch => {
    return fetch(`${backendUri}/memberships/${team_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadTeamShown(data.team))
      dispatch(loginUser(data.user))
    })
  }
}

export const makeBracket = tournament => {
  return dispatch => {
    return fetch(`${backendUri}/brackets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        tournament: tournament,
        teams: tournament.teams
      })
    })
    .then(res => res.json())
    .then(data => {
      dispatch(reloadTournament(data))
      dispatch(push(`/tournaments/${tournament.id}/bracket`))
    })
  }
}

export const sendJoinRequestFetch = team_id => dispatch => {
  return fetch(`${backendUri}/join_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({ join_request: { team_id } })
  })
  .then(res => res.json())
  .then(data => {
    dispatch(loadTeamShown(data.team))
    dispatch(loginUser(data.user))
  })
}
