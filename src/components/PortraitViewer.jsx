import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const PortraitViewer = () => {
    const dialogRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const dialog = dialogRef.current;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                aria-label="View full portrait of Vivien Perrelle"
                aria-haspopup="dialog"
                onClick={() => setIsOpen(true)}
                className="block w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-border-subtle bg-border-subtle/20 cursor-zoom-in hover:border-border-strong transition-colors duration-180 motion-reduce:transition-none"
            >
                <img
                    src="/me.webp"
                    alt="Portrait of Vivien Perrelle"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover brightness-110"
                />
            </button>

            <dialog
                ref={dialogRef}
                aria-label="Full portrait of Vivien Perrelle"
                onClose={() => setIsOpen(false)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) dialogRef.current.close();
                }}
                className="portrait-dialog fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-transparent p-0 text-white open:flex items-center justify-center backdrop:bg-black/90 backdrop:backdrop-blur-sm"
            >
                {isOpen && (
                    <>
                        <div className="aspect-[4/5] w-[min(calc(100vw-2rem),64dvh)] md:aspect-square md:w-[min(calc(100vw-2rem),80dvh)]">
                            <picture className="block h-full w-full">
                                <source
                                    media="(max-width: 767px)"
                                    srcSet="/portraits/vivien-33-mobile.webp"
                                    width={1200}
                                    height={1500}
                                />
                                <img
                                    src="/portraits/vivien-33.webp"
                                    alt="Vivien Perrelle smiling, full portrait"
                                    width={2400}
                                    height={2400}
                                    decoding="async"
                                    className="h-full w-full object-cover object-center"
                                />
                            </picture>
                        </div>
                        <button
                            type="button"
                            autoFocus
                            aria-label="Close portrait"
                            onClick={() => dialogRef.current.close()}
                            className="fixed top-4 right-4 flex md:hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-white/15 focus-visible:outline-white transition-colors motion-reduce:transition-none"
                        >
                            <X size={22} aria-hidden="true" />
                        </button>
                    </>
                )}
            </dialog>
        </>
    );
};

export default PortraitViewer;
