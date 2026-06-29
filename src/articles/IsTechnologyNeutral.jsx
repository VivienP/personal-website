import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const IsTechnologyNeutral = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Is Technology Neutral? | Vivien Perrelle"
                description="Why the neutrality question is poorly framed, and where the value of a technology is actually decided — not in use, but in design."
                url="/blog/is-technology-neutral"
                image="/ellul/jacques-ellul.jpg"
                type="article"
                article={{ publishedTime: '2023-02-24', author: 'Vivien Perrelle', tags: ['Philosophy of Technology', 'Ethics', 'Design', 'Ellul'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "Is Technology Neutral?",
                    "datePublished": "2023-02-24",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/ellul/jacques-ellul.jpg",
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/is-technology-neutral",
                    "keywords": "Philosophy of Technology, Ethics, Design, Jacques Ellul"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Is Technology Neutral?
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    Why the question is poorly framed, and where the value of a technology is actually decided.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>Published on February 24, 2023</span>
                </div>
            </header>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <p>
                        Technology shapes our societies faster than any generation before us has known. The benefits are real: health, access to knowledge, productivity, coordination. So is the damage: widening inequality, eroded attention, mental-health costs, ecological strain. Every innovation carries a tangle of effects: economic, ecological, social, cultural, political. Some are trivial. Others are irreversible.
                    </p>
                    <p>
                        One question keeps returning: is technology a neutral force, with only its uses being good or bad? I want to argue that the question is poorly framed. The word <em>neutral</em> hides two different ideas that we almost always confuse. Separate them, and most of the debate dissolves. What remains points somewhere unexpected: not to use, but to design.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Two senses of one word</h2>
                    <p>
                        To call a technology neutral can mean two very different things.
                    </p>
                    <p>
                        In the weak, <em>instrumental</em> sense, a tool is a means indifferent to its ends. A knife cuts bread or a throat; the good and the bad lie in the hand. Here the neutralists are right. John Perry Barlow held that a technology's morality lies in how we use it. Tim Berners-Lee says the Web is worth what its users make of it. Hard to deny: a tool can serve opposite ends. But the claim is trivial. It treats the object as inert, waiting for a will to give it meaning.
                    </p>
                    <p>
                        In the strong, <em>substantive</em> sense, neutrality claims something else: that a technology exerts no pressure of its own on how we behave, perceive, think, and organize. That is the interesting claim. And it collapses.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What the tool inclines us to do</h2>
                    <p>
                        An object is never a blank slate offered to every will. It <em>invites</em> and it <em>constrains</em>. Ecological psychology calls this <em>affordance</em>: a handle invites the grip, a chair the sit, an infinite feed the endless scroll. Affordance is not a use we choose; it is a solicitation built into the form. We can resist what a device inclines us toward, but only by working <em>against</em> it, which already admits it is not neutral.
                    </p>
                    <p>
                        Heidegger pushes further. Modern technology, for him, is not a set of means but a <em>mode of revealing</em>, a way the real gives itself to us. He calls it enframing (<em>Gestell</em>): technology summons nature to stand by as a stock of available resources. The Rhine that Hölderlin sang becomes, for the engineer, a reservoir of hydroelectric power. No use of the dam changes the river; the technical gaze has already redefined what a river is. Technology frames the world before we do anything with it.
                    </p>
                    <p>
                        Bruno Latour makes this almost mundane. Why do we slow down at a speed bump? Not from civic duty, but to spare our suspension. The moral injunction <em>to slow down, to protect the children</em> has been delegated to a ridge of asphalt that enforces it tirelessly, on every driver, without fail. The artifact <em>acts</em>. It carries moral work that would otherwise rest on us alone. This is the sharpest reply to Barlow: technologies are not passive instruments. They are actors in the fabric of our conduct.
                    </p>
                    <p>
                        In the strong sense, then, neutrality is an illusion. Melvin Kranzberg compressed it into a line: <em>"Technology is neither good nor bad; nor is it neutral."</em>
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Ambivalence is not politics</h2>
                    <p>
                        There are two distinct ways to deny that neutrality, and they should not be merged.
                    </p>
                    <p>
                        The first is <em>ambivalence</em>, as Jacques Ellul understood it. His claim is not that uses vary. That is the weak sense again. It is that a technology's good and bad effects are <em>inseparable</em>, bound into the same operation. The more a field advances, he wrote, the more inextricable good and bad become, and the more impossible the choice. Behind ambivalence stands the <em>technological system</em>: an autonomous milieu that grows by its own logic of the "one best way," and ends up absorbing politics and ethics rather than answering to them.
                    </p>
                    <p>
                        Hence what Ellul called the <em>technological bluff</em>. The bluff is not the technology; it is the <em>discourse</em> around it: the fascination, the promise of mastery, the conviction that we steer progress. That discourse hides the system's real character: that it escapes us. Believing it will be enough to "regulate well" or "use well" is, for Ellul, a centerpiece of the bluff: the way the system makes us forget it is a system.
                    </p>
                    <p>
                        The second way to deny neutrality is different: <em>inscribed politics</em>, theorized by Langdon Winner. Some artifacts are not merely ambivalent; they carry a <em>determinate</em> politics. Winner's example is the deliberately low overpasses of Long Island's parkways, built, by his account, to bar buses, and so to keep the poor away from the beaches. That the case has been disputed does not touch his point: a social intention can settle into matter, where it keeps acting long after its author is gone. Ambivalence and inscribed politics are not the same. One describes a knot we cannot cut; the other, a decision lodged in form.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Where value is decided</h2>
                    <p>
                        Both theses point to the same place: not use, but <em>design</em>.
                    </p>
                    <p>
                        Andrew Feenberg named it plainly. What a technology sediments are social choices disguised as purely technical constraints, what he calls the <em>technical code</em>. A standard, a format, a default architecture look neutral; in fact they encode a decision about what will be easy and what hard, who can act and who is blocked. But Feenberg draws a conclusion neither Heidegger nor Ellul allowed: if value is inscribed at design, then it is <em>contestable</em>. The code can be reopened, argued, rewritten by those it affects. He calls this <em>democratic rationalization</em>. Technology stops being fate and becomes a matter for deliberation.
                    </p>
                    <p>
                        Peter-Paul Verbeek completes the picture from the side of experience. Artifacts do not sit passively between us and the world; they <em>mediate</em> what we perceive and how we act. An ultrasound does not merely show a fetus; it constitutes it as a patient, turns pregnancy into a sequence of decisions, redistributes moral responsibility. Technology is not a clear pane laid over an intact reality. It co-produces that reality, and our place in it.
                    </p>
                    <p>
                        Now we see why the original question was wrong. <em>Neutral or not</em> is not the axis. The axis is: <em>what do we decide, and where do we decide it?</em>
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">An upstream responsibility</h2>
                    <p>
                        This shifts where responsibility lies. The convenient answer pushes it downstream: let innovation run, then govern its uses by rule. But Ellul warns that late regulation is often one more technical reflex: the system correcting itself by the system's means, never questioning its own course.
                    </p>
                    <p>
                        Real responsibility comes earlier. It rests on what we choose to build, and on the architecture we give it. Ellul called this <em>non-power</em>: not doing everything one is capable of doing. We can give it a less resigned turn. Non-power is not the refusal of technology; it is the clarity to see that a system's properties are decided where it is conceived, not where, later, we try to patch it. You cannot fix at the level of use what was determined at the level of structure.
                    </p>
                    <p>
                        For an engineer about to build, that is the whole lesson. The deepest ethical question is not how my tool will be used, nor how it will be governed once loose in the world. It is what I choose to make, and how I shape it, because that is where the choice is real, and still mine. Wanting to do good with technology is not a matter of good intentions in use. It is a matter of design. Yet I should hold that conclusion warily: the faith that conscious design can master the system may be the subtlest form of the very bluff Ellul exposed.
                    </p>
                    <p>
                        Technology, then, is neither neutral nor redeemable after the fact. It is what we decide, at the exact point where we decide it. Everything else comes too late: the use, the rule, the fix.
                    </p>
                </section>

                <figure className="space-y-3 not-prose mx-auto max-w-xs">
                    <div className="w-full overflow-hidden border border-border-subtle">
                        <img
                            src="/ellul/jacques-ellul.jpg"
                            alt="Jacques Ellul"
                            loading="lazy"
                            className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <figcaption className="text-sm text-secondary italic text-center">Jacques Ellul.</figcaption>
                </figure>

                <blockquote className="border-l-2 border-accent/60 pl-6 py-2 text-xl font-serif italic text-primary">
                    <p>"All human happiness must be paid for, and one must always ask what price one will pay."</p>
                    <footer className="text-sm not-italic font-sans text-secondary mt-3">— Jacques Ellul</footer>
                </blockquote>

            </div>
        </article>
    );
};

export default IsTechnologyNeutral;
