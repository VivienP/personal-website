import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <SEO
            title="Page Not Found | Vivien Perrelle"
            description="The page you are looking for does not exist."
            noindex={true}
        />
        <h1 className="text-6xl font-serif italic text-primary mb-4">404</h1>
        <p className="text-secondary text-lg mb-8">This page does not exist.</p>
        <Link
            to="/"
            className="text-sm border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors"
        >
            Back to Home
        </Link>
    </main>
);

export default NotFound;
