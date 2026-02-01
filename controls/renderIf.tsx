interface RenderIfProps {
    children: React.ReactNode;
    condition: boolean;
}

export default function RenderIf({ condition, children }: RenderIfProps) {
    if (!condition) {
        return null;
    }
    return <>{children}</>;
}
