export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-green-400 animate-spin [animation-duration:1.5s]"></div>
        <div className="absolute inset-0 blur-lg bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}
