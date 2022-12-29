import { useEffect } from "react";
import { useState } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Modal, Text, View } from "react-native";
import useDialogContext from "../../hooks/useDialogContext";
import getString from "../../localization";
import { backgroundColor, fontLarge, fontMeduim, fontMeduim2, fontSmall, globalStyles, gray1, lightBlack, white } from "../styles/global";
import DefaultButton from "./DefaultButton";
import Spacer from "./Spacer";



const Dialog = () => {
    const { isVisible, title, message, onDone, dispatch } = useDialogContext()


    return (
        <Modal
            style={{ zIndex: 10 }}
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                dispatch({ isVisible: false })
            }}>
            <TouchableWithoutFeedback onPress={() => {
                dispatch({ isVisible: false })
            }}>
                <View style={styles.centeredView}>
                    <View
                        onStartShouldSetResponder={(event) => true}
                        onTouchEnd={(e) => {
                            e.stopPropagation();
                        }}
                        style={styles.modalView}>

                        <View style={{ padding: 8, backgroundColor: backgroundColor, borderRadius: 20 }}>
                            <View>
                                <Text style={{ ...globalStyles.font, fontSize: fontMeduim, color: lightBlack, alignSelf: 'flex-start' }}>{title ? title : getString.t('message')}</Text>
                                <Spacer space={8} />
                            </View>

                            {onDone &&
                                <Image style={{ width: 100, height: 100, alignSelf: 'center' }} source={require('../../assets/imgs/light-bulb.png')} />
                            }
                        </View>

                        <Spacer space={6} />
                        <Text style={{ ...globalStyles.font, fontSize: fontSmall, color: gray1, alignSelf: 'center' }}>{message}</Text>
                        <Spacer space={16} />


                        {onDone &&
                            <View style={{ padding: 20 }}>
                                <DefaultButton
                                    onPress={() => {
                                        dispatch({ isVisible: false })
                                        if (onDone)
                                            onDone()
                                    }}
                                    style={{
                                        elevation: 12,
                                        shadowColor: 'black',
                                        shadowRadius: .6,
                                        shadowOpacity: .2,
                                        shadowOffset: { width: .4, height: .4 },
                                    }}
                                    textColor={'black'}
                                    color={white} text={getString.t('yes')} />
                                <Spacer space={4} />
                                <DefaultButton
                                    onPress={() => { dispatch({ isVisible: false }) }}
                                    text={getString.t('no')} />
                            </View>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
}

export default Dialog;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 20,
        minHeight: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },


});