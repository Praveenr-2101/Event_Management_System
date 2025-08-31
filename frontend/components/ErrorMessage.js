export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm mb-2">{message}</p>;
}
