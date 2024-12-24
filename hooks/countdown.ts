import { useEffect, useRef, useState } from "react";

export default function useCountdown(seconds: number): {
    percentage: number,
    handleDone: () => void
} {
    const [origAbsMs, setOrigAbsMs] = useState<number | undefined>(undefined);
    const [msProgress, setMsProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    const handleDone = () => {
        const interval = intervalRef.current;

        if (interval) {
            clearInterval(interval);
        }
    };

    return {
        percentage: msProgress / 1000 / seconds,
        handleDone
    };
}