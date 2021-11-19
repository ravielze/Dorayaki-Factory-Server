export function StringPadding(width: number, string: string, padding: string): string {
    return width <= string.length ? string : StringPadding(width, padding + string, padding);
}

export function MethodFormat(method: string) {
    method = method.toLowerCase();
    switch (method) {
        case 'get':
            return `🟩 ${StringPadding(7, 'GET', ' ')}`;
        case 'post':
            return `🟦 ${StringPadding(7, 'POST', ' ')}`;
        case 'patch':
            return `🟨 ${StringPadding(7, 'PATCH', ' ')}`;
        case 'put':
            return `🟧 ${StringPadding(7, 'PUT', ' ')}`;
        case 'delete':
            return `🟥 ${StringPadding(7, 'DELETE', ' ')}`;
    }
    return `❔ ${StringPadding(7, 'UNKNOWN', ' ')}`;
}
