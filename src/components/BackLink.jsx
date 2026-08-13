import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// The "return to where you came from" control every article and collection page
// opens with. It was copy-pasted 28 times, which is how three pages ended up
// labelling the same destination "Back", "Home" and "Journal" — the label stays a
// prop, the arrow, the hover group and the spacing no longer do.
const BackLink = ({ to, label }) => (
    <Link to={to} className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>{label}</span>
    </Link>
);

export default BackLink;
