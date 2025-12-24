'use client';

import { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
}

export function EditableText({
    value,
    onChange,
    className = '',
    multiline = false,
    placeholder = 'Click to edit...'
}: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing) {
            if (multiline && textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
            } else if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
        }
    }, [isEditing, multiline]);

    const handleBlur = () => {
        onChange(tempValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setTempValue(value);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={textareaRef}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={`${className} bg-blue-50/90 text-slate-900 border-2 border-blue-400 rounded-lg px-3 py-2 outline-none resize-none w-full min-h-[100px] shadow-inner font-normal`}
                    rows={4}
                />
            );
        }
        return (
            <input
                ref={inputRef}
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`${className} bg-blue-50/90 text-slate-900 border-2 border-blue-400 rounded-lg px-3 py-1 outline-none w-full shadow-inner font-normal`}
            />
        );
    }

    return (
        <span
            onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
            }}
            className={`${className} cursor-pointer group relative transition-all duration-200 inline-block min-w-[20px] rounded-md`}
            title="Click to edit"
        >
            <span className="relative z-10">
                {value || <span className="text-blue-200/50 italic">{placeholder}</span>}
            </span>

            {/* Visual indicator on hover - less intrusive than before */}
            <span className="absolute -inset-1 border-2 border-transparent group-hover:border-blue-400/50 group-hover:border-dashed rounded-lg transition-all opacity-0 group-hover:opacity-100 pointer-events-none z-0"></span>

            {/* Pencil icon shortcut (optional, but good for UX) */}
            <span className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
            </span>
        </span>
    );
}
