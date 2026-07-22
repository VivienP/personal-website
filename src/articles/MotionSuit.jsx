import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const Cite = ({ n }) => (
    <sup>
        <a
            href={`#ref-${n}`}
            className="text-accent no-underline hover:underline font-mono text-xs align-super"
            aria-label={`Jump to reference ${n}`}
        >
            [{n}]
        </a>
    </sup>
);

const Img = ({ src, alt, className = '' }) => (
    <div className="border border-border-subtle">
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-auto object-contain ${className}`}
        />
    </div>
);

const MotionSuit = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="E-Textile Motion Suit: An Easy-to-Make E-Textile Platform | Vivien Perrelle"
                description="An open-source, easy-to-make e-textile platform whose fully integrated fabric sensors detect touch, position, and deformation to capture a wearer's movements."
                url="/projects/motion-suit"
                image="/catsuit/overview.jpg"
                imageWidth={1024}
                imageHeight={682}
                type="article"
                article={{ publishedTime: '2022-01-01', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "E-Textile Motion Suit: An Easy-to-Make E-Textile Platform",
                    "datePublished": "2022-01-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/catsuit/overview.jpg",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/motion-suit"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Electronics · E-Textile</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    E-Textile Motion Suit
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    An easy-to-make e-textile platform.
                </p>
                <p className="pt-2 text-sm text-secondary/90 italic font-light max-w-2xl">
                    I worked on this project during the first year of my Creative Technology master's degree, alongside two senior and PhD students, Marie Julou and Madalina Nicolae. Building the sensors taught me the basics of electronics.
                </p>
            </header>

            {/* YouTube — full width */}
            <div className="w-full aspect-video border border-border-subtle mb-8 bg-black">
                <iframe
                    src="https://www.youtube.com/embed/dWftbfxybh0"
                    title="E-Textile Motion Suit — motion capture through e-textile"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                />
            </div>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                {/* Lead statement */}
                <section className="space-y-6">
                    <p className="text-base font-normal text-primary">
                        The E-Textile Motion Suit is an easy-to-make e-textile platform. Fully integrated fabric sensors detect touch, position, and mesh deformation to capture the wearer's movements. Through playful applications, the project aims to make e-textile technology more accessible to non-professionals.
                    </p>
                    <div className="flex pt-2">
                        <a href="https://github.com/MarieJulou/CatSuit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                            <span>View on GitHub</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </section>

                {/* What are e-textiles? */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <Img src="/catsuit/what-is-e-textiles.jpg" alt="Close-up of the e-textile garment with embroidered sensors and electronics" className="md:sticky md:top-24" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What are e-textiles?</h2>
                        <p>
                            Smart textiles, electronic textiles, or e-textiles are fabrics infused with electronic components and functionality<Cite n={1} />. Their main applications are:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                            <li><span className="font-medium text-primary">Health and wellness</span>: monitoring vital signs, tracking physical activity, and detecting changes in the body;</li>
                            <li><span className="font-medium text-primary">Sports and fitness</span>: tracking athletes' performance and giving feedback on technique;</li>
                            <li><span className="font-medium text-primary">Fashion</span>: interactive, responsive clothing for new forms of self-expression and personalization<Cite n={2} />.</li>
                        </ul>
                        <p>Three generations of e-textiles have gradually emerged:</p>
                        <ol className="list-decimal pl-6 space-y-2 marker:text-secondary marker:font-mono">
                            <li><span className="font-medium text-primary">Passive e-textiles</span>: simple conductive fabrics enabling basic functions such as sensors and switches.</li>
                            <li><span className="font-medium text-primary">Active e-textiles</span>: fabrics with components like LEDs, batteries, and microcontrollers, used to make garments that light up, change color, or react to their environment.</li>
                            <li><span className="font-medium text-primary">Functional e-textiles</span>: still in development, capable of advanced functions such as biometric monitoring, energy harvesting, and data communication<Cite n={3} />.</li>
                        </ol>
                        <p>
                            Despite this progress, e-textiles remain hard to reach for non-experts. Cost, comfort, durability, and the lack of learning platforms are still real barriers. Today the most accessible form of non-commercial e-textile lives in the cosplay and DIY community. Through collaboration, education, and standardization, e-textiles could become far more practical for students and beginners.
                        </p>
                    </div>
                </section>

                {/* Project Presentation */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Project presentation</h2>
                        <p>
                            The project focuses on making the first and second generations of e-textiles accessible to the general public through fast-prototyping practices. Building the sensors and displays only requires basic sewing and electronics skills, both approachable for beginners.
                        </p>
                        <p>
                            The electronic parts are off-the-shelf components from Adafruit, commonly used in cosplay; the boards are popular in DIY projects; and the sewing materials are available in specialized shops. The suit gives a hands-on understanding of how to integrate electronics into fabric, and offers playful, artistic applications of e-textile — such as a garment that produces music from the wearer's movements.
                        </p>
                    </div>
                    <Img src="/catsuit/pieces.jpg" alt="Fabric sensor pieces laid out with thread, scissors, and electronics" />
                </section>

                {/* Project Details */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Project details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Img src="/catsuit/overview.jpg" alt="The suit with stretch and crumpling sensors annotated" />
                        <div className="space-y-6 order-first md:order-last">
                            <h3 className="text-base font-normal text-primary">Architecture</h3>
                            <p>
                                Mechanical movement sensors capture the wearer's motion. Three <a href="https://www.wemos.cc/en/latest/d1/d1_mini.html" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">ESP8266 Wemos Lolin D1 mini</a> microcontrollers (left, middle, and right) send this data to a server, which triggers audio-visual feedback whenever new information arrives.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                                <li>Two <span className="font-medium text-primary">stretch sensors</span> on the right and left elbows sense the fabric stretching as the elbow bends.</li>
                                <li><span className="font-medium text-primary">Inertial sensors</span> on the lower deltoids and the middle of the rib cage measure the orientation of the arms and torso.</li>
                                <li><span className="font-medium text-primary">Crumple sensors</span> at the ends of both sleeves measure the wearer's grip.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 1. Stretch sensors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-base font-normal text-primary">1. Stretch sensors</h3>
                            <p>
                                Stretch and crease sensors work alike: both have a resistance that varies with the number of contact points. The sensor is made with a tight zigzag stitch using conductive thread in the bottom spool. Stretching the fabric raises the resistance along the conductive thread<Cite n={4} />: the opening mesh breaks the parallel contact points, so the current flows in series rather than in parallel.
                            </p>
                        </div>
                        <Img src="/catsuit/stretch-sensor-diagram.jpg" alt="Stretch sensor: circuit diagram and embroidered conductive stitch" />
                    </div>

                    {/* 2. Crumple sensors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Img src="/catsuit/crumple-sensor-diagram.jpg" alt="Crumple sensor: circuit diagram and embroidered conductive pattern" />
                        <div className="space-y-4 order-first md:order-last">
                            <h3 className="text-base font-normal text-primary">2. Crumple sensors</h3>
                            <p>
                                Here the conductive thread is sewn across an entire surface. When the fabric wrinkles, it folds onto itself and creates contact points that let the current short-circuit the pattern, so the resistance drops accordingly.
                            </p>
                        </div>
                    </div>

                    {/* 3. LED interfaces */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-base font-normal text-primary">3. LED interfaces</h3>
                            <p>
                                The LEDs are off-the-shelf sewable sequins from Adafruit<Cite n={5} />, hand-sewn directly onto the sleeves and hood using the same process as the gyroscopic sensors. For now they are purely aesthetic, but they can easily be driven by the integrated GEMMA microcontrollers<Cite n={6} />.
                            </p>
                        </div>
                        <Img src="/catsuit/led-interfaces.jpg" alt="Sewable LED sequins lit on the garment" />
                    </div>

                    {/* 4. Gyroscopic sensors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Img src="/catsuit/gyroscopic-sensor.jpg" alt="Wemos microcontroller and accelerometer embroidered onto the sleeve" />
                        <div className="space-y-4 order-first md:order-last">
                            <h3 className="text-base font-normal text-primary">4. Gyroscopic sensors</h3>
                            <p>
                                An accelerometer measures linear, non-gravitational acceleration. Three off-the-shelf accelerometers from Adafruit record acceleration and speed in the shoulder and torso area<Cite n={7} />. The connector is hand-sketched, imported into DRAWings as a PNG, then vectorized, rescaled, and turned into an ISO 301 stitch. The sensor is finally embroidered upside-down with that stitch on the outer surface of the sleeve.
                            </p>
                        </div>
                    </div>
                </section>

                {/* References */}
                <section className="space-y-6">
                    <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                        <li id="ref-1" className="scroll-mt-24">
                            Končar V. Smart textiles and their applications — visual perceptions. <em>Proceedings of 9th International Symposium on Graphic Engineering and Design</em>. Nov. 2018. doi:{' '}
                            <a href="https://doi.org/10.24867/grid-2018-p1" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.24867/grid-2018-p1</a>
                        </li>
                        <li id="ref-2" className="scroll-mt-24">
                            Cherenack K, van Pieterson L. Smart textiles: Challenges and opportunities. <em>Journal of Applied Physics</em>. 2012, doi:{' '}
                            <a href="https://doi.org/10.1063/1.4742728" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1063/1.4742728</a>
                        </li>
                        <li id="ref-3" className="scroll-mt-24">
                            Ruckdashel RR, Khadse N, Park JH. Smart E-Textiles: Overview of Components and Outlook. <em>Sensors</em>. 2022, doi:{' '}
                            <a href="https://doi.org/10.3390/s22166055" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.3390/s22166055</a>
                        </li>
                        <li id="ref-4" className="scroll-mt-24">
                            Tangsirinaruenart O, Stylios G. A Novel Textile Stitch-Based Strain Sensor for Wearable End Users. <em>Materials</em>. 2019, doi:{' '}
                            <a href="https://doi.org/10.3390/ma12091469" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.3390/ma12091469</a>
                        </li>
                        <li id="ref-5" className="scroll-mt-24">
                            Adafruit. LED Sequins — Warm White.{' '}
                            <a href="https://www.adafruit.com/product/1758" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">adafruit.com/product/1758</a>
                        </li>
                        <li id="ref-6" className="scroll-mt-24">
                            Adafruit. GEMMA v2 — Miniature wearable electronic platform.{' '}
                            <a href="https://www.adafruit.com/product/1222" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">adafruit.com/product/1222</a>
                        </li>
                        <li id="ref-7" className="scroll-mt-24">
                            Adafruit. FLORA Accelerometer/Compass Sensor — LSM303.{' '}
                            <a href="https://www.adafruit.com/product/1247" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">adafruit.com/product/1247</a>
                        </li>
                    </ol>
                </section>

                <footer className="pt-12 border-t border-border-subtle">
                    <p className="text-sm text-secondary">
                        © Vivien Perrelle — Institute for Future Technologies, with Marie Julou &amp; Madalina Nicolae.
                    </p>
                </footer>

            </div>
        </article>
    );
};

export default MotionSuit;
