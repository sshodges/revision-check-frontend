import {
  LOAD_USER,
  SET_LOADING_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  LOGOUT,
  CLEAR_DOCUMENT,
} from './types';
import axios from 'axios';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

const Pool = new CognitoUserPool(poolData);

export const getUser = () => async (dispatch) => {
  await new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();
    if (user) {
      user
        .getSession(async (err, session) => {
          if (err) {
            reject(err);
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });

            axios.defaults.headers.common['auth-token'] =
              session.idToken.jwtToken;

            const res = await axios.get(
              process.env.REACT_APP_BASE_API_URL + 'auth'
            );

            if (res) {
              attributes.accountId = res.data.account._id;
            }

            if (attributes) {
              dispatch({
                type: LOAD_USER,
                payload: attributes,
              });
            }

            resolve(session);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    } else {
      reject();
    }

    return;
  });
};

export const updateUser = (payload) => async (dispatch) => {
  setLoading();
  const { firstName, lastName, phone, companyName } = payload;
  return new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession(async (err, session) => {
        if (err) {
          reject(err);
        }

        var attributeList = [];
        attributeList.push(
          new CognitoUserAttribute({
            Name: 'name',
            Value: firstName,
          })
        );
        attributeList.push(
          new CognitoUserAttribute({
            Name: 'given_name',
            Value: lastName,
          })
        );
        attributeList.push(
          new CognitoUserAttribute({
            Name: 'custom:phone',
            Value: phone,
          })
        );
        attributeList.push(
          new CognitoUserAttribute({
            Name: 'custom:company',
            Value: companyName,
          })
        );

        user.updateAttributes(attributeList, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    }
  });
};

export const loginUser = (email, password) => async (dispatch) => {
  await new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
        resolve(data);
      },

      onFailure: (err) => {
        dispatch({
          type: LOGIN_FAIL,
        });
        reject(err);
      },

      newPasswordRequired: (data) => {
        console.log('newPasswordRequired:', data);
        resolve(data);
      },
    });
  });
};

export const registerUser = (payload) => async (dispatch) => {
  try {
    const { firstName, lastName, email, password, companyName } = payload;
    var attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'name',
        Value: firstName,
      })
    );
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: lastName,
      })
    );
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'custom:company',
        Value: companyName,
      })
    );
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    return new Promise((resolve, reject) =>
      Pool.signUp(email, password, attributeList, null, async (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        if (result) {
          await axios.post(process.env.REACT_APP_BASE_API_URL + 'users', {
            email,
            companyName,
          });
          resolve(result.user);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export const verifyUser = (payload) => async (dispatch) => {
  const { email, verificationCode } = payload;
  const user = new CognitoUser({ Username: email, Pool });

  return new Promise((resolve, reject) =>
    user.confirmRegistration(verificationCode, true, async function (
      err,
      result
    ) {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    })
  );
};

export const resendVerifyCode = (payload) => async (dispatch) => {
  const { email } = payload;
  const user = new CognitoUser({ Username: email, Pool });

  return new Promise((resolve, reject) =>
    user.resendConfirmationCode(function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  );
};

export const sendForgotPasswordCode = (email) => async (dispatch) => {
  const user = new CognitoUser({ Username: email.toLowerCase(), Pool });

  return new Promise((resolve, reject) =>
    user.forgotPassword({
      onSuccess: (data) => {
        console.log('onSuccess', data);
        resolve(data);
      },
      onFailure: (err) => {
        console.log('onfaliure', err);
        reject(err);
      },
      inputVerificationCode: (data) => {
        console.log('input code', data);
        resolve(data);
      },
    })
  );
};

export const resetPassword = (payload) => async (dispatch) => {
  const { email, verifyCode, password } = payload;
  console.log(payload);
  const user = new CognitoUser({ Username: email.toLowerCase(), Pool });

  return new Promise((resolve, reject) =>
    user.confirmPassword(verifyCode, password, {
      onSuccess: () => {
        resolve(true);
      },
      onFailure: (err) => {
        reject(err);
      },
    })
  );
};

export const changePassword = (email, password, newPassword) => async (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession(async (err, session) => {
        if (err) {
          reject(err);
        }

        user.changePassword(password, newPassword, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    }
  });
};

export const logout = () => (dispatch) => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    return dispatch({
      type: LOGOUT,
    });
  }
};

export const clearError = () => (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR,
  });
};

export const setLoading = (state = true) => (dispatch) => {
  dispatch({
    type: CLEAR_DOCUMENT,
  });
  return dispatch({
    type: SET_LOADING_AUTH,
    payload: state,
  });
};
