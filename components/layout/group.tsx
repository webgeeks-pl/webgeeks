interface GroupProps<T> {
    items: T[];
    readonly render: (item: T, index: number) => React.ReactNode;
}

export default function Group<T>({ items, render }: GroupProps<T>) {
    return <>{items.map(render)}</>;
}
