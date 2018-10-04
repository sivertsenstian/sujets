import { store } from "./store";
import agent from "./agent";
import * as actions from "./actions";

const CLIENT_ID =
    "618888275073-4mat6pbe42e0lvk5pt4bpqt17vf308dm.apps.googleusercontent.com",
  CLIENT_SECRET = "KhVVV7SDVel-WSUZoXytEf9Y",
  REDIRECT_URL = [
    "https://www.getpostman.com/oauth2/callback",
    "https://miles-events.azurewebsites.net/swagger/oauth2-redirect.html",
    "https://localhost:5001/swagger/oauth2-redirect.html",
    "https://localhost:3000"
  ];

const scopes = [
  "https://www.googleapis.com/auth/profile",
  "https://www.googleapis.com/auth/email",
  "https://www.googleapis.com/auth/openid"
];
let GoogleAuth = null;

const updateSigninStatus = isSignedIn => {
  if (isSignedIn) {
    const current = GoogleAuth.currentUser.get(),
      user = current.getBasicProfile(),
      token = current.getAuthResponse().id_token;
    //TODO: Combine action and setToken?
    agent.setToken(current.getAuthResponse().id_token);
    store.dispatch({ type: actions.APP_LOAD, user, token, skipTracking: true });
  }
};

const updateSignout = isSignedIn => {
  if (isSignedIn) {
    const current = GoogleAuth.currentUser.get(),
      user = current.getBasicProfile(),
      token = current.getAuthResponse().id_token;
    //TODO: Combine action and setToken?
    agent.setToken(current.getAuthResponse().id_token);
    store.dispatch({ type: actions.APP_LOAD, user, token, skipTracking: true });
  }
};

function initClient() {
  window.gapi.client
    .init({
      clientId: CLIENT_ID,
      scope: "profile",
      discoveryDocs: [
        "https://people.googleapis.com/$discovery/rest?version=v1"
      ]
    })
    .then(function() {
      GoogleAuth = window.gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Listen for sign-out state changes.
      GoogleAuth.currentUser.listen(() => {
        let isSignedIn = GoogleAuth.isSignedIn.get();
        if (!isSignedIn) {
          agent.setToken(null);
          store.dispatch({
            type: actions.SIGN_OUT
          });
        }
      });

      // Handle the initial sign-in state.
      updateSigninStatus(GoogleAuth.isSignedIn.get());
    });
}

window.gapi.load("client:auth2", initClient);

export default () => {
  return GoogleAuth;
};
