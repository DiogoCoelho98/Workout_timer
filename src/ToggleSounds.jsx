import { memo } from "react";

export default memo(function ToggleSounds({ allowSound, setAllowSound }) {
    return (
        <button 
                className="btn-sound" 
                onClick={() => setAllowSound((allowSound) => !allowSound)}
            >
                {allowSound ? "🔈" : "🔇"}
            </button>
    );
})