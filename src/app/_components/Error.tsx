export default function Error({ error }: { error: string }) {
  return (
    <div className="border border-red-600 px-4 py-2">
      <p className="text-2xl font-extrabold uppercase text-red-600">{error}</p>
    </div>
  );
}
