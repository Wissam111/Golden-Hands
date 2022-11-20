import useAuthContext from "../../../hooks/useAuthContext";
import useLoadingContext from "../../../hooks/useLoadingContext";



const useProfileViewModel = () => {
    const { dispatch: setIsLoading } = useLoadingContext()
    const { dispatch: setAuthData } = useAuthContext()

    const getUserProfile = async () => {

    }



}

export default useProfileViewModel;