export const notify = (title: string, message: string) => {
    window.notify.send(title, message);
};