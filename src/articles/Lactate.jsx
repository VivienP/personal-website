import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const B = '/build-lactate-biosensor';

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

// Tip / "did you know" callout, mirroring the Notion asides.
const Note = ({ children }) => (
    <aside className="border-l-2 border-accent/60 bg-cream/40 pl-4 py-3 pr-4 text-sm text-secondary space-y-2">
        {children}
    </aside>
);

const Lactate = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="How to Build a Lactate Biosensor | Vivien Perrelle"
                description="A step-by-step tutorial to build a proof-of-concept enzymatic lactate biosensor on a platinum wire, for monitoring exercise-induced muscle fatigue."
                url="/blog/lactate"
                image={`${B}/microneedles-gold.jpg`}
                type="article"
                article={{ publishedTime: '2023-02-04', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "How to Build a Lactate Biosensor",
                    "datePublished": "2023-02-04",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": `https://vivienperrelle.com${B}/microneedles-gold.jpg`,
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/lactate"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Tutorial</span>
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    How to Build a Lactate Biosensor?
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    An enzymatic biosensor on a platinum wire.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-secondary/80 italic font-light">
                    <span>I wrote a research article titled <em>"Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring"</em> related to this work. Read it on</span>
                    <a
                        href="https://www.researchgate.net/publication/375229419_Exploring_Activity-Induced_Lactate_Pharmacokinetics_Implications_for_Minimally-Invasive_Monitoring"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors inline-flex items-center space-x-1 whitespace-nowrap"
                    >
                        <span>ResearchGate</span>
                        <ExternalLink size={12} />
                    </a>
                </div>
            </header>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                {/* Lead */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-base font-normal text-primary">
                            Biosensors are a new type of sensor that detects specific substances, enabling highly sensitive and selective detection of analytes such as glucose, lactate, and cholesterol. As a promising healthcare technology, they offer real-time, non-invasive monitoring — of blood glucose, for instance — and the resulting wearable data helps health and sports professionals build accurate treatment plans and preventive prescriptions. This tutorial walks through building a proof-of-concept enzymatic lactate biosensor, a promising way to monitor muscle fatigue in athletes.
                        </p>
                        <div className="flex pt-2">
                            <a href="https://github.com/DeVinci-Innovation-Center/BioWatch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                                <span>View on GitHub</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    <Figure
                        src={`${B}/microneedles-gold.jpg`}
                        alt="Microneedle array on the skin"
                        caption={<>Image from<Ref n="1" href="https://www.genengnews.com/news/novel-microneedle-patch-on-the-skin-can-test-for-biomarkers/" /></>}
                    />
                </section>

                {/* Context */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Figure src={`${B}/context-illustration.jpg`} alt="Smartwatch display illustration" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Context</h2>
                        <p>
                            Biosensors are analytical devices that use biological recognition elements to detect and quantify target molecules. The first one was developed in the 1960s by Clark and Lyons, who measured blood glucose for the first time<Ref n="2" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3292132/" />. Since then, biosensors have advanced considerably and spread across healthcare, food safety, environmental monitoring, and drug discovery<Ref n="3" href="https://www.intechopen.com/chapters/76543" />.
                        </p>
                        <p>
                            After glucose, lactate is the next biomarker likely to be monitored effectively in the coming years. In vivo human studies show clear links between muscle lactate and muscle fatigue<Ref n="4" href="https://link.springer.com/article/10.2165/00007256-200636040-00001" /><Ref n="5" href="https://www.cairn.info/revue-movement-and-sport-sciences-2010-2-page-21.htm" />, and muscle lactate is a well-known marker of exercise-induced fatigue<Ref n="6" href="https://pubmed.ncbi.nlm.nih.gov/23136874/" /><Ref n="7" href="https://www.nature.com/articles/emm2017194" />. Developing non- or minimally-invasive biosensors for continuous lactate monitoring has recently drawn strong interest in wellness and sports<Ref n="8" href="https://www.mdpi.com/1424-8220/22/4/1468" />, since lactate tracking helps athletes tailor their training to their performance<Ref n="9" href="https://pubmed.ncbi.nlm.nih.gov/8883213/" /><Ref n="10" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2769631/" />.
                        </p>
                    </div>
                </section>

                {/* Skills & Opportunities */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Skills &amp; Opportunities</h2>
                        <p>
                            Biosensing research is multidisciplinary, spanning chemistry, biology, and engineering. This tutorial teaches two main skills.
                        </p>
                        <p>
                            The first is <span className="font-medium text-primary">electrochemistry</span> — the study of the relationship between electricity and chemical reactions. The goal here is to measure an electrical signal that mirrors a chemical reaction, while picking up general lab techniques along the way.
                        </p>
                        <p>
                            The second is <span className="font-medium text-primary">electronic programming</span>. The tutorial uses a programmable analog front-end (AFE) board, the LMP91000, which provides a complete signal path between a sensor and a microcontroller and outputs a voltage proportional to the cell current — a first hands-on approach to an engineering development board.
                        </p>
                    </div>
                    <Figure src={`${B}/setup-experiment.jpg`} alt="Experiment bench with stirrer, reagents and a laptop" />
                </section>

                {/* Requirements */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <Figure src={`${B}/lox-molecule.jpg`} alt="Representation of the lactate oxidase molecule" caption="Representation of the lactate oxidase molecule." />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Requirements</h2>
                        <p>This project requires the following:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary text-sm columns-1 md:columns-2 gap-x-8">
                            <li>Basic chemical knowledge</li>
                            <li>Notions in C++</li>
                            <li>An <a href="https://www.mouser.fr/ProductDetail/595-LMP91000EVMNPB" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">LMP91000 AFE from Texas Instruments</a></li>
                            <li>Lactate Oxidase (LOx)</li>
                            <li><a href="https://www.sigmaaldrich.com/FR/fr/substance/polypyrrole1234530604810" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">PolyPyrrol (PPy)</a></li>
                            <li>Sodium Dodecyl Sulfate (SDS) — optional</li>
                            <li>A coil of pure platinum wire</li>
                            <li>Lactic acid solution</li>
                            <li>Phosphate Buffer Saline (PBS)</li>
                            <li>Soda</li>
                            <li>A magnetic stirrer</li>
                            <li>A 1 ml electronic micropipette</li>
                            <li>A wash bottle</li>
                            <li>A 2 ml Eppendorf tube</li>
                            <li>One 500 ml beaker</li>
                            <li>Crocodile clips</li>
                            <li>Iron wires for electronics</li>
                        </ul>
                    </div>
                </section>

                {/* Biosensor Principles */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Biosensor Principles</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-base font-normal text-primary">Immobilization Matrix</h3>
                                <p>
                                    Functionalizing a biosensor means immobilizing the enzyme on a transducer surface<Ref n="11" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6337536/" />. The four main methods are (1) non-covalent adsorption and deposition, (2) physical entrapment, (3) covalent attachment, and (4) bio-conjugation. This tutorial uses physical entrapment — including the enzyme within a polymer network<Ref n="12" href="https://pubmed.ncbi.nlm.nih.gov/24432134/" />.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-base font-normal text-primary">Enzyme</h3>
                                <p>
                                    The most common recognition elements for L-lactate biosensors are lactate dehydrogenase (LDH) and lactate oxidase (LOx)<Ref n="13" href="https://www.sciencedirect.com/science/article/pii/S2405580815001302" />. The enzyme catalyzes the oxidation of lactate into pyruvate in dissolved oxygen, producing hydrogen peroxide. Being electrochemically active, the hydrogen peroxide can be reduced or oxidized to yield a current proportional to the lactate concentration<Ref n="14" href="https://pubmed.ncbi.nlm.nih.gov/8311937/" />. Both enzymes involve simple reactions and allow for a fairly simple sensor design<Ref n="15" href="https://pubmed.ncbi.nlm.nih.gov/28955805/" />; this tutorial uses LOx for its lower cost.
                                </p>
                            </div>
                        </div>
                        <Figure src={`${B}/immobilization-methods.jpg`} alt="Diagrams of enzyme immobilization methods" caption={<>Some methods used for enzyme immobilization. From<Ref n="12" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3787205/" />.</>} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Figure src={`${B}/biosensor-principles.gif`} alt="Animated illustration of the biosensor working principle through the skin" />
                        <div className="space-y-4 order-first md:order-last">
                            <h3 className="text-base font-normal text-primary">Membrane</h3>
                            <p>The outer selector membrane has two roles:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                                <li>filtering out interferents — biomolecules that could interact with the enzyme and distort the signal;</li>
                                <li>regulating the concentration of the target molecule reaching the enzyme, so the biosensor does not run short of oxygen and saturate<Ref n="16" href="https://pubmed.ncbi.nlm.nih.gov/1472593/" />.</li>
                            </ul>
                            <p>
                                This tutorial skips membrane design: its two functions are not required for in vitro testing, and the membrane also tends to reduce the biosensor's sensitivity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tutorial */}
                <section className="space-y-12">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Tutorial</h2>

                    {/* 1. Functionalization */}
                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">1. Biosensor Functionalization</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-5">
                                <p><span className="font-medium text-primary">1.1. Prepare the platinum wire.</span> Cut the platinum wire to a 5-centimeter length.</p>
                                <Note>
                                    <p>Platinum is widely used in biosensors for its properties:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><span className="font-medium">High catalytic activity</span> — it speeds up the chemical reactions.</li>
                                        <li><span className="font-medium">High electrical conductivity.</span></li>
                                        <li><span className="font-medium">Biocompatibility</span> — non-toxic to living cells, essential for wearables<Ref n="17" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8128108/" />.</li>
                                    </ul>
                                    <p>Other metals used in biosensors include gold, palladium, rhodium, ruthenium, and copper<Ref n="18" href="https://doi.org/10.1016/j.talanta.2006.09.013" />.</p>
                                </Note>
                                <p><span className="font-medium text-primary">1.2. Prepare the PBS solution.</span> Dilute PBS powder in 1 liter of distilled water and fill a wash bottle with it.</p>
                                <Note>
                                    <p>In biological research, PBS is used as a buffer because its ion concentration and osmolality are close to those of the human body.</p>
                                </Note>
                            </div>
                            <div className="space-y-8">
                                <Figure src={`${B}/cleaning-coating-functionalization.jpg`} alt="Cleaning, dip coating and functionalization stages of the platinum wire" />
                                <Figure src={`${B}/dip-coating-process.jpg`} alt="Stages of the dip coating process" caption={<>Stages of the dip coating process. From<Ref n="22" href="https://www.scientific.net/KEM.333.39" />.</>} />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <p><span className="font-medium text-primary">1.3. Clean the platinum wire.</span> Dissolve 0.8 g of solid soda in a 100 ml beaker of distilled water with a stirrer. Leave the wires in the soda solution for 10 minutes, remove them, clean thoroughly with ethanol, and dry at room temperature.</p>
                            <Note>
                                <p>Chemical cleaning removes contaminants and impurities from the platinum surface. Soda strips organic contaminants; nitric or hydrochloric acid can be used too.</p>
                            </Note>
                            <p><span className="font-medium text-primary">1.4. Prepare the polypyrrole solution.</span> Weigh 0.4 g of PPy powder into a beaker with 20 ml of acetone. Stir for 30 minutes at room temperature until fully dissolved, then add 80 ml of distilled water and stir for 30 more minutes to obtain a homogeneous PPy solution.</p>
                            <Note>
                                <p>PPy is one of the most widely used conducting polymers for bioanalytical sensors<Ref n="19" href="https://doi.org/10.1016/j.trac.2017.10.009" />.</p>
                            </Note>
                            <p><span className="font-medium text-primary">1.5. Dip-coat the platinum wire with PPy.</span> Dip the cleaned wire into the PPy solution and withdraw it slowly at about 2 cm/min for 2 minutes (use a stopwatch and ruler if you have no dip coater, or leave it immersed motionless). Dry the wire at 60&nbsp;°C in an oven for 30 minutes.</p>
                            <Note>
                                <p>Dip coating immobilizes biomolecules such as enzymes or antibodies onto a surface by immersing a substrate into a coating solution<Ref n="20" href="https://www.researchgate.net/publication/221913481_Sol-gel_technology_in_enzymatic_electrochemical_biosensors_for_clinical_analysis" /><Ref n="21" href="https://www.ossila.com/en-eu/pages/dip-coating" />.</p>
                            </Note>
                            <p><span className="font-medium text-primary">1.6. Prepare the functionalization solution.</span> Pour 2 µl of LOx into a 2 ml Eppendorf tube with 2 ml of PBS using a micropipette. Close and shake vigorously to homogenize.</p>
                            <p><span className="font-medium text-primary">1.7. Immobilize lactate oxidase by entrapment.</span> Pour 0.2 ml of the functionalization solution onto the last 2 cm of the PPy-coated wire to immerse it. Leave for 6–12 hours at room temperature; the enzyme becomes entrapped within the PPy layer.</p>
                            <p><span className="font-medium text-primary">1.8. Wash the immobilized wire.</span> Remove the wire from the LOx solution and rinse it with PBS.</p>
                        </div>

                        <Figure src={`${B}/lox-platinum-wire-closeup.jpg`} alt="Close-up of the lactate oxidase functionalized platinum wire" />
                    </div>

                    {/* 2. LMP91000 Programming */}
                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">2. LMP91000 Programming</h3>
                        <p>
                            Electrochemical biosensor tests require a <em>potentiostat</em> — an electronic circuit that applies a potential to a working electrode (WE)<Ref n="23" href="https://www.palmsens.com/knowledgebase-topic/potentiostat/" />. By applying the molecule's oxidation potential (+650 mV for lactate), the enzyme catalyzes its oxidation, producing one or more electrons. The resulting current flows through the WE to the circuitry and a counter electrode (CE), where op-amps amplify it to the microampere range. <em>Chronoamperometry</em> (CA) applies a fixed potential at the WE and measures current over time<Ref n="24" href="https://www.zimmerpeacocktech.com/knowledge-base/faq/electro-analytical-techniques/" />, usually needing about an hour of calibration until the WE–CE potential stabilizes. The current is proportional to the lactate concentration at the WE surface. The LMP91000 is a popular potentiostat board for micro-power electrochemical sensing<Ref n="25" href="https://eu.mouser.com/new/texas-instruments/ti-national-lmp91000/" />.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-5">
                                <p><span className="font-medium text-primary">2.1. Prepare the electrodes.</span> Solder three wires to the CE, WE, and RE.</p>
                                <p><span className="font-medium text-primary">2.2. Wiring.</span> Connect 3V3, GND, SDA, and CLK between the LMP and the WeMos. Using an alligator clip, connect the LMP's Vout pin to the WeMos's A0 pin.</p>
                                <p><span className="font-medium text-primary">2.3. Download the code.</span> Get the code from the <a href="https://github.com/DeVinci-Innovation-Center/BioWatch/tree/main/embedded_sensors/lmp91000/software" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">BioWatch GitHub</a>, run the chronoamperometry code, and check with a potentiometer that the board works.</p>
                                <Note>
                                    <p>The code runs in three-electrode mode. The gain is set to 128 kΩ, Rload to 10 Ω, and the bias to 20% of Vref<Ref n="26" href="https://www.zimmerpeacocktech.com/knowledge-base/faq/lmp91000/" />.</p>
                                </Note>
                                <div className="space-y-2">
                                    <div className="overflow-x-auto border border-border-subtle">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-cream/40 text-left">
                                                    <th className="px-3 py-2 font-mono font-normal text-secondary">#</th>
                                                    <th className="px-3 py-2 font-normal">Top Pins</th>
                                                    <th className="px-3 py-2 font-mono font-normal text-secondary">#</th>
                                                    <th className="px-3 py-2 font-normal">Bottom Pins</th>
                                                </tr>
                                            </thead>
                                            <tbody className="[&_td]:px-3 [&_td]:py-1.5 [&_tr]:border-t [&_tr]:border-border-subtle">
                                                <tr><td className="font-mono text-secondary">15</td><td></td><td className="font-mono text-secondary">16</td><td>SCS2</td></tr>
                                                <tr><td className="font-mono text-secondary">13</td><td>GPSI 3.3V</td><td className="font-mono text-secondary">14</td><td>GPSI 5V</td></tr>
                                                <tr><td className="font-mono text-secondary">11</td><td>SDA</td><td className="font-mono text-secondary">12</td><td>SCL</td></tr>
                                                <tr><td className="font-mono text-secondary">9</td><td>CLK</td><td className="font-mono text-secondary">10</td><td>GND</td></tr>
                                                <tr><td className="font-mono text-secondary">7</td><td>MOSI</td><td className="font-mono text-secondary">8</td><td>MEMB INT</td></tr>
                                                <tr><td className="font-mono text-secondary">5</td><td>MISO</td><td className="font-mono text-secondary">6</td><td>DEV INT</td></tr>
                                                <tr><td className="font-mono text-secondary">3</td><td>SCK</td><td className="font-mono text-secondary">4</td><td>GND</td></tr>
                                                <tr><td className="font-mono text-secondary">1</td><td>SCS1</td><td className="font-mono text-secondary">2</td><td>GND</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-sm text-secondary italic">LMP91000 pinout.</p>
                                </div>
                            </div>
                            <div className="space-y-8 md:sticky md:top-24">
                                <Figure src={`${B}/lmp91000-board.jpg`} alt="LMP91000 development board" />
                                <Figure src={`${B}/lmp91000-scheme.jpg`} alt="Simplified application schematic of the LMP91000" caption={<>Simplified application schematic of the LMP91000. From<Ref n="25" href="https://www.mouser.fr/new/texas-instruments/ti-national-lmp91000/" />.</>} />
                            </div>
                        </div>
                    </div>

                    {/* 3. Experimentation */}
                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">3. Experimentation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-5">
                                <p><span className="font-medium text-primary">3.1. Connect the electrodes.</span> Connect the functionalized platinum wire to the WE of the LMP91000 with an alligator clip. Cut and connect two more platinum wires to the CE and RE the same way, then check the connections with a voltmeter.</p>
                                <p><span className="font-medium text-primary">3.2. Set up the electrochemical cell.</span> Fill a clean beaker with 400 ml of PBS and stir it constantly at medium speed with a magnetic stirrer.</p>
                                <p><span className="font-medium text-primary">3.3. Place the electrodes.</span> Insert the platinum wires into the cell and start the chronoamperometry code. Check that the values are consistent, then wait 3600 seconds.</p>
                                <p><span className="font-medium text-primary">3.4. Inject lactate.</span> Add 160 µl of lactic acid with a propette to reach a 4 mM solution. Repeat 4 times every 5 minutes, up to 20 mM.</p>
                                <p><span className="font-medium text-primary">3.5. Exploit the results.</span> Copy the data from the console and paste it into a spreadsheet. Split time and current into two columns using the "," separator, and convert full stops into commas.</p>
                                <p><span className="font-medium text-primary">3.6. Characterize the sensor.</span> Plot the inputs against time, identify the injections, and compute the sensor's sensitivity and linearity.</p>
                            </div>
                            <div className="space-y-8">
                                <Figure src={`${B}/Setup-top-view.jpg`} alt="Top view of the experimental setup" />
                                <Figure src={`${B}/experiments-results.jpg`} alt="Chronoamperometry experiment results" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Figure src={`${B}/microneedles-module.jpg`} alt="Microneedles module mounted on the BioWatch" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Conclusion</h2>
                        <p>
                            This tutorial designs a simple lactate biosensor from scratch using the most accessible equipment possible. The sensors built and tested perform poorly, likely because the non-optimized wiring lets in strong signal perturbations. Future work will test them with a commercial potentiostat. The platinum wire could also be replaced by micro-needles coated with platinum paste, which could then be integrated into the <Link to="/projects/biowatch" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">BioWatch</Link>.
                        </p>
                    </div>
                </section>

                {/* References */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm text-secondary marker:text-secondary marker:font-mono break-words">
                        <li>Sterling J. Novel Microneedle Patch on the Skin Can Test for Biomarkers. <em>GEN — Genetic Engineering and Biotechnology News</em>. 2021. <a href="https://www.genengnews.com/news/novel-microneedle-patch-on-the-skin-can-test-for-biomarkers/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Yoo EH, Lee SY. Glucose biosensors: an overview of use in clinical practice. <em>Sensors (Basel)</em>. 2010. doi:10.3390/s100504558</li>
                        <li>Tetyana P, et al. Biosensors: Design, Development and Applications. <em>Nanopores</em>, IntechOpen. 2021. doi:10.5772/intechopen.97576</li>
                        <li>Cairns SP. Lactic Acid and Exercise Performance. <em>Sports Med</em>. 2006. doi:10.2165/00007256-200636040-00001</li>
                        <li>Messonnier L, Dubouchaud H. Le lactate : sa cinétique, son métabolisme… <em>Movement &amp; Sport Sciences</em>. 2010.</li>
                        <li>Finsterer J. Biomarkers of peripheral muscle fatigue during exercise. <em>BMC Musculoskeletal Disorders</em>. 2012. doi:10.1186/1471-2474-13-218</li>
                        <li>Wan JJ, et al. Muscle fatigue: general understanding and treatment. <em>Exp Mol Med</em>. 2017. doi:10.1038/emm.2017.194</li>
                        <li>Chien MN, et al. Continuous Lactate Monitoring System Based on Percutaneous Microneedle Array. <em>Sensors</em>. 2022. doi:10.3390/s22041468</li>
                        <li>Billat LV. Use of blood lactate measurements for prediction of exercise performance. <em>Sports Med</em>. 1996. doi:10.2165/00007256-199622030-00003</li>
                        <li>Goodwin ML, et al. Blood lactate measurements and analysis during exercise. <em>J Diabetes Sci Technol</em>. 2007. doi:10.1177/193229680700100414</li>
                        <li>Nguyen HH, et al. Immobilized Enzymes in Biosensor Applications. <em>Materials (Basel)</em>. 2019. doi:10.3390/ma12010121</li>
                        <li>Homaei AA, et al. Enzyme immobilization: an update. <em>J Chem Biol</em>. 2013. doi:10.1007/s12154-013-0102-9</li>
                        <li>Rathee K, et al. Biosensors based on electrochemical lactate detection: A comprehensive review. <em>Biochem Biophys Rep</em>. 2016. doi:10.1016/j.bbrep.2015.11.010</li>
                        <li>Meyerhoff C, et al. On-line continuous monitoring of blood lactate by a wearable enzymatic amperometric sensor. <em>Biosens Bioelectron</em>. 1993. doi:10.1016/0956-5663(93)80025-k</li>
                        <li>Rathee K, et al. Biosensors based on electrochemical lactate detection: A comprehensive review. <em>Biochem Biophys Rep</em>. 2015. doi:10.1016/j.bbrep.2015.11.010</li>
                        <li>Davies ML, et al. Polymer membranes in clinical sensor applications. I. <em>Biomaterials</em>. 1992. doi:10.1016/0142-9612(92)90147-g</li>
                        <li>Yu H, et al. Recent Progress of Platinum Nanoparticle-Based Electrochemistry Biosensors. <em>Front Chem</em>. 2021. doi:10.3389/fchem.2021.677876</li>
                        <li>Chu X, et al. Amperometric glucose biosensor based on platinum nanoparticles and carbon nanotube electrode. <em>Talanta</em>. 2007. doi:10.1016/j.talanta.2006.09.013</li>
                        <li>Jain R, Jadon N, Pawaiya A. Polypyrrole based next generation electrochemical sensors and biosensors: A review. <em>TrAC Trends in Analytical Chemistry</em>. 2017. doi:10.1016/j.trac.2017.10.009</li>
                        <li>Gabriela P, Bizerea O, Vlad-Oros B. Sol-gel technology in enzymatic electrochemical biosensors for clinical analysis. 2011. doi:10.5772/19622</li>
                        <li>Dip Coating: Practical Guide to Theory and Troubleshooting. <em>Ossila</em>. 2023. <a href="https://www.ossila.com/en-eu/pages/dip-coating" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Sanchez-Herencia AJ. Water Based Colloidal Processing of Ceramic Laminates. <em>Key Engineering Materials</em>. 2007. doi:10.4028/www.scientific.net/kem.333.39</li>
                        <li>Potentiostat: a simple and short explanation. <em>PalmSens</em>. 2023. <a href="https://www.palmsens.com/knowledgebase-topic/potentiostat/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Electro-analytical techniques. <em>Zimmer and Peacock</em>. 2023. <a href="https://www.zimmerpeacocktech.com/knowledge-base/faq/electro-analytical-techniques/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>Mouser Electronics. Potentiostat AFE configurable LMP91000 TI. 2022. <a href="https://eu.mouser.com/new/texas-instruments/ti-national-lmp91000/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
                        <li>LMP91000. <em>Zimmer and Peacock</em>. 2023. <a href="https://www.zimmerpeacocktech.com/knowledge-base/faq/lmp91000/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-2">Link</a></li>
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

export default Lactate;
