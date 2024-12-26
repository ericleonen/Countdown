import { useEffect, useRef, useState } from "react";

export default function useCountdown(seconds: number): {
    level: CountdownLevel,
    percentage: number,
    stop: () => void,
    done: boolean
} {
    const [origAbsMs, setOrigAbsMs] = useState<number | undefined>(undefined);
    const [msProgress, setMsProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [level, setLevel] = useState<CountdownLevel>("calm");
    const [done, setDone] = useState(false);

    const percentage = msProgress / 1000 / seconds;

    useEffect(() => {
        if (percentage === 1) setLevel("fail");
        else if (percentage > 0.9) setLevel("panic");
        else if (percentage > 0.33) setLevel("neutral");
        else setLevel("calm");
    }, [percentage, setLevel]);

    useEffect(() => {
        if (!origAbsMs) {
            setOrigAbsMs(new Date().getTime());
            return;
        }

        const interval = setInterval(() => {
            const msDiff = new Date().getTime() - origAbsMs;
            setMsProgress(Math.min(seconds * 1000, msDiff));
        }, 10);

        intervalRef.current = interval;

        return () => clearInterval(interval);
    }, [origAbsMs, setMsProgress]);

    const stop = () => {
        setDone(true);
        const interval = intervalRef.current;

        if (interval) {
            clearInterval(interval);
        }
    };

    return {
        level,
        percentage,
        stop,
        done
    };
}