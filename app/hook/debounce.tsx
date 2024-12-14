"use client";
import { useState, useEffect } from "react";

const Debounce = (value: number[], delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<number[]>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default Debounce;
