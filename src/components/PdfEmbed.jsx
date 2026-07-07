import React from 'react';
import { FileText } from 'lucide-react';

// Lightweight, dependency-free PDF preview.
//
// Desktop: the browser's native viewer renders the file inline, so there is no
// pdf.js/WASM bundle weighing on the page. `loading="lazy"` defers the download
// until the embed nears the viewport, keeping it off the critical path. The A4
// aspect ratio (595x842 pt) makes the frame exactly one page tall.
//
// Mobile: iOS Safari can't scroll a PDF inside an iframe (it freezes on the
// first page), so below `sm` we swap the iframe for a static first-page image
// that opens the full document in the OS PDF viewer on tap. The image is
// mobile-only and lazy-loaded, so it costs desktop visitors nothing.
const PdfEmbed = ({ src, poster, title }) => (
    <figure className="my-4">
        <div
            className="hidden sm:block w-full overflow-hidden border border-border-subtle bg-[#525659]"
            style={{ aspectRatio: '595 / 842' }}
        >
            <iframe
                src={`${src}#toolbar=0&navpanes=0&statusbar=0&view=FitH`}
                title={title}
                loading="lazy"
                className="block h-full w-full border-0"
            />
        </div>

        <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden relative block overflow-hidden border border-border-subtle"
            style={{ aspectRatio: '595 / 842' }}
        >
            <img
                src={poster}
                alt={`First page of ${title}`}
                loading="lazy"
                width="900"
                height="1273"
                className="block h-full w-full object-cover object-top"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-primary/85 py-3 text-sm text-cream">
                <FileText size={15} />
                Open the full PDF
            </span>
        </a>
    </figure>
);

export default PdfEmbed;
