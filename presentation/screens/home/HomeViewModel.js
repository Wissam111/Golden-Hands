import { useState } from "react"


const HomeViewModel = () => {
    const [state, setState] = useState({
        workers: [
            { name: 'tarik' },
            { name: 'wissam' }
        ]
    })


    const getWorkers = async () => {

    }

    const getAppointment = async () => {

    }

    return { ...state, getWorkers, getAppointment }
}

export default HomeViewModel;