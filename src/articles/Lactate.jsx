import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const Lactate = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="How to Build a Lactate Biosensor | Vivien Perrelle"
                description="A proof-of-concept of an enzymatic lactate biosensor for monitoring muscular fatigue in athletes."
                url="/blog/lactate"
                image="/lactate/microneedles.jpg"
                type="article"
                article={{ publishedTime: '2023-06-20', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "How to Build a Lactate Biosensor",
                    "datePublished": "2023-06-20",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/lactate/microneedles.jpg",
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
                    A proof-of-concept of an enzymatic lactate biosensor for monitoring muscular fatigue in athletes.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>I published a master thesis on this work. Read it on</span>
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

            <div className="w-full overflow-hidden border border-border-subtle mb-16 bg-white p-4">
                <img src="/lactate/microneedles.jpg" alt="Microneedles module" className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700" />
            </div>

            <div className="text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Context</h2>
                    <p>
                        Biosensors are analytical devices that utilize biological recognition elements to detect and quantify target molecules. The first biosensor was developed in the 1960s by Clark and Lyons, who measured blood glucose levels for the first time. Since then, biosensors have undergone significant advancements and have been widely used in various applications, including healthcare, food safety, environmental monitoring, and drug discovery.
                    </p>
                    <p>
                        After glucose, lactate is a biomarker on the way to being effectively monitored in the coming years. Human in vivo studies have demonstrated conspicuous concomitances between muscle lactate and muscle fatigue. Lactate monitoring can help professional sportives to select adequate exercise according to their performances.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Skills &amp; Opportunities</h2>
                    <p>
                        The research within the biosensing field requires a multidisciplinary approach that involves different branches of science such as chemistry, biology, and engineering.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                        <li>Electrochemistry: the study of the relationship between electricity and chemical reactions.</li>
                        <li>Electronic programming using the LMP91000 analog front-end development board.</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Requirements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary text-sm">
                            <li>Basic chemical knowledge</li>
                            <li>Notions in C++</li>
                            <li>An LMP91000 AFE from Texas Instruments</li>
                            <li>Lactate Oxidase (LOx)</li>
                            <li>PolyPyrrol (PPy)</li>
                            <li>Sodium Dodecyl Sulfate (SDS)</li>
                        </ul>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary text-sm">
                            <li>A coil of pure platinum wire</li>
                            <li>Lactic acid solution</li>
                            <li>Phosphate Buffer Saline (PBS)</li>
                            <li>Magnetic stirrer</li>
                            <li>A 1ml electronic micropipette</li>
                            <li>Crocodile clips &amp; iron wires</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Biosensor Principles</h2>

                    <h3 className="text-lg font-normal text-primary pt-4">Immobilization Matrix</h3>
                    <p>
                        Biosensor functionalization consists of immobilizing the enzyme on a transducer surface. The four main immobilization methods are (1) non-covalent adsorption and deposition, (2) physical entrapment, (3) covalent attachment, and (4) bio-conjugation. This tutorial involves physical entrapment, which consists of the enzyme inclusion in a polymer network.
                    </p>

                    <h3 className="text-lg font-normal text-primary pt-4">Enzyme</h3>
                    <p>
                        In fabricating L-lactate biosensors, the most commonly used biological recognition elements are lactate dehydrogenase (LDH) and lactate oxidase (LOx). The enzyme catalyzes lactate oxidation to pyruvate in dissolved oxygen and forms hydrogen peroxide. Hydrogen peroxide is electrochemically active and can be either reduced or oxidized to give a current proportional to the lactate concentration.
                    </p>

                    <h3 className="text-lg font-normal text-primary pt-4">Membrane</h3>
                    <p>
                        The outer membrane selector filters out interferents and regulates the concentration of the target molecule. This tutorial does not deal with membrane design since its functions are not necessary for in vitro testing.
                    </p>
                </section>

                <section className="space-y-8">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Tutorial</h2>

                    <div className="space-y-6">
                        <h3 className="text-lg font-normal text-primary">1. Biosensor Functionalization</h3>
                        <ol className="list-decimal pl-6 space-y-3 marker:text-secondary marker:font-mono">
                            <li><span className="font-medium">Prepare the platinum wire:</span> Cut the platinum wire to a 5-centimeter length. Platinum offers high catalytic activity, electrical conductivity, and biocompatibility.</li>
                            <li><span className="font-medium">Prepare the PBS solution:</span> Dilute PBS powder in 1 liter of distilled water. Fill a wash bottle.</li>
                            <li><span className="font-medium">Clean the platinum wire:</span> Dissolve 0.8g of solid soda in 100ml of distilled water. Leave wires immersed for 10 minutes. Clean with ethanol and dry at room temperature.</li>
                            <li><span className="font-medium">Prepare the polypyrrole solution:</span> Weigh 0.4g of PPy powder in 20mL acetone, stir 30 minutes. Add 80mL distilled water, stir 30 minutes more.</li>
                            <li><span className="font-medium">Dip-coat with PPy:</span> Dip the cleaned platinum wire into the PPy solution at approximately 2 cm/min for 2 minutes. Dry at 60 degrees C for 30 minutes.</li>
                            <li><span className="font-medium">Prepare functionalization solution:</span> Pour 2 microliters of LOx in a 2ml Eppendorf tube with 2ml of PBS. Shake vigorously.</li>
                            <li><span className="font-medium">Immobilize lactate oxidase:</span> Pour 0.2ml of the functionalization solution onto the PPy-coated wire. Leave 6-12 hours at room temperature.</li>
                            <li><span className="font-medium">Wash:</span> Remove the wire and wash with PBS.</li>
                        </ol>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-normal text-primary">2. LMP91000 Programming</h3>
                        <p>
                            Electrochemical biosensor tests require a potentiostat. The LMP91000 applies the oxidation potential (+650mV for lactate) to the working electrode. The resulting current is proportional to the lactate concentration.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="border border-border-subtle p-2 bg-white">
                                <img src="/lactate/lmp91000-scheme.jpg" alt="LMP91000 simplified schematic" loading="lazy" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <ol className="list-decimal pl-6 space-y-3 marker:text-secondary marker:font-mono">
                                <li><span className="font-medium">Prepare the electrodes:</span> Solder three wires to the CE, WE and RE.</li>
                                <li><span className="font-medium">Wiring:</span> Connect 3V3, GND, SDA and CLK between the LMP and the WeMos. Connect Vout to pin A0.</li>
                                <li><span className="font-medium">Download the code:</span> From the <a href="https://github.com/DeVinci-Innovation-Center/BioWatch/tree/main/embedded_sensors/lmp91000/software" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">BioWatch GitHub</a>. Run the chronoamperometry code.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-normal text-primary">3. Experimentation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <ol className="list-decimal pl-6 space-y-3 marker:text-secondary marker:font-mono">
                                <li><span className="font-medium">Connect the electrodes:</span> Connect the functionalized platinum wire to the working electrode with an alligator clip.</li>
                                <li><span className="font-medium">Setup the electrochemical cell:</span> Fill a beaker with 400ml of PBS. Shake constantly with a magnetic stirrer.</li>
                                <li><span className="font-medium">Place the electrodes:</span> Insert the wires, start the chronoamperometry code. Wait 3600 seconds.</li>
                                <li><span className="font-medium">Inject lactate:</span> Add 160 microliters of lactic acid for a 4mM solution. Repeat 4 times every 5 minutes until 20mM.</li>
                                <li><span className="font-medium">Exploit the results:</span> Export data and draw a graph of the inputs versus time.</li>
                            </ol>
                            <div className="border border-border-subtle p-2 bg-white">
                                <img src="/lactate/setup-top-view.jpg" alt="Experiment setup top view" loading="lazy" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Results</h2>
                    <div className="border border-border-subtle p-2 bg-white">
                        <img src="/lactate/experiments-results.jpg" alt="Experiment results" loading="lazy" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Conclusion</h2>
                    <p>
                        This tutorial proposes to design a simple lactate biosensor from scratch. It involves the most accessible facilities possible. The biosensors manufactured and tested show poor performance. One possible interpretation is that the non-optimized wiring allows for strong signal perturbations. Future work will involve testing these with a commercial potentiostat. In addition, the platinum wire could be replaced by micro-needles painted with platinum paste. These micro-needles could then be integrated into the <Link to="/blog/biowatch" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">BioWatch</Link>.
                    </p>
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
