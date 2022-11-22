import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, I18nManager } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import getString from "../../localization";
import { blue, globalStyles } from "../styles/global";
import Spacer from "./Spacer";



const Opt = ({ number, callback, goBack, sendAgain, style, timeoutNumber = 60 }) => {
    const [opt, setOpt] = useState(['', '', '', ''])
    const [timeout, setTimeOut] = useState(timeoutNumber)
    const refs = []

    const onChange = (s, index) => {
        const up = [...opt]
        up[index] = s
        setOpt(up)
    }

    const isValidCode = () => {
        for (let i of opt) {
            if (i.length == 0)
                return false
        }
        return true
    }

    useEffect(() => {
        if (isValidCode() && callback) {
            callback(opt.join(''))
        }
    }, [opt])


    useEffect(() => {
        const timer = setInterval(() => {
            if (timeout > 0) {
                setTimeOut((prev) => {
                    return prev - 1
                })
            } else {
                clearInterval(timer)
                if (goBack)
                    goBack()
            }
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [timeout])


    var inputs = [];

    for (let i = 0; i < number; i++) {
        const ref = useRef()
        refs.push(ref)
        inputs.push(
            <View key={i} style={{ flexDirection: 'row-reverse', }}>
                <TextInput
                    style={styles.input}
                    selectionColor='black'
                    maxLength={1}
                    value={opt[i]}
                    onChangeText={(s) => {
                        onChange(s, i)
                        if (s.length > 0 && i < number - 1)
                            refs[i + 1].current.focus()
                    }}
                    multiline={false}
                    keyboardType="numeric"
                    autoFocus={i == 0 ? true : false}
                    returnKeyType="next"
                    ref={ref}
                    onSubmitEditing={() => refs[i + 1].current.focus()}
                />
                {
                    (i < number - 1) && <Spacer space={6} />
                }
            </View>
        )
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8
        }}>
            {goBack &&
                <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => { if (goBack) goBack() }}>
                    <Text style={{ color: blue, ...globalStyles.font }}>{getString.t('go_back')}</Text>
                </TouchableOpacity>
            }
            <Text style={globalStyles.font}>{timeout == 0 ? getString.t('code_expired') : timeout}</Text>
            
            <Spacer space={8}/>

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "row-reverse",
                ...style
            }}>
                {
                    inputs
                }

            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <Text style={{ marginEnd: 6, ...globalStyles.font, fontSize: 12 }}>{getString.t('didnt_receive_code')}</Text>
                <TouchableOpacity onPress={() => { if (sendAgain) sendAgain() }}>
                    <Text style={{ color: blue, ...globalStyles.font, fontSize: 12 }}>{getString.t('send_again')}</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default Opt;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#333',
        paddingVertical: 16,
        paddingHorizontal: 22,
        minHeight: 60,
        minWidth: 60,
        textAlign: 'center',
    }
})