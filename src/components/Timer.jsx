import React, { useEffect, useRef, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import useSound from 'use-sound'
import Select from 'react-select'
import InputRange from 'react-input-range'
import clickButton from '../audio/btnClick.mp3'
import fazeSound from '../audio/faze.mp3'
import lofi from '../audio/lofi.mp3'
import './Timer.css'
import 'react-input-range/lib/css/index.css'
import Switch from './Switch'
import { Helmet } from 'react-helmet'

function Timer({ timer, setTimer1, setTimer2, setTimer3, faze, step, setStep }) {

    let fadeAnim = useRef()

    const handleSkip = () => {
        if (soundEffects) {
            btnClick()
        }
        setStep(step + 1)
        if (loFi && !isPlaying) {
            sound.pause()
        }
        const time = new Date();
        time.setSeconds(time.getSeconds() + timer)
        restart(time)
        pause()
    }
    useEffect(() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + timer)
        restart(time)
        pause()
    }, [timer])
    const stageController = faze === 'focus' ? 'red' : faze === 'short break' ? 'green' : faze === 'long break' ? 'blue' : ''
    const defineColor = faze === 'focus' ? '#471515' : faze === 'short break' ? '#14401D' : faze === 'long break' ? '#153047' : 0
    const defineColorDarkMode = faze === 'focus' ? '#FFF2F2' : faze === 'short break' ? '#F2FFF5' : faze === 'long break' ? '#F2F9FF' : 0
    const time = new Date()
    time.setSeconds(time.getSeconds() + timer)
    const expiryTimestamp = time
    const {
        seconds,
        minutes,
        isRunning,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp, autoStart: false, onExpire: () => {
            if (soundEffects) {
                fazeNot()
            }
            setStep(step + 1)
            if (loFi && !isPlaying) {
                sound.pause()
            }
            const time = new Date();
            time.setSeconds(time.getSeconds() + timer)
            restart(time)
            pause()
        }
    })


    useEffect(() => {
        //dark
        if (JSON.parse(window.sessionStorage.getItem('dark')) == null) {
            JSON.stringify(window.sessionStorage.setItem('dark', false))
            setDark(false)
        } else {
            setDark(JSON.parse(window.sessionStorage.getItem('dark')))
        }

        //lofi
        if (JSON.parse(window.sessionStorage.getItem('lofi')) == null) {
            JSON.stringify(window.sessionStorage.setItem('lofi', false))
            setLoFi(false)
        } else {
            setLoFi(JSON.parse(window.sessionStorage.getItem('lofi')))
        }

        //sound effects
        if (JSON.parse(window.sessionStorage.getItem('soundEffects')) == null) {
            JSON.stringify(window.sessionStorage.setItem('soundEffects', true))
            setSoundEffects(true)
        } else {
            setSoundEffects(JSON.parse(window.sessionStorage.getItem('soundEffects')))
        }

        //volume
        if (JSON.parse(window.sessionStorage.getItem('volume')) == null) {
            setTimeout(() => {
                setVolumeValue(30)
            }, 1000);
            JSON.stringify(window.sessionStorage.setItem('volume', 30))
        } else {
            setVolumeValue(JSON.parse(window.sessionStorage.getItem('volume')))
        }
    }, [])


    const [btnClick] = useSound(clickButton)
    const [fazeNot] = useSound(fazeSound)
    const [volumeValue, setVolumeValue] = useState(JSON.parse(window.sessionStorage.getItem('volume')))

    const [lofiMusic, { sound, stop, isPlaying }] = useSound(
        lofi,
        {
            loop: true,
            volume: (volumeValue / 100)
        }
    )
    const handlePlay = () => {
        if (soundEffects) {
            btnClick()
        }
        if (!isRunning) {
            resume()
            if (loFi && !isPlaying) {
                lofiMusic()
            }
        }
        else {
            pause()
            sound.pause()
        }
    }

    // settings
    const [settings, setSettings] = useState(false)
    const [loFi, setLoFi] = useState()
    const [soundEffects, setSoundEffects] = useState()
    const [dark, setDark] = useState()
    const [darkMode, setDarkMode] = useState('')

    const handleVolume = (e) => {
        console.log('worked' + e)
        setVolumeValue(e)
        JSON.stringify(window.sessionStorage.setItem('volume', e))
    }

    useEffect(() => {
        if (dark) {
            setDarkMode('dark')
        }
        else {
            setDarkMode('')
        }
    }, [dark])

    useEffect(() => {
        if (loFi && isRunning) {
            sound.play()
        }
        else {
            stop()
        }
    }, [loFi, sound, isRunning, stop])



    //foucs length settings

    const [focusLength, setFocusLength] = useState({ label: `${(JSON.parse(sessionStorage.getItem('focusLength')) || 1500) / 60} min` })

    const focusLengthOptions = [
        { value: 30, label: '0.5 min' },
        { value: 60, label: '1 min' },
        { value: 180, label: '3 min' },
        { value: 300, label: '5 min' },
        { value: 600, label: '10 min' },
        { value: 900, label: '15 min' },
        { value: 1200, label: '20 min' },
        { value: 1500, label: '25 min' },
        { value: 1800, label: '30 min' },
        { value: 3599, label: '1 hour' },
    ]

    const handleFocusLength = (e) => {
        JSON.stringify(window.sessionStorage.setItem('focusLength', e.value))
        setFocusLength(e)
        setTimer1(e.value)
    }

    // short length settings
    const [shortLength, setShortLength] = useState({ label: `${(JSON.parse(sessionStorage.getItem('shortLength')) || 300) / 60} min` })

    const shortLengthOptions = [
        { value: 30, label: '0.5 min' },
        { value: 60, label: '1 min' },
        { value: 180, label: '3 min' },
        { value: 300, label: '5 min' },
        { value: 600, label: '10 min' },
        { value: 900, label: '15 min' },
        { value: 1200, label: '20 min' },
        { value: 1500, label: '25 min' },
        { value: 1800, label: '30 min' },
        { value: 3599, label: '1 hour' },
    ]

    const handleShortLength = (e) => {
        JSON.stringify(window.sessionStorage.setItem('shortLength', e.value))
        setShortLength(e)
        setTimer2(e.value)
    }

    // long length settings

    const [longLength, setLongLength] = useState({ label: `${(JSON.parse(sessionStorage.getItem('longLength')) || 900) / 60} min` })

    const longLengthOptions = [
        { value: 30, label: '0.5 min' },
        { value: 60, label: '1 min' },
        { value: 180, label: '3 min' },
        { value: 300, label: '5 min' },
        { value: 600, label: '10 min' },
        { value: 900, label: '15 min' },
        { value: 1200, label: '20 min' },
        { value: 1500, label: '25 min' },
        { value: 1800, label: '30 min' },
        { value: 3599, label: '1 hour' },
    ]

    const handleLongLength = (e) => {
        JSON.stringify(window.sessionStorage.setItem('longLength', e.value))
        setLongLength(e)
        setTimer3(e.value)
    }

    const [helmetMinutes, setHelmetMinutes] = useState('')
    const [helmetSeconds, setHelmetSeconds] = useState('')

    useEffect(() => {
        setHelmetMinutes(minutes < 10 ? '0' + minutes : minutes)
        setHelmetSeconds(seconds < 10 ? '0' + seconds : seconds)
    }, [minutes, seconds])

    useEffect(() => {
        const favicon = document.getElementById('favicon')
        console.log(favicon.href)
        console.log(faze.split(' ')[0])
        favicon.href = `./${faze.split(' ')[0]}.ico`;
    }, [faze])

    function closeModal() {
        fadeAnim.current.classList.remove('fadeIn')
        fadeAnim.current.classList.add('fadeOut')
        setTimeout(() => {
            setSettings(false);
        }, 150)
    }

    return (
        <div className={`back ${stageController} ${darkMode}`}>
            <Helmet defer={false}>
                <meta charSet="utf-8" />
                <title>
                    {`${helmetMinutes}`}:{`${helmetSeconds}`}
                </title>
            </Helmet>
            {
                settings ? (
                    <div className="modal">
                        <div ref={fadeAnim} onClick={closeModal} className="modal__overlay fadeIn"></div>
                        <div ref={fadeAnim} className={`modal__content fadeIn ${stageController} ${darkMode}`}>
                            <div className="flex">
                                <h3>Settings</h3>
                                <svg style={{ cursor: 'pointer' }} onClick={closeModal} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.4633 21.6618C22.5689 21.7684 22.6282 21.9124 22.6282 22.0625C22.6282 22.2126 22.5689 22.3567 22.4633 22.4633C22.3558 22.5673 22.212 22.6254 22.0625 22.6254C21.9129 22.6254 21.7692 22.5673 21.6617 22.4633L17 17.7946L12.3383 22.4633C12.2308 22.5673 12.087 22.6254 11.9375 22.6254C11.7879 22.6254 11.6442 22.5673 11.5367 22.4633C11.4311 22.3567 11.3718 22.2126 11.3718 22.0625C11.3718 21.9124 11.4311 21.7684 11.5367 21.6618L16.2055 17L11.5367 12.3383C11.447 12.229 11.4012 12.0903 11.4081 11.9491C11.415 11.8078 11.4743 11.6743 11.5742 11.5743C11.6742 11.4743 11.8078 11.4151 11.949 11.4082C12.0902 11.4012 12.229 11.4471 12.3383 11.5368L17 16.2055L21.6617 11.5368C21.771 11.4471 21.9097 11.4012 22.051 11.4082C22.1922 11.4151 22.3258 11.4743 22.4257 11.5743C22.5257 11.6743 22.5849 11.8078 22.5919 11.9491C22.5988 12.0903 22.553 12.229 22.4633 12.3383L17.7945 17L22.4633 21.6618Z" fill={dark ? defineColorDarkMode : defineColor} />
                                </svg>
                            </div>
                            <div className="flex">
                                <p>Dark Mode</p>
                                <Switch isDark={darkMode} name={'dark'} isToggled={dark} onToggle={() => setDark(!dark)} color={stageController} />
                            </div>
                            <div className="flex">
                                <p>Lo-Fi</p>
                                <Switch isDark={darkMode} name={'lofi'} isToggled={loFi} onToggle={() => setLoFi(!loFi)} color={stageController} />
                            </div>
                            <div className="flex">
                                <p>Sound Effects</p>
                                <Switch isDark={darkMode} name={'soundEffects'} isToggled={soundEffects} onToggle={() => setSoundEffects(!soundEffects)} color={stageController} />
                            </div>
                            <div className={`input__range ${stageController}`}>
                                <p>Volume</p>
                                <InputRange
                                    step={1}
                                    maxValue={100}
                                    minValue={0}
                                    value={volumeValue}
                                    onChange={handleVolume}
                                />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <p>Focus length</p>
                                <Select
                                    className='input__select'
                                    value={focusLength}
                                    onChange={(e) => handleFocusLength(e)}
                                    options={focusLengthOptions}
                                />
                            </div>
                            <div>
                                <p>Short length</p>
                                <Select
                                    className='input__select'
                                    value={shortLength}
                                    onChange={(e) => handleShortLength(e)}
                                    options={shortLengthOptions}
                                />
                            </div>
                            <div>
                                <p>Long length</p>
                                <Select
                                    className='input__select'
                                    value={longLength}
                                    onChange={(e) => handleLongLength(e)}
                                    options={longLengthOptions}
                                />
                            </div>
                        </div>
                    </div>
                )
                    :
                    (
                        <div onClick={() => setSettings(true)} className={`settings ${stageController} ${darkMode}`}>
                            <svg width="22" height="22" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.6876 11.0375C28.6565 10.8977 28.5958 10.7662 28.5095 10.6519C28.4233 10.5376 28.3135 10.4432 28.1876 10.375L25.2126 8.72498C25.0531 8.4016 24.8736 8.08849 24.6751 7.78748L24.7376 4.38748C24.7387 4.24487 24.7104 4.10356 24.6545 3.97236C24.5986 3.84117 24.5162 3.72291 24.4126 3.62498C22.9313 2.28193 21.1795 1.27177 19.2751 0.662477C19.1383 0.619833 18.994 0.606696 18.8518 0.623934C18.7096 0.641173 18.5727 0.688393 18.4501 0.762477L15.5376 2.51248C15.1751 2.49998 14.8251 2.49998 14.4626 2.51248L11.5501 0.762477C11.4274 0.688393 11.2905 0.641173 11.1483 0.623934C11.0061 0.606696 10.8618 0.619833 10.7251 0.662477C8.81814 1.27224 7.0656 2.28709 5.58756 3.63748C5.48298 3.73204 5.39987 3.84791 5.34381 3.97727C5.28775 4.10664 5.26005 4.24651 5.26256 4.38748L5.32506 7.78748C5.12506 8.08748 4.95006 8.39998 4.77506 8.72498L1.80005 10.375C1.67596 10.4439 1.56817 10.5387 1.48404 10.6531C1.39992 10.7674 1.34142 10.8985 1.31255 11.0375C0.887514 12.9896 0.887514 15.0103 1.31255 16.9625C1.3436 17.1023 1.40431 17.2338 1.49057 17.3481C1.57684 17.4623 1.68664 17.5568 1.81255 17.625L4.78756 19.275C4.94704 19.5984 5.12655 19.9115 5.32506 20.2125L5.26256 23.6125C5.26141 23.7551 5.28968 23.8964 5.3456 24.0276C5.40152 24.1588 5.48389 24.277 5.58756 24.375C7.06885 25.718 8.82065 26.7282 10.7251 27.3375C10.8618 27.3801 11.0061 27.3933 11.1483 27.376C11.2905 27.3588 11.4274 27.3116 11.5501 27.2375L14.4626 25.4875H15.5376L18.4626 27.2375C18.6146 27.3375 18.7931 27.3897 18.9751 27.3875C19.0767 27.3831 19.1775 27.3663 19.2751 27.3375C21.182 26.7277 22.9345 25.7129 24.4126 24.3625C24.5171 24.2679 24.6002 24.1521 24.6563 24.0227C24.7124 23.8933 24.7401 23.7534 24.7376 23.6125L24.6751 20.2125C24.8751 19.9125 25.0501 19.6 25.2251 19.275L28.2001 17.625C28.3242 17.5561 28.4319 17.4612 28.5161 17.3469C28.6002 17.2326 28.6587 17.1015 28.6876 16.9625C29.1126 15.0103 29.1126 12.9896 28.6876 11.0375ZM15.0001 19.5C13.9123 19.5 12.8489 19.1774 11.9444 18.5731C11.04 17.9687 10.335 17.1097 9.91872 16.1047C9.50244 15.0997 9.39352 13.9939 9.60574 12.927C9.81796 11.8601 10.3418 10.8801 11.111 10.1109C11.8802 9.3417 12.8602 8.81788 13.9271 8.60566C14.994 8.39344 16.0998 8.50236 17.1048 8.91864C18.1098 9.33492 18.9688 10.0399 19.5731 10.9443C20.1775 11.8488 20.5001 12.9122 20.5001 14C20.5001 15.4587 19.9206 16.8576 18.8891 17.8891C17.8577 18.9205 16.4587 19.5 15.0001 19.5Z" fill={dark ? defineColorDarkMode : defineColor} />
                            </svg>
                        </div>
                    )
            }
            <div className="container">
                <div className={`faze__description ${stageController} ${darkMode}`}>
                    <div className={`faze__description-icon ${stageController} ${darkMode}`}></div>
                    <p className="faze__description-text">{faze}</p>
                </div>
                <div className={`faze__step ${darkMode}`}>{step + 1} / 8</div>
                <div className={`faze__timer ${stageController} ${isRunning && 'run'} ${darkMode}`}>
                    <div><span>{minutes < 10 && '0'}{minutes}</span></div>
                    <div><span>{seconds < 10 && '0'}{seconds}</span></div>
                </div>
                <div className="faze__controllers">
                    <div onClick={() => {
                        if (soundEffects) {
                            btnClick()
                        }
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + timer);
                        restart(time)
                        pause()
                        sound.pause()
                    }} className={`faze__controllers-reload controller ${stageController}`}>
                        <svg width="35px" height="35px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Reload">
                                    <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24">
                                    </rect>
                                    <path d="M4,13 C4,17.4183 7.58172,21 12,21 C16.4183,21 20,17.4183 20,13 C20,8.58172 16.4183,5 12,5 C10.4407,5 8.98566,5.44609 7.75543,6.21762" id="Path" stroke={dark ? defineColorDarkMode : defineColor} strokeWidth="2" strokeLinecap="round">
                                    </path>
                                    <path d="M9.2384,1.89795 L7.49856,5.83917 C7.27552,6.34441 7.50429,6.9348 8.00954,7.15784 L11.9508,8.89768" id="Path" stroke={dark ? defineColorDarkMode : defineColor} strokeWidth="2" strokeLinecap="round">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div onClick={handlePlay} className={`faze__controllers-switch controller ${stageController}`}>
                        {
                            !isRunning
                                ?
                                <div className="faze__controllers-start">
                                    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 13C21.9992 13.3439 21.9104 13.6818 21.7419 13.9816C21.5734 14.2814 21.3309 14.533 21.0375 14.7125L3.03749 25.7C2.73766 25.89 2.3914 25.9939 2.0365 26.0006C1.68159 26.0072 1.33169 25.9162 1.02499 25.7375C0.713758 25.5667 0.454302 25.3152 0.273924 25.0095C0.093547 24.7037 -0.00108208 24.355 -6.18584e-06 24V1.99996C-0.00108208 1.64496 0.093547 1.29623 0.273924 0.990471C0.454302 0.684709 0.713758 0.433218 1.02499 0.26246C1.33169 0.0837584 1.68159 -0.00725329 2.0365 -0.000640198C2.3914 0.00597289 2.73766 0.109956 3.03749 0.29996L21.0375 11.2875C21.3309 11.4669 21.5734 11.7185 21.7419 12.0183C21.9104 12.3181 21.9992 12.6561 22 13Z" fill={dark ? defineColorDarkMode : defineColor} />
                                    </svg>
                                </div>
                                :
                                <div className="faze__controllers-pause">
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 2V22C22 22.5304 21.7893 23.0391 21.4142 23.4142C21.0391 23.7893 20.5304 24 20 24H15.5C14.9696 24 14.4609 23.7893 14.0858 23.4142C13.7107 23.0391 13.5 22.5304 13.5 22V2C13.5 1.46957 13.7107 0.960859 14.0858 0.585786C14.4609 0.210714 14.9696 0 15.5 0H20C20.5304 0 21.0391 0.210714 21.4142 0.585786C21.7893 0.960859 22 1.46957 22 2ZM6.5 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H6.5C7.03043 24 7.53914 23.7893 7.91421 23.4142C8.28929 23.0391 8.5 22.5304 8.5 22V2C8.5 1.46957 8.28929 0.960859 7.91421 0.585786C7.53914 0.210714 7.03043 0 6.5 0Z" fill={dark ? defineColorDarkMode : defineColor} />
                                    </svg>
                                </div>
                        }
                    </div>
                    <div onClick={handleSkip} className={`faze__controllers-skip controller ${stageController}`}>
                        <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.65 10.0001C29.6515 10.3353 29.5687 10.6656 29.4093 10.9604C29.2498 11.2553 29.0188 11.5054 28.7375 11.6876L17.5875 18.8501C17.2849 19.0462 16.935 19.1568 16.5747 19.1703C16.2144 19.1837 15.8571 19.0995 15.5408 18.9266C15.2244 18.7537 14.9607 18.4985 14.7774 18.188C14.5942 17.8774 14.4984 17.5232 14.5 17.1626V11.8376L3.58749 18.8501C3.28491 19.0462 2.93496 19.1568 2.57467 19.1703C2.21438 19.1837 1.85714 19.0995 1.54077 18.9266C1.2244 18.7537 0.960655 18.4985 0.777442 18.188C0.594229 17.8774 0.498364 17.5232 0.49999 17.1626V2.83763C0.498364 2.47709 0.594229 2.12282 0.777442 1.8123C0.960655 1.50177 1.2244 1.24655 1.54077 1.07364C1.85714 0.900722 2.21438 0.816543 2.57467 0.830009C2.93496 0.843475 3.28491 0.954083 3.58749 1.15013L14.5 8.16263V2.83763C14.4984 2.47709 14.5942 2.12282 14.7774 1.8123C14.9607 1.50177 15.2244 1.24655 15.5408 1.07364C15.8571 0.900722 16.2144 0.816543 16.5747 0.830009C16.935 0.843475 17.2849 0.954083 17.5875 1.15013L28.7375 8.31263C29.0188 8.4949 29.2498 8.74496 29.4093 9.03983C29.5687 9.3347 29.6515 9.66492 29.65 10.0001Z" fill={dark ? defineColorDarkMode : defineColor} />
                        </svg>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Timer
