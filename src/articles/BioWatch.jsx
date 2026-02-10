import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const BioWatch = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="BioWatch — A Smartwatch Prototype for Wearable Biosensors | Vivien Perrelle"
                description="An open-source prototype smartwatch for the implementation of wearable biosensors, built during a master's degree research project."
                url="/blog/biowatch"
                image="/biowatch/grand-angle.jpg"
                type="article"
                article={{ publishedTime: '2023-09-15', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "BioWatch — A Smartwatch Prototype for Wearable Biosensors",
                    "datePublished": "2023-09-15",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/biowatch/grand-angle.jpg",
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/biowatch"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <img src="/biowatch/apple-watch-icon.svg" alt="BioWatch Icon" className="w-8 h-8" />
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Project Case Study</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    BioWatch
                </h1>
                <p className="text-xl text-secondary font-light max-w-2xl">
                    A smartwatch Prototype for Wearable Biosensors.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>I published a master thesis on this work. Read it on</span>
                    <a
                        href="https://www.researchgate.net/publication/375227950_Smartwatch-Embedded_Biosensors_For_Healthcare_Monitoring"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors inline-flex items-center space-x-1"
                    >
                        <span>ResearchGate</span>
                        <ExternalLink size={12} />
                    </a>
                </div>
            </header>

            <div className="aspect-video w-full overflow-hidden border border-border-subtle mb-16 bg-cream/50">
                <img
                    src="/biowatch/grand-angle.jpg"
                    alt="BioWatch Grand Angle"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Introduction</h2>
                    <p>
                        I built the BioWatch during my second year of my master's degree at the <a href="https://dvic.devinci.fr/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">De Vinci Innovation Center</a>. My objective was to create a watch from scratch in the continuity of my work on wearable technologies. So the BioWatch is the wearable that allowed me to implement the biosensors I developed during my master's degree.
                    </p>
                    <p>
                        Wearable biosensors are becoming increasingly advanced yearly, while smartwatches are increasingly functional. The BioWatch is an open-source prototype smartwatch for the implementation of wearable biosensors. This project is part of the trend of private companies to develop molecular monitoring as a new functionality of smartwatches.
                    </p>
                    <div className="flex pt-4">
                        <a href="https://github.com/DeVinci-Innovation-Center/BioWatch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                            <span>View on GitHub</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Hardware</h2>
                        <p className="text-base">
                            The display of the BioWatch is a <a href="https://www.waveshare.com/wiki/1.28inch_LCD_Module" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">1.28" round RGB LCD module from WaveShare</a> with an integrated GC9A01 driver. It communicates with Serial Peripheral Interface (SPI) bus protocol.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                            <li>Arduino WeMos D1 mini Lite based on ESP8266.</li>
                            <li>Battery shield for LiPo power with charging indicator.</li>
                            <li>3D printed case in PLA with integrated magnets for modularity.</li>
                        </ul>
                    </div>
                    <div className="border border-border-subtle p-2 bg-white">
                        <img src="/biowatch/biowatch-display.jpg" alt="BioWatch Display" loading="lazy" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">PCB Design</h2>
                    <p>
                        The second version of the BioWatch has a PCB explicitly designed for the project. It uses an ESP32 Wroom, a compact and low-power chip with Wi-Fi and Bluetooth 4.2 connectivity. The board includes UART pinout for programming, SPI for the display driver, and specific LiPo charging circuitry.
                    </p>
                    <div className="w-full border border-border-subtle bg-white">
                        <img src="/biowatch/pcb.jpg" alt="BioWatch PCB" loading="lazy" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="border border-border-subtle p-2 bg-white order-2 md:order-1">
                        <img src="/biowatch/display-designs.jpg" alt="UX Designs" loading="lazy" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="space-y-6 order-1 md:order-2">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">UX Design</h2>
                        <p className="text-base">
                            The interface was designed based on consultations with type 1 diabetic patients. They prioritized three pieces of information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary font-medium">
                            <li>Real-time glucose concentration (mg/dL).</li>
                            <li>Evolution trend over the last hour.</li>
                            <li>Visual alerts for hypo/hyperglycemic zones.</li>
                        </ul>
                        <p className="text-sm text-secondary italic">
                            Design number 2 was selected as the most intuitive by 30 healthy subjects.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Software</h2>
                    <p>
                        The software uses the Arduino GFX library for rendering. NTP synchronization ensures accurate time and date. The system is designed for modularity, allowing sampling rates to adapt from heart rate (seconds) to biosensor (minutes) monitoring.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        {['WiFi Client', 'OTA Updates', 'I2C/SPI Support', 'Real-time Charting'].map(tech => (
                            <span key={tech} className="px-3 py-1 border border-border-subtle text-xs font-mono text-secondary uppercase tracking-wider">
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                <footer className="pt-12 border-t border-border-subtle">
                    <p className="text-sm text-secondary">
                        © Vivien Perrelle — Master Thesis Project.
                    </p>
                </footer>

            </div>
        </article>
    );
};

export default BioWatch;
