export const doTheLoginThing = userLogin => {
  return {
    type: "LOGIN_USER",
    payload: userLogin
  }
}

export const doTheSignupThing = userInfo => {
  return {
    type: "SIGNUP_USER",
    payload: userInfo
  }
}

const loadTournaments = (tournaments) => ({
  type: "LOAD_TOURNAMENTS", payload: tournaments
})

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
    return fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("fetched the profile", data)
        dispatch(doTheLoginThing(data.user))
      });
  }
}

export const tournamentPostFetch = (tournament) => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/tournaments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({tournament: tournament})
    })
    .then(res => res.json())
    .then(data => console.log("the stuff", data))
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
