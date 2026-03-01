import Section, { SectionContent } from "../layout/section";

const examples = [
    { link: "/example1.png" },
    { link: "/example2.png" },
    { link: "/example3.png" },
];

export default function HomeExample() {
    return (
        <Section className="pt-size-xl relative h-fit">
            <SectionContent>
                {/* <div className="grid grid-cols-3 gap-4">
                    {examples.map((example, index) => {
                        return (
                            <div
                                key={index}
                                className="h-[600px] w-full rounded-md bg-white/20 backdrop-blur-lg"
                            >
                                <Image
                                    src={example.link}
                                    alt={example.link}
                                    width={500}
                                    height={400}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>
                        );
                    })}
                </div> */}
            </SectionContent>
        </Section>
    );
}
