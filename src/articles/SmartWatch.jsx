import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const B = '/build-smartwatch';

// Inline reference link rendered as a superscript.
const Ref = ({ n, href }) => (
    <sup>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline underline-offset-2 ml-0.5"
        >
            [{n}]
        </a>
    </sup>
);

// Bordered image with optional caption.
const Figure = ({ src, alt, caption, className = '' }) => (
    <figure className="space-y-3">
        <div className={`border border-border-subtle ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
            />
        </div>
        {caption && <figcaption className="text-sm text-secondary italic">{caption}</figcaption>}
    </figure>
);

// Tip / "did you know" callout, mirroring the Notion asides.
const Note = ({ children }) => (
    <aside className="border-l-2 border-accent/60 bg-cream/40 pl-4 py-3 pr-4 text-sm text-secondary space-y-2">
        {children}
    </aside>
);

// Inline Arduino code snippet block.
const Code = ({ children }) => (
    <div className="overflow-x-auto border border-border-subtle bg-cream/40">
        <pre className="px-4 py-3 text-xs sm:text-sm font-mono text-primary whitespace-pre">{children}</pre>
    </div>
);

const SmartWatch = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="How to Build a SmartWatch | Vivien Perrelle"
                description="A hands-on tutorial to build a programmable, 3D-printed digital watch: program a round LCD with an Arduino and 3D-print the case."
                url="/blog/smartwatch"
                image={`${B}/smartwatch-closeup.jpg`}
                type="article"
                article={{ publishedTime: '2022-01-20', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "How to Build a SmartWatch",
                    "datePublished": "2022-01-20",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": `https://vivienperrelle.com${B}/smartwatch-closeup.jpg`,
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/smartwatch"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Tutorial</span>
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    How to Build a SmartWatch?
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A programmable and 3D-printed digital watch.
                </p>
            </header>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                {/* Lead — image left, intro right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="overflow-hidden border border-border-subtle">
                        <img
                            src={`${B}/smartwatch-closeup.jpg`}
                            alt="Close-up of the finished 3D-printed smartwatch"
                            className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="space-y-6 order-first md:order-last">
                        <p className="text-base font-normal text-primary">
                            Wearable technologies are becoming ever more present in daily life. This tutorial shows how to build a smartwatch: it combines electronics — to program a liquid crystal display — and 3D printing — to make the watch case. It is a hands-on introduction to designing wearable technologies.
                        </p>
                        <div className="flex pt-2">
                            <a href="https://github.com/VivienP/BioWatch/tree/main/smartwatch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                                <span>View on GitHub</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Context */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Context</h2>
                        <p>
                            The first liquid crystal display (LCD) was built in 1967 by Lechner et al.<Ref n="1" href="https://doi.org/10.1109/ISSCC.1969.1154684" />, a technology that enables low-power flat-panel displays<Ref n="2" href="https://www.researchgate.net/publication/230823800_Liquid_Crystal_Display_Drivers_-_Techniques_and_Circuits" />. The first LCD-screen watch followed in 1968<Ref n="3" href="https://www.researchgate.net/publication/282650374_The_History_of_LCD_Development" />, and Gordon Moore, co-founder of Intel, contributed greatly to advancing the technology<Ref n="4" href="https://doi.org/10.1057/9781137323385_9" />. LCDs are now found in most screens, including smartwatch displays.
                        </p>
                        <p>
                            The Pulsar NL C01, designed in 1982, is considered the first smartwatch — a user-programmable watch<Ref n="5" href="https://doi.org/10.1080/0144929X.2018.1424246" />. Their features have multiplied since, covering connectivity, sports, and health<Ref n="6" href="https://doi.org/10.1007/978-3-030-50502-8" />, and their strong personalization has boosted their popularity<Ref n="7" href="https://doi.org/10.1145/3412841.3442023" />. Smart-wearable shipments reached 270 million units in 2020 and are projected to hit 770 million by 2026<Ref n="8" href="https://www.mordorintelligence.com/industry-reports/smart-wearables-market" />.
                        </p>
                        <p>
                            <span className="font-medium text-primary">Technological tools are increasingly within reach of individuals.</span> Prototyping platforms make electronics easy to program, and 3D printing allows tailor-made objects — so non-professionals can now build complex devices such as a smartwatch.
                        </p>
                    </div>
                    <Figure src={`${B}/market-share.jpg`} alt="Smartwatch market share pie chart, 2020" caption="Smartwatch market share, Global, 2020. Source: Forbes." />
                </section>

                {/* Skills & Opportunities */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Figure src={`${B}/worn-on-wrist.jpg`} alt="The smartwatch worn on a wrist" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Skills &amp; Opportunities</h2>
                        <p>
                            The first skill is <span className="font-medium text-primary">programming LCD screens</span> — which lets you print images, videos, GIFs, and data. The second is <span className="font-medium text-primary">slicing 3D models</span>, the step that precedes any 3D print and lets you produce any object, such as a watch case. Building this smartwatch is a first approach to wearable technologies.
                        </p>
                        <Figure src={`${B}/worn-closeup.jpg`} alt="Close-up of the smartwatch on the wrist" />
                    </div>
                </section>

                {/* Requirements */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Requirements</h2>
                        <p>This project involves several prerequisites:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary text-sm">
                            <li>A 3D printer and its slicing software,</li>
                            <li>A 1.28" round LCD display module from WaveShare <span className="italic">(orderable <a href="https://www.kubii.fr/ecrans-afficheurs/3242-ecran-rond-lcd-1-28-pouces-3272496305625.html" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>)</span>,</li>
                            <li>An electronic board compatible with the LCD screen,</li>
                            <li>A wristband from an old watch,</li>
                            <li>8 electronic wires,</li>
                            <li>A USB key,</li>
                            <li>4 small screws of 2 mm diameter <span className="italic">(optional)</span>.</li>
                        </ul>
                    </div>
                    <Figure src={`${B}/sketching.jpg`} alt="Sketching the watch design while wearing a prototype" />
                </section>

                {/* Tutorial */}
                <section className="space-y-12">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Tutorial</h2>
                    <p>This project has three steps: 1. LCD programming, 2. Case 3D printing, and 3. Smartwatch assembly.</p>

                    {/* 1. LCD programming */}
                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">1. LCD programming</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <p>
                                The WaveShare 1.28" round LCD module embeds a <span className="font-medium text-primary">GC9A01 driver</span> and supports Raspberry Pi, Arduino, and STM32 boards. It uses the <span className="font-medium text-primary">Serial Peripheral Interface (SPI)</span> — a synchronous serial bus for short-distance communication, mostly in embedded systems. The GC9A01 datasheet is available <a href="https://www.waveshare.com/w/upload/5/5e/GC9A01A.pdf" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>.
                            </p>
                            <Figure src={`${B}/lcd-module.jpg`} alt="1.28-inch round LCD module" caption="1.28″ round LCD module with the GC9A01 driver." />
                        </div>

                        {/* 1.1 Hardware connexion */}
                        <div className="space-y-5">
                            <h4 className="font-medium text-primary">1.1. Hardware connection</h4>
                            <p>Wire the LCD according to your board:</p>
                            <div className="overflow-x-auto border border-border-subtle">
                                <table className="w-full text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-cream/40 text-left [&_th]:px-3 [&_th]:py-2 [&_th]:font-normal">
                                            <th>LCD pin</th>
                                            <th>Description</th>
                                            <th>Arduino UNO</th>
                                            <th>STM32</th>
                                            <th>RPi (BCM2835)</th>
                                            <th>RPi (Board)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_td]:px-3 [&_td]:py-1.5 [&_tr]:border-t [&_tr]:border-border-subtle [&_td:first-child]:font-mono [&_td:first-child]:text-secondary">
                                        <tr><td>VCC</td><td>3.3V/5V power input</td><td>5V/3.3V</td><td>3.3V/5V</td><td>3.3V</td><td>3.3V</td></tr>
                                        <tr><td>GND</td><td>Ground</td><td>GND</td><td>GND</td><td>GND</td><td>GND</td></tr>
                                        <tr><td>DIN</td><td>SPI data input</td><td>D11</td><td>PA7</td><td>MOSI</td><td>19</td></tr>
                                        <tr><td>CLK</td><td>SPI clock input</td><td>D13</td><td>PA5</td><td>SCLK</td><td>23</td></tr>
                                        <tr><td>CS</td><td>Chip selection, low active</td><td>D10</td><td>PB6</td><td>CE0</td><td>24</td></tr>
                                        <tr><td>DC</td><td>Data/Command control</td><td>D7</td><td>PA8</td><td>25</td><td>22</td></tr>
                                        <tr><td>RST</td><td>Reset</td><td>D8</td><td>PA9</td><td>27</td><td>13</td></tr>
                                        <tr><td>BL</td><td>Backlight</td><td>D9</td><td>PC7</td><td>18</td><td>12</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
                                <Figure src={`${B}/arduino-wiring.jpg`} alt="LCD wired to an Arduino Uno" caption="Wiring the LCD to an Arduino Uno." />
                                <Figure src={`${B}/wiring-color-code.png`} alt="Color code of the LCD wiring" caption="LCD wiring color code." />
                            </div>
                        </div>

                        {/* 1.2 Software configuration */}
                        <div className="space-y-5">
                            <h4 className="font-medium text-primary">1.2. Software configuration</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                <div className="space-y-5">
                                    <p>
                                        <span className="font-medium text-primary">Install the GFX library.</span> For Arduino, download the ZIP from <a href="https://github.com/moononournation/Arduino_GFX" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">GitHub</a> (green "Code" button → "Download ZIP"). In the Arduino IDE, go to Sketch → Include Library → Add .ZIP Library… and select the downloaded ZIP.
                                    </p>
                                    <Note>
                                        <p>A <span className="font-medium">library</span> is a set of functions that simplify programming a device. <code className="font-mono text-xs">#include Libraryname.h</code> makes it available. <span className="font-medium">GFX</span> is a full-featured library for standard IoT drawing.</p>
                                    </Note>
                                    <p>
                                        <span className="font-medium text-primary">Load the clock example.</span> In the IDE: File → Examples → GFX Library for Arduino → Clock.
                                    </p>
                                    <Note>
                                        <p><span className="font-medium">Examples</span> are pre-written codes shipped with a library. The clock example prints a watch dial on the screen.</p>
                                    </Note>
                                    <p>
                                        <span className="font-medium text-primary">Show line numbers.</span> File → Preferences → enable "Display line numbers".
                                    </p>
                                    <Note>
                                        <p><span className="font-medium">Line numbers</span> help locate the lines to edit in the next steps. They are not required for the code to run.</p>
                                    </Note>
                                </div>
                                <div className="space-y-8 md:sticky md:top-24">
                                    <Figure src={`${B}/ide-clock-example.jpg`} alt="Arduino IDE menu showing the Clock example" caption="Loading the Clock example from the GFX library." />
                                    <Figure src={`${B}/gfx-code-edit.png`} alt="Editing the GFX example code" caption="Editing the data bus and display classes." />
                                </div>
                            </div>
                            <div className="space-y-5">
                                <p>
                                    <span className="font-medium text-primary">Set the data bus class.</span> Paste it below line 30, and comment out line 30 by prefixing it with <code className="font-mono text-xs">/*</code>.
                                </p>
                                <Code>{`Arduino_DataBus *bus = new Arduino_SWSPI(7 /* DC */, 10 /* CS */, 13 /* SCK */, 11 /* MOSI */, -1 /* MISO */);`}</Code>
                                <Note>
                                    <p>A <span className="font-medium">data bus</span> is a subsystem that transfers data between two electronic components. It must be defined for the board to communicate with the GC9A01 driver.</p>
                                </Note>
                                <p>
                                    <span className="font-medium text-primary">Set the display class.</span> Paste it below line 33, and comment out line 33.
                                </p>
                                <Code>{`Arduino_GFX *gfx = new Arduino_GC9A01(bus, 7 /* RST */, 0 /* rotation */, true /* IPS */);`}</Code>
                                <Note>
                                    <p>A <span className="font-medium">display class</span> defines a display's features (size, colors, resolution…). The GFX library supports several; the GC9A01 LCD is one of them.</p>
                                </Note>
                                <p><span className="font-medium text-primary">Upload the code.</span></p>
                                <Note>
                                    <p>The screen should print a watch dial. If not, <span className="font-medium">switch the power supply from 3.3V to 5V</span> and upload again.</p>
                                </Note>
                            </div>
                        </div>
                    </div>

                    {/* 2. Case 3D printing */}
                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">2. Case 3D printing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-5">
                                <p>
                                    <span className="font-medium text-primary">Download the STL file</span> <a href="https://s3.dvic.devinci.fr/public/Watch_case.STL" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>.
                                </p>
                                <Note>
                                    <p>An <span className="font-medium">STL file</span> (STereo-Lithography) describes the surface geometry of a 3D object, used for rapid prototyping and computer-aided manufacturing. This one was made from a 3D model of the watch case.</p>
                                </Note>
                                <p><span className="font-medium text-primary">Upload the STL</span> into your 3D slicer software.</p>
                                <Note><p>A slicer cuts a 3D model into successive layers.</p></Note>
                                <p><span className="font-medium text-primary">Set the layer height</span> to 0.10 mm or below.</p>
                                <Note><p>Thinner layers mean higher quality but longer print time.</p></Note>
                                <p><span className="font-medium text-primary">Set the filament and printer.</span> Here, PLA plastic and an Original Prusa MINI.</p>
                                <p><span className="font-medium text-primary">Choose supports everywhere.</span></p>
                                <Note><p><span className="font-medium">Supports</span> hold up certain parts of the piece during printing, depending on its geometry.</p></Note>
                                <p><span className="font-medium text-primary">Slice the piece</span> — one slice per layer.</p>
                                <p><span className="font-medium text-primary">Generate the G-code.</span></p>
                                <Note><p><span className="font-medium">G-code</span> is the programming language for Computer Numerical Control (CNC); it defines the movements the machine performs.</p></Note>
                                <p><span className="font-medium text-primary">Save the G-code</span> on a flash drive (some printers read USB keys, others SD cards), plug it into the printer, and print the case.</p>
                                <p><span className="font-medium text-primary">Carefully remove the supports</span> from the printed piece.</p>
                            </div>
                            <div className="space-y-8 md:sticky md:top-24">
                                <Figure src={`${B}/prusaslicer-settings.png`} alt="Slicing settings in PrusaSlicer" caption="Slicing settings in PrusaSlicer." />
                                <Figure src={`${B}/assembly.jpg`} alt="The printed black case and components" caption="The 3D-printed case ready for assembly." />
                            </div>
                        </div>
                    </div>

                    {/* 3. Smartwatch assembly */}
                    <div className="space-y-5">
                        <h3 className="text-base font-normal text-primary">3. Smartwatch assembly</h3>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                            <li>Insert the LCD screen into the enclosure.</li>
                            <li>Plug the electronic cables into the LCD screen (push the connector with a screwdriver if needed).</li>
                            <li>Optionally, fix the case and screen together with four 2 mm screws.</li>
                            <li>Recover the wristband and the two small iron rods from an old watch (a thin blade helps fold the rod ends).</li>
                            <li>Insert a rod into the case holes provided for it.</li>
                        </ul>
                    </div>
                </section>

                {/* Reproducibility */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Figure src={`${B}/reproducibility.png`} alt="Reproducibility evaluation results" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Reproducibility</h2>
                        <p>
                            An evaluation tested the tutorial's reproducibility. A group of 5 people followed it, all using an Arduino Uno with the Arduino IDE to program the driver and a Prusa Mini with PrusaSlicer to print the case. Four were familiar with electronics, three with 3D printing.
                        </p>
                        <p>
                            <span className="font-medium text-primary">All five completed the tutorial.</span> Rating each step's difficulty, they found the LCD programming part involved minor difficulties on average, while case printing and assembly were straightforward.
                        </p>
                        <p>
                            Participants unanimously found the content educational, and all felt their electronics or 3D-slicing skills had improved — one even wanted to try another DIY wearable tutorial.
                        </p>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Conclusion</h2>
                        <p>
                            This tutorial builds a first smartwatch from scratch as simply as possible, making smartwatch design widely accessible — a first wearable-technology experience for beginners and seasoned makers alike. It has limits, though: the watch does not keep time, and the device is not truly wearable. The <a href="https://open-smartwatch.github.io/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Open Smartwatch Project</a> overcomes these with hardware modules (including the GC9A01), 3D-printable cases, and a custom operating system — though it requires solid electronics and programming knowledge.
                        </p>
                    </div>
                    <Figure src={`${B}/watch-black.jpg`} alt="The finished black smartwatch" />
                </section>

                {/* References */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm text-secondary marker:text-secondary marker:font-mono break-words">
                        <li>Lechner B., Marlowe F., Nester E. &amp; Tults J. Liquid crystal matrix displays. <em>IEEE International Solid-State Circuits Conference</em>, 1969, pp. 52–53. doi:10.1109/ISSCC.1969.1154684</li>
                        <li>Cristaldi D., Pennisi S., Pulvirenti F. <em>Liquid Crystal Display Drivers: Techniques and Circuits</em>. 2009.</li>
                        <li>Castellano J. <em>The History of LCD Development</em>. 2005.</li>
                        <li>Sethi A.K. "Chips" and Displays. In: <em>The Business of Electronics</em>, Palgrave Macmillan, 2013. doi:10.1057/9781137323385_9</li>
                        <li>Dehghani M. Exploring the motivational factors on continuous usage intention of smartwatches among actual users. <em>Behaviour &amp; Information Technology</em>, 2018, 145–158. doi:10.1080/0144929X.2018.1424246</li>
                        <li>Romanski B., et al. Technology Roadmap: Smartwatches. In: <em>Roadmapping Future: Technologies, Products and Services</em>, 2021, pp. 209–223. doi:10.1007/978-3-030-50502-8</li>
                        <li>Chen X., et al. A comparative study of smartphone and smartwatch apps. <em>Proceedings of the 36th Annual ACM Symposium on Applied Computing</em>, 2021, 1484–1493. doi:10.1145/3412841.3442023</li>
                        <li>Mordor Intelligence. <em>Smart Wearable Market — Growth, Trends, Covid-19 Impact, and Forecasts (2022–2027)</em>. 2021.</li>
                    </ol>
                </section>

                <footer className="pt-12 border-t border-border-subtle">
                    <p className="text-sm text-secondary">
                        &copy; Vivien Perrelle &mdash; De Vinci Innovation Center.
                    </p>
                </footer>

            </div>
        </article>
    );
};

export default SmartWatch;
