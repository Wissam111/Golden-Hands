import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import getString from "../../../localization";
import AuthRepository from "../../../repository/AuthRepository";
import showAlert from "../../components/ShowAlert";

let verifyId;

const LoginViewModel = () => {
  const { dispatch: setLoading } = useLoadingContext();
  const { dispatch } = useAuthContext();
  const [state, setState] = useState({
    phone: "",
    showCode: false,
    navigateToHome: false,
  });
  const authRepository = AuthRepository();


  // on phone input changed
  const onPhoneChanged = (s) => {
    setState((prev) => {
      return {
        ...prev,
        phone: s,
      };
    });
  };


  // send auth verification sms message
  const sendAuthVerification = async () => {
    if (!state.phone || state.phone.trim().length == 0) {
      return
    }
    setLoading({ isLoading: true });
    try {
      const data = await authRepository.sendAuthVerification(state.phone, true);
      verifyId = data.verifyId;
      if (verifyId) {
        setState((prev) => {
          return {
            ...prev,
            showCode: true,
          };
        });
      }
    } catch (e) {
      if (e.status === 404) {
        showAlert(getString.t('error'), getString.t('user_with_this_phone_was_not_found'))
      }
      else if (e.status === 403) {
        showAlert(getString.t('error'), getString.t('you_have_too_many_tries'))
      }
      else {
        showAlert(getString.t('error'), getString.t('something_went_wrong'))
      }
    }

    setLoading({ isLoading: false });
  };



  // login and verfiy the sms code
  const loginAndVerify = async (code) => {
    console.log(code, verifyId);
    if (!verifyId) return;
    setLoading({ isLoading: true });

    try {
      const { authData } = await authRepository.loginAndVerify(
        verifyId,
        state.phone,
        code
      );
      dispatch({
        type: "LOGIN",
        payload: {
          user: authData.user,
          token: authData.token,
          refreshToken: authData.refresh_token,
          expireDate: authData.expireDate,
        },
      });

      setState((prev) => {
        return {
          ...prev,
          navigateToHome: true,
        };
      });
    }
    catch (e) {
      if (e.status === 403) {
        showAlert(getString.t('error'), getString.t('code_not_match'))
      }
      else if (e.status === 404) {
        showAlert(getString.t('error'), getString.t('code_expired_try_again'))
      }
      else {
        showAlert(getString.t('error'), getString.t('something_went_wrong'))
      }
    }

    setLoading({ isLoading: false });
  };


  // hide OPT code view
  const hideCode = () => {
    setState((prev) => {
      return {
        ...prev,
        showCode: false,
      };
    });
  };

  return {
    ...state,
    hideCode,
    onPhoneChanged,
    sendAuthVerification,
    loginAndVerify,
  };
};

export default LoginViewModel;
