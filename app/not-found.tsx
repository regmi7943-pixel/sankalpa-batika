import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    );
}
