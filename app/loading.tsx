import { Rocket } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Rocket className="h-12 w-12 text-blue-600 animate-bounce mb-4" />
            <p className="text-gray-500 font-medium">Loading...</p>
        </div>
    );
}
