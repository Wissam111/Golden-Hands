import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";
import AuthRepository from "../../../repository/AuthRepository";

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

  const onPhoneChanged = (s) => {
    setState((prev) => {
      return {
        ...prev,
        phone: s,
      };
    });
  };
  const sendAuthVerification = async () => {
    setLoading({ isLoading: true });
    const data = await authRepository.sendAuthVerification(state.phone);
    verifyId = data.verifyId;
    console.log(verifyId);
    if (verifyId) {
      setState((prev) => {
        return {
          ...prev,
          showCode: true,
        };
      });
    }
    setLoading({ isLoading: false });
  };

  const loginAndVerify = async (code) => {
    console.log(code, verifyId);
    if (!verifyId) return;
    setLoading({ isLoading: true });
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
    setLoading({ isLoading: false });
    setState((prev) => {
      return {
        ...prev,
        navigateToHome: true,
      };
    });
  };

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
