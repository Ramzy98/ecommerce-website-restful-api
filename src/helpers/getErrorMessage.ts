export default function getErrorMessage(e: string | Error) {
  if (typeof e === 'string') {
    return e.toUpperCase();
  } else if (e instanceof Error) {
    return e.message;
  }
}
