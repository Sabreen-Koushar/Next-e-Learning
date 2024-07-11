import { decode } from "jwt-js-decode";

const initialState = {
  isAuthenticated: false,
  userProfile: {
    profileImage: null,
  },
};

const token = localStorage.getItem("token");
if (token) {
  initialState.isAuthenticated = true;
  let jwt = decode(token);
  const user = jwt.payload.user;
  if (user) {
    let profileImage = user.profileImage;
    if (profileImage) {
      initialState.userProfile.profileImage = profileImage;
    }
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true
      };
    case "UPDATE_PROFILE_IMAGE":
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          profileImage: action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
