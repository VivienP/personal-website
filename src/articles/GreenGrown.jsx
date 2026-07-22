import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

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

const GreenGrown = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Green-Grown: A Creative Plant-Stake Construction Game | Vivien Perrelle"
                description="A modular, wood-based construction game that lets a climbing plant grow into a unique living shape. Designed, manufactured, and crowdfunded on Kickstarter."
                url="/projects/green-grown"
                image="/green-grown/main.jpg"
                imageWidth={1080}
                imageHeight={608}
                type="article"
                article={{ publishedTime: '2022-05-01', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "Green-Grown: A Creative Plant-Stake Construction Game",
                    "datePublished": "2022-05-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/green-grown/main.jpg",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/green-grown"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Marketing · Product Design</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Green-Grown
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A creative plant-stake construction game.
                </p>
                <p className="pt-2 text-sm text-secondary/90 italic font-light max-w-2xl">
                    During the first year of my master's program, I launched a Kickstarter crowdfunding campaign for the Green-Grown project. I participated in the <span className="font-medium not-italic text-primary">product's design</span>, <span className="font-medium not-italic text-primary">manufacture</span>, and <span className="font-medium not-italic text-primary">marketing content</span> realization with four friends. We sold about 100 products.
                </p>
            </header>

            {/* YouTube — full width */}
            <div className="w-full aspect-video border border-border-subtle mb-16 bg-black">
                <iframe
                    src="https://www.youtube.com/embed/MrNn01fSzkw"
                    title="Green-Grown: Kickstarter campaign video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                />
            </div>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                {/* What is Green-Grown? */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What is Green-Grown?</h2>
                        <p>
                            Green-Grown is <span className="font-medium text-primary">a creative wood-based construction game</span> that will help your plants grow! This construction is <span className="font-medium text-primary">a modular tree</span> with a trunk and 24 to 48 original branch pieces. Once assembled, the lacunar structure allows a climbing plant to grow and shape uniquely. Green-Grown then becomes <span className="font-medium text-primary">a living decorative and meaningful object</span>, where wood's nobility and nature's elegance blend perfectly.
                        </p>
                    </div>
                    <Img src="/green-grown/5.jpeg" alt="Green-Grown structure detail" />
                </section>

                {/* How does it work? */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">How does it work?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-base font-normal text-primary">
                                1. Assemble your Green-Grown tree branch by branch.
                            </h3>
                            <p>
                                Embed the two trunk pieces together thanks to the central slot. Then add the branches in the notches of your choice. Each trunk piece has 16 notches, and each branch has 4. A branch can fit in each notch with two different orientations. <span className="font-medium text-primary">So let your imagination run free!</span>
                            </p>
                        </div>
                        <Img src="/green-grown/3-bis.jpg" alt="Assembling the Green-Grown tree branch by branch" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Img src="/green-grown/6-bis.jpg" alt="Green-Grown placed in a pot with a planted seed" />
                        <div className="space-y-4 order-first md:order-last">
                            <h3 className="text-base font-normal text-primary">
                                2. Put your Green-Grown in a pot, and plant a seed.
                            </h3>
                            <p>
                                Once assembled, push the 4 feet of the tree into a pot of potting soil. Place the pot anywhere in your house: a bedroom, a living room, or even your terrace. Then <span className="font-medium text-primary">plant a seed of your favorite climbing plant</span>. The plant will grow according to your creation shape and the light of the day.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Design process */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Design process</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-base font-normal text-primary">An organic structure perfect for plant development</h3>
                            <p>
                                More than being made out of wood for an authentic construction game, we decided to go for a completely organic structure like a lacunar tree we iterated countless times. <span className="font-medium text-primary">The porosities that make up the structure are also inspired by nature.</span> They represent the shape of plant cells present in all flora. More than an aesthetic significance, it is mainly this shape that allows plants to grow easily on the structure.
                            </p>
                        </div>
                        <Img src="/green-grown/7.jpg" alt="Organic, lacunar structure inspired by plant cells" />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-base font-normal text-primary">Shapes limited by creativity</h3>
                        <p>
                            We wanted an easy-to-use product that is accessible to young children and allows numerous complex shapes in the image of nature. The "L" shaped branches' and the multiple notches allow for countless structure possibilities. <span className="font-medium text-primary">Symmetrical or off-center, vertical or horizontal, orderly or chaotic.</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <Img src="/green-grown/8.jpeg" alt="Different Green-Grown shape possibilities" />
                        <div className="space-y-6 order-first md:order-last">
                            <h3 className="text-base font-normal text-primary">A new look at nature</h3>
                            <p>
                                Green-Grown is an educational, fun, and manual game that requires careful assembly. Once built, it is a personal and affective object that makes us aware of <span className="font-medium text-primary">the fragility of nature</span> and the need to take care of it. This atypical decorative object highlights the details of the plant world to draw our gaze to our environment again.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="flex pt-2">
                    <a href="https://youtu.be/MrNn01fSzkw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Watch the campaign video</span>
                        <ExternalLink size={14} />
                    </a>
                </div>

                <footer className="pt-12 border-t border-border-subtle">
                    <p className="text-sm text-secondary">
                        © Vivien Perrelle. Kickstarter project.
                    </p>
                </footer>

            </div>
        </article>
    );
};

export default GreenGrown;
