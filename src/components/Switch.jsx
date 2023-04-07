import React from 'react'
import './Switch.css'
function Switch({ isDark, name, color, isToggled, onToggle }) {
    const handleSwitch = () => {
        onToggle()
        window.sessionStorage.setItem(name, !isToggled)
    }

    return (
        <label className={`toggle-switch ${color} ${isDark}`}>
            <input type="checkbox" checked={isToggled} onChange={handleSwitch} />
            <span className="switch" />
        </label>
    )
}

export default Switch