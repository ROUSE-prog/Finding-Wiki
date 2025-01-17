// app/win/page.tsx
export default function Win() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-orange-200 to-teal-200">
      <h1 className="text-4xl font-bold mb-4">You Win!</h1>
      <p className="text-lg mb-6">
        Congratulations! You reached your target page.
      </p>
      <a
        href="/game"
        className="px-6 py-3 bg-cyan-900 bg-opacity-50 text-white rounded hover:bg-blue-600"
      >
        Play Again
      </a>
    </div>
  );
}
