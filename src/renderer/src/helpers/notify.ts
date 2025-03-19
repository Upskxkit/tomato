export const notify = (title: string, message: string): void => {
  window.notify.send(title, message)
}
