import { Alert } from "react-native";


const showAlert = (title, message, onCancel, onDone, onDismiss) =>
    Alert.alert(
        title,
        message,
        [
            {
                text: "Cancel",
                onPress: onCancel,
            },
            { text: "OK", onPress: onDone }
        ],
        {
            cancelable: true,
            onDismiss: onDismiss
        },
    );

export default showAlert