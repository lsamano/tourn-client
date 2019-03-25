import { push } from 'connected-react-router'

// User Actions (Login and Sign Up)
const doTheLoginThing = userLogin => {
  return {
    type: "LOGIN_USER",
    payload: userLogin
  }
}

export const loginFetch = (userObj) => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    body: JSON.stringify({user: userObj}),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("Hey, the fetch worked?", data)
      localStorage.setItem("token", data.jwt)
      dispatch(doTheLoginThing(data.user))
    })
  }
}

export const signupFetch = userInfo => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("The signup fetch worked?", data)
        localStorage.setItem("token", data.jwt);
        dispatch(doTheLoginThing(data.user))
      });
  }
}

export const getProfileFetch = () => {
  return (dispatch) => {
    let token = localStorage.token;
    if (token) {
      return fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log("fetched the profile", data)
          dispatch(doTheLoginThing(data.user))
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
    console.log("THIS IS THE ID:", id);
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        console.log("fetched the user shown", data)
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
    return fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
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
      console.log("User Updated:", data)
      dispatch(doTheLoginThing(data))
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
    return fetch("http://localhost:3000/api/v1/tournaments", {
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
      console.log("New Tourn Added:", data)
      dispatch(doTheLoginThing(data.user))
    })
  }
}

export const getTournaments = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/tournaments")
    .then(res => res.json())
    .then(data => {
      console.log("fetched the tournaments", data)
      dispatch(loadTournaments(data.tournaments))
    })
    .catch(console.error)
  }
}

export const getTeamFetch = (id) => {
  return (dispatch) => {
    console.log("THIS IS THE ID:", id);
    return fetch(`http://localhost:3000/api/v1/teams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        console.log("fetched the team shown", data)
        dispatch(loadTeamShown(data))
    })
  }
}

export const tournamentPatchFetch = (tournament) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/tournaments/${tournament.id}`, {
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
      console.log("Tournament Updated:", data)
      dispatch(reloadTournament(data.tournament))
      dispatch(doTheLoginThing(data.user))
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
    return fetch("http://localhost:3000/api/v1/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({team: team})
    })
    .then(res => res.json())
    .then(data => console.log("New Team Added:", data))
  }
}

export const teamPatchFetch = (team) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/teams/${team.id}`, {
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
      console.log("Team Updated:", data)
      dispatch(loadTeamShown(data.team))
      dispatch(doTheLoginThing(data.user))
    })
  }
}

// Entry and Membership
export const entryPostFetch = entry => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/entries", {
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
      console.log("Tourn Joined:", data)
      dispatch(reloadTournament(data.tournament))
      dispatch(doTheLoginThing(data.user))
    })
  }
}

export const membershipPostFetch = membership => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/memberships", {
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
      console.log("Team Joined:", data)
      dispatch(loadTeamShown(data.team))
      dispatch(doTheLoginThing(data.user))
    })
  }
}

export const makeBracket = tournament => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/brackets", {
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
      console.log("Bracket Created:", data)
      dispatch(push(`/tournaments/${tournament.id}/bracket`))
      // dispatch(loadTeamShown(data.team))
      // dispatch(doTheLoginThing(data.user))
    })
  }
}
