export function formatToWon(price: number): string {
    return price.toLocaleString("ko-KR");
}

export function formatToTImeAgo(date: string): string {
    const dayInMs = 1000 * 60 * 60 * 24;
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((time - now) / dayInMs);

    const formatter = new Intl.RelativeTimeFormat("ko");

    return formatter.format(diff, "days");
}
