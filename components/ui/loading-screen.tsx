'use client';

import React from 'react';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-950">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[100px]" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Logo with pulsing effect */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                    <img
                        src="/logo.png"
                        alt="Sankalpa Vatika Logo"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 animate-bounce"
                        style={{ animationDuration: '3s' }}
                    />
                </div>

                {/* Text Section */}
                <div className="text-center space-y-2 relative z-10 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200 tracking-tight">
                        Sankalpa Vatika
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base font-medium tracking-wide animate-pulse">
                        Nurturing Minds, Building Character
                    </p>
                </div>

                {/* Loading Progress bar */}
                <div className="mt-12 w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative z-10">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 w-full origin-left animate-loading-progress" />
                </div>
            </div>

            <style jsx global>{`
        @keyframes loading-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-progress {
          animation: loading-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
        </div>
    );
}
