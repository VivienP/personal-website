import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { ExternalLink } from 'lucide-react';
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

const BioWatch = () => {
    return (
        <ArticleLayout backTo="/" backLabel="Back">
            <SEO
                title="BioWatch: A Smartwatch Prototype for Wearable Biosensors | Vivien Perrelle"
                description="An open-source prototype smartwatch for the implementation of wearable biosensors, built during a master's degree research project at the Institute for Future Technologies."
                url="/projects/biowatch"
                image="/biowatch/biowatch-grand-angle.jpg"
                imageWidth={1920}
                imageHeight={774}
                type="article"
                article={{ publishedTime: '2023-02-01', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "BioWatch: A Smartwatch Prototype for Wearable Biosensors",
                    "datePublished": "2023-02-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/biowatch/biowatch-grand-angle.jpg",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/biowatch"
                }}
            />
            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <img src="/biowatch/apple-watch-icon.svg" alt="BioWatch Icon" className="w-8 h-8" />
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Biosensor · Electronics · Programming</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    BioWatch
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A smartwatch for wearable biosensors.
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

            {/* Hero */}
            <div className="w-full overflow-hidden border border-border-subtle mb-12">
                <img
                    src="/biowatch/biowatch-grand-angle.jpg"
                    alt="BioWatch worn on a wrist"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                {/* Intro statement */}
                <section className="space-y-6">
                    <p className="italic text-secondary">
                        I built the BioWatch during my second year of my master's degree at the <a href="https://ift.devinci.fr/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Institute for Future Technologies</a>.
                        My objective was to create a watch from scratch in the continuity of my work on wearable technologies. So the BioWatch is the wearable that allowed me to implement the biosensors I developed during my master's degree.
                    </p>
                    <p className="text-base font-normal text-primary">
                        Wearable biosensors are becoming increasingly advanced yearly, while smartwatches are increasingly functional. The BioWatch is an open-source prototype smartwatch for the implementation of wearable biosensors. This project is part of the trend of private companies to develop molecular monitoring as a new functionality of smartwatches.
                    </p>
                    <div className="flex pt-2">
                        <a href="https://github.com/DeVinci-Innovation-Center/BioWatch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                            <span>View on GitHub</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <Img src="/biowatch/biowatch-viewed-from-above.jpg" alt="BioWatch viewed from above" />
                        <Img src="/biowatch/bioWatch-photo-white-box-profil.jpg" alt="BioWatch profile view" />
                    </div>
                </section>

                {/* Introduction — text only */}
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Introduction</h2>
                    <p>
                        Wearable technology is undergoing constant development, entrenching our daily lives to capture rich contextual information produced for a personalized experience<Cite n={1} />. Smartwatches were the first socially accepted wearable devices and are still the most popular. In 2016, smartwatch sales in the wearables market were the second product over intelligent devices, with 50 million units sold. They cover a broad application scope, including connectivity, sports, and health<Cite n={2} />. Human activity detection for well-being applications has become a central stake in the smartwatch and fitness tracker market. Heart rate, temperature, and blood pressure are examples of already monitored physiological data by commercial wearable devices<Cite n={3} />. Wearable biosensor technology has advanced significantly<Cite n={4} />, but significant obstacles remain to overcome their full integration into our smartwatches regarding new materials, power sources, and communications systems<Cite n={5} />.
                    </p>
                </section>

                {/* Related Works — text left, image right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Related Works</h2>
                        <p>
                            Few works on watch-integrated biosensors and multianalyte measurement devices have been recently published. Kim et al. developed in 2018 a wearable and flexible patch that monitors two analytes in two different biofluids: alcohol in sweat and glucose in interstitial fluid (ISF)<Cite n={6} />. In 2022, Wang et al. presented a sweat cortisol sensor with an LCD screen that prints in real-time the measured concentrations<Cite n={7} />. Finally, the French company PKVitality (Paris, France) developed the K'Watch Glucose® and the K'Watch Athlete®, which can respectively monitor glucose and lactate levels thanks to minimally invasive biosensors<Cite n={8} />. Thus microneedles-based biosensors access the interstitial fluid without any sensation of pain or discomfort. The smartwatch tracks the wearer's glucose or lactate level in real-time for seven days before replacing the microneedles module with another one. The wearable seems promising in modularity and compatibility with all minimally-invasive electrochemical biosensors and multi-analyte measurements.
                        </p>
                    </div>
                    <Img src="/biowatch/biowatch-related-works.jpg" alt="Related works: integrated biosensor devices" />
                </section>

                {/* Contribution — image left, text right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Img src="/biowatch/biowatch-microneedles-module.jpg" alt="Microneedles module mounted on the BioWatch" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Contribution</h2>
                        <p>
                            <span className="font-medium text-primary">The BioWatch is a smartwatch prototype for developing wearable biosensors and real-time data visualization.</span> This electronic project aims to easily demonstrate proof of concept of smartwatch-integrated or wirelessly connected wearable biosensors. It allows rapid implementation and on-body demonstration of non-invasive (sweat) or minimally invasive (ISF) electrochemical biosensors. Beyond electrochemical sensors, BioWatch's contribution extends to the development and proof of concept of any wearable sensor connected to or implemented in a smartwatch.
                        </p>
                        <p>
                            The BioWatch is also a learning platform for IoT technology for students at the Institute for Future Technologies. Master students are working on this project as part of their training to learn by developing new functionalities for the BioWatch.
                        </p>
                    </div>
                </section>

                {/* Functionalities — text left, image right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Functionalities</h2>
                        <p>
                            The system has five main functionalities: over-the-air programmability, Wi-Fi server-client connection connectivity, sensor data visualization, sensor modularity, and rechargeability.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                            <li>With over-the-air programmability, users can remotely update and modify the software on the device, which allows for easy integration of new features and bug fixes.</li>
                            <li>The Wi-Fi server-client connection allows easy access to data from the device, enabling users to monitor sensor readings in real time.</li>
                            <li>Sensor modularity is an essential feature of the BioWatch, as it allows for easy replacement and upgrading of sensors.</li>
                            <li>The device includes a rechargeable battery to ensure 3 hours of autonomy.</li>
                        </ul>
                    </div>
                    <Img src="/biowatch/biowatch-characteristics.jpg" alt="BioWatch characteristics: OTA programming, Wi-Fi server-client connection" />
                </section>

                {/* Hardware — image left, text right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Img src="/biowatch/biowatch-v1-v2-schemes.jpg" alt="BioWatch V1 and V2 exploded schemes" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Hardware</h2>
                        <p>
                            The display of the BioWatch is a <a href="https://www.waveshare.com/wiki/1.28inch_LCD_Module" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">1.28" round RGB LCD module from WaveShare</a> with an integrated GC9A01 driver. It communicates with <span className="font-medium text-primary">Serial Peripheral Interface (SPI)</span> bus protocol.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                            <li>In the first version of the BioWatch, the display is controlled by an <a href="https://www.wemos.cc/en/latest/d1/d1_mini_lite.html" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Arduino WeMos D1 mini Lite</a>. The WeMos D1 Mini is a microcontroller board based on the ESP8266 Wi-Fi module. The board is particularly small (34 x 25 mm), and suitable for wearable applications.</li>
                            <li>The <a href="https://www.wemos.cc/en/latest/d1_mini_shield/battery.html" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">battery shield</a>, soldered on the Wemos, allows to power the board with a 3.7V LiPo battery thanks to a mini JST connector. The battery can be charged via the micro-USB port on the shield. Two red and green LEDs indicate when the battery is charging and when the charge is complete.</li>
                            <li>The <a href="https://github.com/DeVinci-Innovation-Center/BioWatch/tree/main/hardware/case_modelizations_V1" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">watch case</a> is modeled in CAD software and 3D printed with PLA. Magnets of 2 millimeters in diameter are integrated into the case. Thus, a sensor can easily be positioned, such as a micro-needle module.</li>
                        </ul>
                    </div>
                </section>

                {/* PCB Design — text left, image right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">PCB Design</h2>
                        <p>
                            The second version of the BioWatch has a PCB explicitly designed for the BioWatch. It uses an ESP32 Wroom, a compact and low-power chip. The ESP32 Wroom module includes a dual-core Tensilica LX6 microcontroller with up to 240 MHz clock speeds and various peripheral interfaces such as SPI, I2C, UART, and ADC. It also includes Wi-Fi and Bluetooth 4.2 connectivity, making it an ideal choice for wearables applications.
                        </p>
                        <p>
                            UART pinout allows programming the ESP32. Seven digital pins are provided for programming the GC9A01 driver in SPI. A LiPo battery can power the chip via the pin reserved. A switch button allows to turn on and off the smartwatch. A charging circuitry similar to the Wemos battery shield enables charging the battery through the micro-USB connector.
                        </p>
                    </div>
                    <Img src="/biowatch/biowatch-pcb-v2.jpg" alt="BioWatch V2 PCB with ESP32 and charging circuit" />
                </section>

                {/* User Interface Design — image left, text right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <Img src="/biowatch/biowatch-display-designs.jpg" alt="Four proposed display designs" />
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">User Interface Design</h2>
                        <p>
                            The display has been designed based on the preferences of diabetic patients. The BioWatch interface should ensure a great user experience for diabetes to monitor their glucose levels and for other patients to track health data. Three patients with type 1 diabetes, including two adults and one child, were consulted for their preferences. They reported wanting three pieces of information on the BioWatch:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-secondary break-words">
                            <li>The last glucose concentration value in mg/dL,</li>
                            <li>The evolution of their glucose level over the last hour,</li>
                            <li>A visual indicator for identifying hypoglycemic (&lt;70mg/dL) and hyperglycemic (&gt;140mg/dL) situations.</li>
                        </ul>
                        <p>
                            Based on this consultation, four designs were proposed to 30 healthy subjects who evaluated the designs based on aesthetics and intuitiveness. Design number 2 received the highest score.
                        </p>
                    </div>
                </section>

                {/* Software — text left, image right */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Software</h2>
                        <p>
                            The collection of user requirements was the basis for developing the watch software. The <a href="https://github.com/moononournation/Arduino_GFX" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Arduino GFX library</a> is used to control the screen graphics. The measured data are converted into coordinates of a pixel on the screen (240 x 240 pixels), allowing to draw a history curve. An algorithm displays a prediction of the next value.
                        </p>
                        <p>
                            The clock is synchronized with the network thanks to an NTP connection, allowing to display the time and date. The update frequency can be easily updated, between one second for pulse sensor applications and one minute for biosensors. The conversion of the measured data into coordinates on the screen is also easily adaptable. The BioWatch is thus compatible with all types of sensors implemented in I2C or connected wirelessly.
                        </p>
                    </div>
                    <Img src="/biowatch/biowatch-display.jpg" alt="BioWatch display rendering the glucose history curve" />
                </section>

                {/* Where it led — PKvitality */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="border border-border-subtle">
                        <img
                            src="/pkvitality/pkvitality.jpg"
                            alt="Vivien Perrelle in front of the PKvitality stand: Continuous Glucose Monitoring in a Smartwatch"
                            loading="lazy"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="space-y-6 order-first md:order-last">
                        <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Where it led</h2>
                        <p>
                            The BioWatch prototype is what landed me an internship at <a href="https://www.pkvitality.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">PKvitality</a>, a 50-person startup that raised several million euros to build the first glucose-monitoring smartwatch for diabetics. I joined their R&D team as a research assistant, working on the same minimally-invasive biosensing technology the BioWatch had let me prototype.
                        </p>
                    </div>
                </section>

                {/* References */}
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                        <li id="ref-1" className="scroll-mt-24">
                            Ometov A., et. al., A Survey on Wearable Technology: History, State-of-the-Art and Current Challenges, <em>Computer Networks</em>, Volume 193, 2021, doi:{' '}
                            <a href="https://doi.org/10.1016/j.comnet.2021.108074" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1016/j.comnet.2021.108074</a>
                        </li>
                        <li id="ref-2" className="scroll-mt-24">
                            Reeder B, David A. Health at hand: A systematic review of smart watch uses for health and wellness. <em>J Biomed Inform</em>. 2016, doi:{' '}
                            <a href="https://doi.org/10.1016/j.jbi.2016.09.001" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1016/j.jbi.2016.09.001</a>
                        </li>
                        <li id="ref-3" className="scroll-mt-24">
                            Sharma A, Badea M, Tiwari S, Marty JL. Wearable Biosensors: An Alternative and Practical Approach in Healthcare and Disease Monitoring. <em>Molecules</em>. Feb. 2021. doi:{' '}
                            <a href="https://doi.org/10.3390/molecules26030748" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.3390/molecules26030748</a>
                        </li>
                        <li id="ref-4" className="scroll-mt-24">
                            Kim J, Campbell AS, de Ávila BE, Wang J. Wearable biosensors for healthcare monitoring. <em>Nat Biotechnol</em>. 2019, doi:{' '}
                            <a href="https://doi.org/10.1038/s41587-019-0045-y" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1038/s41587-019-0045-y</a>
                        </li>
                        <li id="ref-5" className="scroll-mt-24">
                            Verma D., et. al., Internet of things (IoT) in nano-integrated wearable biosensor devices for healthcare applications, Biosensors and Bioelectronics: X, Volume 11, 2022, doi:{' '}
                            <a href="https://doi.org/10.1016/j.biosx.2022.100153" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1016/j.biosx.2022.100153</a>
                        </li>
                        <li id="ref-6" className="scroll-mt-24">
                            Kim, J., Sempionatto, J. R., Imani, S., Hartel, M. C., Barfidokht, A., Tang, G., Campbell, A. S., Mercier, P. P., Wang, J., <em>Adv. Sci.</em> 2018, doi:{' '}
                            <a href="https://doi.org/10.1002/advs.201800880" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1002/advs.201800880</a>
                        </li>
                        <li id="ref-7" className="scroll-mt-24">
                            Wang B, Zhao C, Wang Z, et al. Wearable aptamer-field-effect transistor sensing system for noninvasive cortisol monitoring. <em>Sci Adv</em>. 2022, doi:{' '}
                            <a href="https://doi.org/10.1126/sciadv.abk0967" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">10.1126/sciadv.abk0967</a>
                        </li>
                        <li id="ref-8" className="scroll-mt-24">
                            PKvitality - Bio-wearables Health &amp; Sport. PKVitality. Accessed March 3, 2023.{' '}
                            <a href="https://www.pkvitality.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">https://www.pkvitality.com/</a>
                        </li>
                    </ol>
                </section>

                <footer className="pt-12 border-t border-border-subtle">
                    <p className="text-sm text-secondary">
                        © Vivien Perrelle — Institute for Future Technologies.
                    </p>
                </footer>

            </div>
        </ArticleLayout>
    );
};

export default BioWatch;
