import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const B = '/build-glucose-biosensor';

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
                className="w-full h-auto object-contain"
            />
        </div>
        {caption && <figcaption className="text-sm text-secondary italic">{caption}</figcaption>}
    </figure>
);

// Embedded YouTube video with caption, responsive 16:9.
const Video = ({ id, title, caption }) => (
    <figure className="space-y-3">
        <div className="w-full aspect-video border border-border-subtle bg-black">
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0"
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

const GlucoseBiosensor = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="How to Build a Wearable Glucose Biosensor | Vivien Perrelle"
                description="A tutorial to build a wearable, non-invasive glucose biosensor from screen-printed electrodes in a sweat patch, streaming data over Bluetooth Low Energy."
                url="/blog/glucose-biosensor"
                image={`${B}/hero.jpg`}
                type="article"
                article={{ publishedTime: '2022-03-10', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "How to Build a Wearable Glucose Biosensor",
                    "datePublished": "2022-03-10",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": `https://vivienperrelle.com${B}/hero.jpg`,
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/glucose-biosensor"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Tutorial</span>
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    How to Build a Wearable Glucose Biosensor?
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    Screen-printed electrodes in a sweat patch.
                </p>
            </header>

            {/* Hero */}
            <div className="w-full overflow-hidden border border-border-subtle mb-16">
                <img
                    src={`${B}/hero.jpg`}
                    alt="The wearable glucose biosensor patch"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                {/* Context */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Context</h2>
                        <p>
                            Global diabetes prevalence was estimated at 9.3% (460 million people) in 2019, and is projected to reach 10.2% (580 million) by 2030<Ref n="1" href="https://www.who.int/health-topics/diabetes" />. Regular blood glucose monitoring is an essential public-health issue for managing diabetes and other glucose-related chronic illnesses. The first <span className="font-medium text-primary">blood glucose meter (BGM)</span> was marketed in the 90s<Ref n="2" href="/blog/lactate" />; BGMs give an accurate instant reading but cannot track glucose continuously to dose insulin at the right time and amount.
                        </p>
                        <p>
                            <span className="font-medium text-primary">Continuous Glucose Monitoring (CGM)</span> appeared in the 2000s. Requiring no blood samples, it continuously measures glucose in the interstitial fluid (ISF)<Ref n="3" href="https://journals.sagepub.com/doi/10.1177/1932296818771396" />, from which blood glucose is deduced with a pharmacokinetic delay of a few minutes<Ref n="4" href="https://pubmed.ncbi.nlm.nih.gov/30804536/" />. Most CGMs last 7 to 14 days. The three main ones on the market are the FreeStyle Libre™ from Abbott<Ref n="5" href="https://www.freestyle.abbott/us-en/home.html" />, the CGM System™ from Dexcom<Ref n="6" href="https://www.dexcom.com/g6-cgm-system" />, and the Guardian™ Connect System from Medtronic<Ref n="7" href="https://www.medtronicdiabetes.com/treatments/continuous-glucose-monitoring" />.
                        </p>
                        <p>
                            Despite recent advances, commercial CGMs remain painful<Ref n="8" href="https://pubmed.ncbi.nlm.nih.gov/35062598/" />. Minimally- or non-invasive technologies address this. The under-development K'Watch by PKvitality is a minimally-invasive, watch-based CGM<Ref n="9" href="https://www.pkvitality.com/ktrack-glucose/" /> whose micro-needles measure glucose in the dermal ISF, shallower than the nerve endings. It could become the world's first painless CGM — but no fully non-invasive CGM has been announced for commercialization yet.
                        </p>
                    </div>
                    <Figure src={`${B}/kwatch-pkvitality.jpg`} alt="Illustration of the K'Watch from PKvitality" caption="Illustration of the K'Watch from PKvitality." />
                </section>

                {/* Definitions callouts */}
                <div className="space-y-4">
                    <Note>
                        <p>A <span className="font-medium">biosensor</span> is a probe that integrates a biological molecule recognition system with an electronic transducer<Ref n="10" href="https://doi.org/10.1201/9780367810849" />. It produces an electrical signal interpreting a biomarker concentration in a body fluid, and is widely used for medical and lifestyle applications<Ref n="4" href="https://pubmed.ncbi.nlm.nih.gov/30804536/" />.</p>
                    </Note>
                    <Note>
                        <p>A <span className="font-medium">biomarker</span> is a biological molecule that signals a normal or abnormal process or disease condition<Ref n="11" href="https://www.mdpi.com/1424-8220/20/14/4022" />.</p>
                    </Note>
                </div>

                {/* Skills & Opportunities */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Figure src={`${B}/sweat-patch.jpg`} alt="The sweat patch handled with gloves" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Skills &amp; Opportunities</h2>
                        <p>
                            The first skill is <span className="font-medium text-primary">programming a server-client Bluetooth Low Energy (BLE) communication</span>. BLE has shown strong potential in wearables<Ref n="12" href="https://doi.org/10.1146/annurev-anchem-061318-114910" /> and is, with near-field communication (NFC), the most used technology for wireless transmission of analyzed data<Ref n="13" href="https://doi.org/10.1016/j.sna.2019.07.020" />. A DIY data-visualization display could reuse this communication solution.
                        </p>
                        <p>
                            The second skill is <span className="font-medium text-primary">electrochemical biosensing with screen-printed electrodes</span>. This tutorial presents a non-invasive way to measure human glucose in real time, introducing the basics, challenges, and opportunities of molecular biosensing. <span className="font-medium text-primary">Building this biosensor is a first experience of electrochemical on-skin biosensing and wearable technologies.</span>
                        </p>
                    </div>
                </section>

                {/* Requirements */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Requirements</h2>
                        <p>This project involves several prerequisites:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary text-sm">
                            <li>Basic knowledge in Python programming,</li>
                            <li>Basic chemical knowledge,</li>
                            <li>A hybrid ec-Flex for open-circuit measurements (OCP) from Zimmer&amp;Peacock (ZP) <span className="italic">(orderable <a href="https://www.zimmerpeacocktech.com/products/electrochemical-sensors/wearable-biosensors/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>)</span>,</li>
                            <li>A thin Lithium-Polymer battery from ZP <span className="italic">(orderable <a href="https://www.zimmerpeacocktech.com/products/electrochemical-sensors/wearable-biosensors/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>)</span>,</li>
                            <li>A first-generation glucose biosensor from ZP <span className="italic">(orderable <a href="https://www.zimmerpeacocktech.com/products/glucose-sensors/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>)</span>,</li>
                            <li>A sweat patch collector kit from ZP <span className="italic">(orderable <a href="https://www.zimmerpeacocktech.com/products/electrochemical-sensors/sweat-sensor-sweat-patch/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">here</a>)</span>,</li>
                            <li>A soldering station, welding fume extractor, tin coil and flux,</li>
                            <li>A code editor such as Visual Studio Code.</li>
                        </ul>
                    </div>
                    <Figure src={`${B}/ecflex-on-arm.jpg`} alt="The ec-Flex biosensor platform worn on a forearm" />
                </section>

                {/* Analytical chemistry notions */}
                <section className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Figure src={`${B}/screen-printed-electrodes.png`} alt="Illustration of a screen-printed electrodes biosensor" caption="Illustration of a screen-printed electrodes biosensor from Zimmer&Peacock." />
                        <div className="space-y-6 order-first md:order-last">
                            <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Analytical chemistry notions</h2>
                            <p>
                                Zimmer&amp;Peacock develops and manufactures electrochemical biosensors. The ec-Flex is a Bluetooth-enabled wearable biosensor platform<Ref n="14" href="https://www.zimmerpeacocktech.com/products/electrochemical-sensors/wearable-biosensors/" /> that processes and sends the biosensor measurements. The notions below explain how ZP biosensors and the ec-Flex work.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-3">
                            <h3 className="text-base font-normal text-primary">Three-electrode system</h3>
                            <p>
                                The ZP glucose biosensor is a three-electrode system: a working electrode (WE), a counter electrode (CE), and a reference electrode (RE). The reference electrode compensates for potential changes caused by large currents through the WE and CE. The ec-Flex has an integrated potentiostat that measures the WE's Open Circuit Potential (OCP)<Ref n="15" href="https://www.sciencedirect.com/topics/chemistry/open-circuit-potential" />.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-base font-normal text-primary">Screen-printed electrodes</h3>
                            <p>
                                This three-electrode system is screen-printed on a substrate<Ref n="16" href="https://www.zimmerpeacocktech.com/knowledge-base/screen-printed-electrodes-for-biosensing/" /> via thick-film deposition<Ref n="17" href="https://www.youtube.com/watch?v=Sm6sS-yuQgo" />, which makes biosensor production simple, fast, and inexpensive<Ref n="18" href="https://link.springer.com/article/10.1007/s00604-014-1181-1" />. The ZP glucose sensor uses silver/silver chloride for the reference and counter electrodes and platinum for the working electrode<Ref n="19" href="https://www.zimmerpeacocktech.com/products/glucose-sensors/" />.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-base font-normal text-primary">Enzyme-based</h3>
                            <p>
                                An enzyme recognizes and reacts with the target analyte<Ref n="20" href="https://www.azom.com/article.aspx?ArticleID=15019" />. For glucose (C₆H₁₂O₆), that enzyme is glucose oxidase (GOx), immobilized onto the electrochemical interface. It catalyzes glucose oxidation, producing gluconolactone (C₆H₁₀O₆) and hydrogen peroxide (H₂O₂)<Ref n="21" href="https://doi.org/10.1108/sr-01-2019-0017" />. Glucose is then quantified by electrochemically measuring the hydrogen peroxide<Ref n="22" href="https://doi.org/10.3390/s17112620" />. Non-enzymatic biosensors instead use nanomaterials for stability, reproducibility, and simplicity<Ref n="23" href="https://doi.org/10.1016/b978-0-08-102577-2.00007-5" />.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <Figure src={`${B}/glucose-oxidation-reactions.png`} alt="Glucose oxidation and hydrogen peroxide oxidation reactions" caption="Glucose oxidation and hydrogen peroxide oxidation reactions." />
                            <Figure src={`${B}/first-generation-principle.jpg`} alt="Operating principle of an enzyme-based first-generation glucose biosensor" caption={<>Operating principle of an enzyme-based first-generation glucose biosensor. From Rocchitta et al.<Ref n="18" href="https://link.springer.com/article/10.1007/s00604-014-1181-1" /></>} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-3">
                            <h3 className="text-base font-normal text-primary">Amperometry</h3>
                            <p>
                                ZP glucose biosensors are amperometric. The amperometric method can selectively distinguish several electroactive species in solution<Ref n="24" href="https://www.sciencedirect.com/topics/chemistry/amperometric-method" /> through a careful choice of applied potential and electrode material. Amperometric biosensors monitor currents — electrons exchanged between a biological system (the sweat) and an electrode.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-base font-normal text-primary">First-generation</h3>
                            <p>
                                This tutorial targets first-generation glucose biosensors, which measure the concentration of analytes or enzymatic reaction products (H₂O₂ for glucose). Second-generation biosensors use redox mediators, and third-generation ones measure direct electron transfer between the redox-active biomolecule and the electrode surface<Ref n="18" href="https://link.springer.com/article/10.1007/s00604-014-1181-1" />.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tutorial */}
                <section className="space-y-12">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Tutorial</h2>
                    <p>This project has two parts: 1. Hardware assembly, and 2. Data acquisition.</p>
                    <Note>
                        <p>The glucose biosensor and the battery have a short lifetime. If you are unfamiliar with ZP products, it is recommended to start with data acquisition — a low-frequency generator can power the ec-Flex.</p>
                    </Note>

                    {/* 1. Hardware Assembly */}
                    <div className="space-y-8">
                        <h3 className="text-base font-normal text-primary">1. Hardware assembly</h3>

                        {/* 1.1 Battery */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <Video id="NaS_yNDVh0c" title="ZP — Soldering a battery for a wearable biosensor" caption="Soldering the battery to the ec-Flex." />
                            <div className="space-y-5 order-first md:order-last">
                                <h4 className="font-medium text-primary">1.1. Battery</h4>
                                <p className="font-medium text-primary">A welding fume extractor, a mask, and thermal protective gloves are highly recommended to weld the battery to the ec-Flex.</p>
                                <p>
                                    Zimmer&amp;Peacock batteries use Polymer Matrix Electrolyte (PME) technology<Ref n="25" href="https://www.brightvolt.com/our-technology/" />, which makes them flexible and ultra-thin. The battery has an <span className="font-medium text-primary">8-hour lifetime</span>, assuming a 500 ms transmission interval from the ec-Flex<Ref n="26" href="https://www.zimmerpeacocktech.com/products/electrochemical-sensors/wearable-biosensors/" />.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                                    <li><span className="font-medium text-primary">Stick electrical tape</span> on the back of the ec-Flex to cover the exposed contacts and avoid short circuits.</li>
                                    <li><span className="font-medium text-primary">Deposit flux</span> on the ec-Flex pads, dispense solder on them with the iron, then add flux again.</li>
                                    <li><span className="font-medium text-primary">Solder the battery.</span> The positive terminal of the ec-Flex is the pad closest to the corner.</li>
                                    <li><span className="font-medium text-primary">Bend the battery</span> behind the ec-Flex, so it sits against the skin once the ec-Flex is worn.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 1.2 Microfluidic patch */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-5">
                                <h4 className="font-medium text-primary">1.2. Microfluidic patch</h4>
                                <p>The microfluidic patch ensures dynamic sweat circulation in the SPE sensing area.</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                                    <li>The <span className="font-medium text-primary">first layer</span> is the sweat-collecting reservoir. It firmly fixes the patch to the skin — gently insert the SPE.</li>
                                    <li>The <span className="font-medium text-primary">second layer</span> is the micro-channels, conducting sweat from the reservoir to the micro-reservoir. Peel it, place it on the first layer, and remove the thin plastic protection.</li>
                                    <li>The <span className="font-medium text-primary">third layer</span> is the micro-reservoir, controlling the sweat sample volume in the sensing area (up to 15 µl). Place it on the second layer.</li>
                                    <li>The <span className="font-medium text-primary">fourth layer</span> is the outlet, helping sweat circulate from the sensing area to outside the patch. Place it on the third layer.</li>
                                    <li><span className="font-medium text-primary">Plug the SPE biosensor into the ec-Flex.</span> The sensitive area must face the same side as the ec-Flex's electronic components.</li>
                                </ul>
                            </div>
                            <Video id="WCFS0InEbMc" title="Assembling a microfluidic patch for sweat analysis" caption="Assembling the microfluidic sweat patch." />
                        </div>
                    </div>

                    {/* 2. Data acquisition */}
                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">2. Data acquisition</h3>
                        <p>
                            Download the Biosensor-to-smartwatch wireless communication project ZIP from <a href="https://github.com/DeVinci-Innovation-Center/Biosensor-to-smartwatch_wireless_communication" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">GitHub</a>. Extract it and open the project in your code editor, then import the required Python libraries — the <a href="https://pypi.org/project/bleak/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Bleak library</a> is a GATT client.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-5">
                                <h4 className="font-medium text-primary">In the <code className="font-mono text-sm">get_ecflex_charac.py</code> script</h4>
                                <p>This establishes the Bluetooth client-server connection: the ec-Flex is the server, your device the client.</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                                    <li><span className="font-medium text-primary">Enter the MAC address</span> of the ec-Flex on line 13. A packet sniffer like <a href="https://www.microsoft.com/en-us/p/bluetooth-le-explorer/9n0ztkf1qd98" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Bluetooth LE Explorer</a> can recover it.</li>
                                    <li><span className="font-medium text-primary">Run the code</span> — the services print in the terminal.</li>
                                    <li><span className="font-medium text-primary">Note the Vendor service</span> (service 3 – 11661) address on line 14.</li>
                                    <li><span className="font-medium text-primary">Rerun the code</span> — the Vendor service characteristic handles print in the terminal.</li>
                                    <li><span className="font-medium text-primary">Recover handles</span> 17, 21, 24, 27, 30, 96, and 99.</li>
                                </ul>
                                <div className="overflow-x-auto border border-border-subtle">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-cream/40 text-left [&_th]:px-3 [&_th]:py-2 [&_th]:font-normal">
                                                <th className="font-mono text-secondary">Handle</th>
                                                <th>Value</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_td]:px-3 [&_td]:py-1.5 [&_tr]:border-t [&_tr]:border-border-subtle">
                                            <tr><td className="font-mono text-secondary">21</td><td>D0</td><td>ADC resolution</td></tr>
                                            <tr><td className="font-mono text-secondary">24</td><td>N0</td><td>ADC reference voltage</td></tr>
                                            <tr><td className="font-mono text-secondary">27</td><td>X0</td><td>Virtual ground level</td></tr>
                                            <tr><td className="font-mono text-secondary">30</td><td>D1</td><td>Current-to-voltage amplification</td></tr>
                                            <tr><td className="font-mono text-secondary">96</td><td>N1</td><td>Scale factor for current</td></tr>
                                            <tr><td className="font-mono text-secondary">99</td><td>N2</td><td>Scale factor for non-offset linear conversion</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className="font-medium text-primary pt-2">In the <code className="font-mono text-sm">get_ecflex_data.py</code> script</h4>
                                <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                                    <li>Complete the addresses definition block.</li>
                                    <li>Fill in the access paths of the <code className="font-mono text-xs">database.db</code> and <code className="font-mono text-xs">schema.sql</code> files (comment them out if you do not want to save data).</li>
                                    <li>Run the code — an ID, a timer, a temperature, and a glucose concentration value print in the terminal.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <Note>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><span className="font-medium">Generic Attribute Profile (GATT)</span> describes how attributes are transferred between two BLE devices, using characteristics, services, and handles.</li>
                                        <li>A <span className="font-medium">GATT characteristic</span> is a fundamental data element holding an attribute.</li>
                                        <li>A <span className="font-medium">handle</span> is the primary-key identifier for the transferred attribute.</li>
                                        <li>A <span className="font-medium">service</span> is a logical entity grouping one or several characteristics.</li>
                                    </ul>
                                </Note>
                                <Note>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>The server sends sensor data as an <span className="font-medium">eight-element bytes array</span>.</li>
                                        <li>The array from handle 17 holds <span className="font-medium">the sensor value</span>, sent each second (frequency editable on line 104).</li>
                                        <li>Handles 21, 24, 27, 30, 96, 99 are sent only once, at the start of the connection.</li>
                                    </ul>
                                </Note>
                                <Note>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Each array from handle 17 contains four values: an <span className="font-medium">ID</span>, a <span className="font-medium">timer</span>, a <span className="font-medium">temperature</span>, and an <span className="font-medium">Analog-to-Digital Conversion (ADC)</span> value.</li>
                                        <li>The ADC value is the glucose sensor readout, converted into a user-friendly value with these formulas:</li>
                                    </ul>
                                    <Figure src={`${B}/conversion-formulas.png`} alt="Conversion formulas for the glucose sensor readout" className="bg-white" />
                                    <p>Vout: voltage readout · Cg: glucose concentration. See the <a href="https://www.zimmerpeacocktech.com/app/download/11782510898/ecFlex+quick-start+v0.3.pdf?t=1596730497" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">ecFlex quick-start developer guide</a> for more.</p>
                                </Note>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Conclusion</h2>
                        <p>
                            This tutorial offers a <span className="font-medium text-primary">fast-prototyping solution to build a wearable glucose biosensor</span> while raising key biosensing notions — a first experience with wearable biosensors for beginners and seasoned makers. It has limits, though:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                            <li>The battery life limits the sensing period.</li>
                            <li>The wearer must stay within laptop range for the BLE link.</li>
                            <li>The data are only available on the laptop.</li>
                        </ul>
                        <p>
                            The ongoing GitHub project addresses this last point by redirecting the data to a homemade smartwatch — the <Link to="/blog/smartwatch" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">How to Build a SmartWatch</Link> tutorial explains how to build it.
                        </p>
                        <p>
                            Wearable devices providing molecular-level information are still in their infancy<Ref n="26" href="https://doi.org/10.1038/s41928-018-0043-y" />. Their potential affordability and accessibility fuel interest in personalized medicine<Ref n="27" href="https://doi.org/10.1039/c7lc00914c" /><Ref n="28" href="https://doi.org/10.1039/C7CS00730B" />. This tutorial aims to make these technologies more accessible and spark interest in their medical and well-being applications. <span className="font-medium text-primary">Wearable biosensing devices are a potential next frontier of wearable technology for fitness and individual and public-health monitoring<Ref n="29" href="https://doi.org/10.1016/j.nantod.2019.100828" />.</span>
                        </p>
                    </div>
                    <Figure src={`${B}/watch-on-wrist.jpg`} alt="The finished smartwatch worn on a wrist" />
                </section>

                {/* References */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm text-secondary marker:text-secondary marker:font-mono break-words">
                        <li>World Health Organization. Diabetes. Accessed Feb. 2023. <a href="https://www.who.int/health-topics/diabetes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Zafar H, et al. Comprehensive Review on Wearable Sweat-Glucose Sensors for Continuous Glucose Monitoring. <em>Sensors</em>. 2022, 22(2):638.</li>
                        <li>Biermann E. Discrepancies Between Blood Glucose and Interstitial Glucose. <em>J Diabetes Sci Technol</em>. 2018. doi:10.1177/1932296818771396</li>
                        <li>Heikenfeld J, et al. Accessing analytes in biofluids for peripheral biochemical monitoring. <em>Nat Biotechnol</em>. 2019. doi:10.1038/s41587-019-0040-3</li>
                        <li>Continuous Glucose Monitoring System. Abbott FreeStyle. Accessed Jul. 2022. <a href="https://www.freestyle.abbott/us-en/home.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Dexcom G6 Continuous Glucose Monitoring System. Dexcom. 2018. <a href="https://www.dexcom.com/g6-cgm-system" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>What Is CGM? Continuous Glucose Monitoring From Medtronic Diabetes. 2010. <a href="https://www.medtronicdiabetes.com/treatments/continuous-glucose-monitoring" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Zafar H, Channa A, Jeoti V, Stojanović GM. Comprehensive Review on Wearable Sweat-Glucose Sensors for Continuous Glucose Monitoring. <em>Sensors (Basel)</em>. 2022, 22(2):638. doi:10.3390/s22020638</li>
                        <li>K'Watch Glucose. PKVitality. <a href="https://www.pkvitality.com/ktrack-glucose/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Coulet P.R., Blum L.J. <em>Biosensor Principles and Applications</em> (1st ed.). CRC Press. 1991. doi:10.1201/9780367810849</li>
                        <li>Gajdosova V, et al. Electrochemical Nanobiosensors for Detection of Breast Cancer Biomarkers. <em>Sensors</em>. 2020, 20(14):4022. doi:10.3390/s20144022</li>
                        <li>Bandodkar AJ, et al. Wearable Sensors for Biochemical Sweat Analysis. <em>Annu Rev Anal Chem</em>. 2019. doi:10.1146/annurev-anchem-061318-114910</li>
                        <li>Legner C, et al. Sweat sensing in the smart wearables era. <em>Sensors and Actuators A: Physical</em>. 2019. doi:10.1016/j.sna.2019.07.020</li>
                        <li>Support Library. Zimmer&amp;Peacock. Accessed Dec. 2022. <a href="https://www.zimmerpeacocktech.com/products/electrochemical-sensors/wearable-biosensors/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Open Circuit Potential — an overview. ScienceDirect Topics. <a href="https://www.sciencedirect.com/topics/chemistry/open-circuit-potential" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Screen printed electrodes for biosensing. Zimmer&amp;Peacock. 2023. <a href="https://www.zimmerpeacocktech.com/knowledge-base/screen-printed-electrodes-for-biosensing/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Introduction and review on screen printed electrodes (SPE). Zimmer&amp;Peacock, YouTube. <a href="https://www.youtube.com/watch?v=Sm6sS-yuQgo" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Taleat Z, Khoshroo A, Mazloum-Ardakani M. Screen-printed electrodes for biosensing: a review (2008–2013). <em>Microchimica Acta</em>. 2014. doi:10.1007/s00604-014-1181-1</li>
                        <li>Zimmer&amp;Peacock. Glucose Sensor. <a href="https://www.zimmerpeacocktech.com/products/glucose-sensors/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Biosensors — Enzymatic Biosensors in Biotechnology. AZoM. 2018. <a href="https://www.azom.com/article.aspx?ArticleID=15019" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Mandpe P, et al. Glucose oxidase-based biosensor for glucose detection from biological fluids. <em>Sensor Review</em>. 2020. doi:10.1108/sr-01-2019-0017</li>
                        <li>Artigues M, Abellà J, Colominas S. Analytical Parameters of an Amperometric Glucose Biosensor for Fast Analysis in Food Samples. <em>Sensors</em>. 2017. doi:10.3390/s17112620</li>
                        <li>Revathi C, Rajendra Kumar RT. Enzymatic and Nonenzymatic Electrochemical Biosensors. <em>Fundamentals and Sensing Applications of 2D Materials</em>. 2019. doi:10.1016/b978-0-08-102577-2.00007-5</li>
                        <li>Amperometric Method — an overview. ScienceDirect Topics. <a href="https://www.sciencedirect.com/topics/chemistry/amperometric-method" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Our Technology. BrightVolt Solid State Batteries. <a href="https://www.brightvolt.com/our-technology/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Bariya M, Nyein HYY, Javey A. Wearable sweat sensors. <em>Nature Electronics</em>. 2018. doi:10.1038/s41928-018-0043-y</li>
                        <li>Heikenfeld J, et al. Wearable sensors: modalities, challenges, and prospects. <em>Lab on a Chip</em>. 2018. doi:10.1039/c7lc00914c</li>
                        <li>Yang Y, Gao W. Wearable and flexible electronics for continuous molecular monitoring. <em>Chemical Society Reviews</em>. 2019. doi:10.1039/C7CS00730B</li>
                        <li>Dervisevic M, et al. Skin in the diagnostics game: Wearable biosensor nano- and microsystems for medical diagnostics. <em>Nano Today</em>. 2020. doi:10.1016/j.nantod.2019.100828</li>
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

export default GlucoseBiosensor;
