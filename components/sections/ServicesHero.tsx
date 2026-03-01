import { Code, CodeBlock, CodeHeader } from "../animate-ui/components/animate/code";
import Section, {
    SectionContent,
    SectionHeader,
    SectionHeaderContent,
    SectionLead,
    SectionTitle,
} from "../layout/section";

const code = `import { Hero, Button } from '@/components';
                            
export function LandingPage() {
  return (
    <Hero
      title="Twoja firma w internecie"
      description="Nowoczesna strona, która przyciąga klientów"
    >
      <Button variant="primary">
        Sprawdź ofertę
      </Button>
      <Button variant="outline">
        Zobacz realizacje
      </Button>
    </Hero>
  );
}`;

export function ServicesHero() {
    return (
        <Section className="py-size-xl sm:py-size-4xl items-center justify-center">
            <SectionContent className="gap-size-lg xl:flex-row">
                <SectionHeader>
                    <SectionHeaderContent className="mx-0 items-start! text-start!">
                        <div>
                            <SectionTitle>Zobacz jak pracuję</SectionTitle>
                            {/* <Text muted intent="large" className="mt-1">
                                który napędza Twoją stronę internetową
                            </Text> */}
                        </div>

                        <SectionLead className="max-w-prose">
                            Jestem nie tylko deweloperem, ale także pasjonatem tworzenia
                            stron internetowych, które nie tylko wyglądają świetnie, ale
                            także działają bez zarzutu.
                        </SectionLead>
                    </SectionHeaderContent>
                </SectionHeader>

                <div className="mx-auto flex gap-2">
                    <Code className="h-[420px] w-[620px]" code={code}>
                        <CodeHeader>landing-page.tsx</CodeHeader>

                        <CodeBlock
                            className="text-[14px]! *:text-[14px]! *:**:text-[14px]! *:**:leading-[14px]!"
                            lang="tsx"
                            writing
                            cursor
                            duration={10000}
                        />
                    </Code>
                </div>
            </SectionContent>
        </Section>
    );
}
