'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function SecretEntry() {
    const router = useRouter();
    const buffer = useRef<string[]>([]);
    const sequence = ['1', '2', '3', '1', '2', '3'];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Push key to buffer
            buffer.current.push(e.key);

            // Keep buffer size same as sequence length
            if (buffer.current.length > sequence.length) {
                buffer.current.shift();
            }

            // Check if buffer matches sequence
            if (buffer.current.join('') === sequence.join('')) {
                // Clear buffer to prevent double triggers
                buffer.current = [];
                // Magic happens
                router.push('/khul-ja-sim-sim');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null; // This component is invisible
}
