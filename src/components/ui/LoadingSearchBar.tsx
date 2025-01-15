export default function LoadingSearchBar() {
  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-white/10 rounded-lg" />
      <div className="space-y-6">
        <div className="h-12 bg-white/10 rounded-xl" />
        <div className="h-12 bg-white/10 rounded-xl" />
        <div className="h-12 bg-white/10 rounded-xl" />
        <div className="h-12 bg-luxury-gold/30 rounded-xl" />
      </div>
    </div>
  );
}
