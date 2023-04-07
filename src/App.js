import React, { useEffect, useState } from 'react'
import './App.css'
import Timer from './components/Timer'
function App() {
    const [focusFazeTimer, setFocusFazeTimer] = useState(JSON.parse(window.sessionStorage.getItem('focusLength')))
    const [shortFazeTimer, setShortFazeTimer] = useState(JSON.parse(window.sessionStorage.getItem('shortLength')))
    const [longFazeTimer, setLongFazeTimer] = useState(JSON.parse(window.sessionStorage.getItem('longLength')))
    useEffect(() => {
        const scenario = ['f', 's', 'f', 's', 'f', 's', 'f', 'l']
        window.sessionStorage.setItem('scenario', JSON.stringify(scenario))
        //focus time
        if (JSON.parse(window.sessionStorage.getItem('focusLength')) == null) {
            JSON.stringify(window.sessionStorage.setItem('focusLength', 1500))
            setFocusFazeTimer(1500)
        } else {
            setFocusFazeTimer(JSON.parse(window.sessionStorage.getItem('focusLength')))
        }

        //short break time
        if (JSON.parse(window.sessionStorage.getItem('shortLength')) == null) {
            JSON.stringify(window.sessionStorage.setItem('shortLength', 300))
            setShortFazeTimer(300)
        } else {
            setShortFazeTimer(JSON.parse(window.sessionStorage.getItem('shortLength')))
        }

        //long break time
        if (JSON.parse(window.sessionStorage.getItem('longLength')) == null) {
            JSON.stringify(window.sessionStorage.setItem('longLength', 900))
            setLongFazeTimer(900)
        } else {
            setLongFazeTimer(JSON.parse(window.sessionStorage.getItem('longLength')))
        }
    }, [])
    const [step, setStep] = useState(0)
    useEffect(() => {
        const scenario = JSON.parse(window.sessionStorage.getItem('scenario'))
        if(+step === scenario.length){
            setStep(0)
        }
        if(scenario[step] === 'f'){
            setFaze({focus: true, shortBreak: false, longBreak: false})
        }
        else if(scenario[step] === 's'){
            setFaze({focus: false, shortBreak: true, longBreak: false})
        }
        else if(scenario[step] === 'l'){
            setFaze({focus: false, shortBreak: false, longBreak: true})
        }
    }, [step])
    const [faze, setFaze] = useState({focus: true, shortBreak: false, longBreak: false})

    return (
        <React.Fragment>
            {
               faze.focus 
               ? <Timer timer={focusFazeTimer} setTimer1={setFocusFazeTimer} setTimer2={setShortFazeTimer} setTimer3={setLongFazeTimer} faze={'focus'} step={step} setStep={setStep}/> 
               : faze.shortBreak ? <Timer timer={shortFazeTimer} setTimer1={setFocusFazeTimer} setTimer2={setShortFazeTimer} setTimer3={setLongFazeTimer} faze={'short break'} step={step} setStep={setStep}/> 
               : faze.longBreak ? <Timer timer={longFazeTimer} setTimer1={setFocusFazeTimer} setTimer2={setShortFazeTimer} setTimer3={setLongFazeTimer} faze={'long break'} step={step} setStep={setStep}/> 
               : 'null'
            }
        </React.Fragment>
    )
}

export default App