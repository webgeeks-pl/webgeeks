interface EmailField {
    question: string;
    answer: string;
}

interface EmailTemplateProps {
    data: EmailField[];
}

export function EmailTemplate({ data }: EmailTemplateProps) {
    return (
        <div>
            <h1>Nowa wiadomość z formularza</h1>
            {data.map((field, index) => (
                <div key={index}>
                    <strong>{field.question}:</strong> {field.answer}
                </div>
            ))}
        </div>
    );
}
