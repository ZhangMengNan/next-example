import { FC, useEffect, useState, useRef } from "react";

import styles from "./index.module.scss";

interface Props {
    time: number;
    onEnd: () => void;
}

const CountDown: FC<Props> = ({ time, onEnd }) => {
    const timer = useRef<NodeJS.Timer | null>(null);
    const [count, setCount] = useState(time ?? 60);

    useEffect(() => {
        timer.current = setInterval(() => {
            setCount(item => {
                if (item === 0) {
                    timer.current && clearInterval(timer.current);
                    onEnd && onEnd();

                    return item;
                }

                return item - 1;
            });
        }, 1000);

        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [time, onEnd]);

    return <div className={styles.countDown}>{count} s</div>;
};

export default CountDown;
