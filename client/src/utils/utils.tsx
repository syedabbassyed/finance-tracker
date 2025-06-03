export function getCurrentDate(): string {
    const now = new Date();

    const day = now.getDate();
    const month = now.toLocaleString('en-IN', { month: 'long'});
    const year = now.getFullYear();

    return `${day} ${month} ${year}`;
}