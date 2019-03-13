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
