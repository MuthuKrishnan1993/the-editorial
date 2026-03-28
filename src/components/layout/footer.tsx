export function Footer() {
  return (
    <footer className="px-6 py-8 text-center text-xs text-[#834d48]">
      <p className="font-headline font-bold text-sm text-[#4e211e] mb-2">THE EDITORIAL</p>
      <p className="mb-4">Curated fashion for the modern essentialist.</p>
      <div className="flex justify-center gap-6 mb-4">
        <span className="hover:text-[#a03a0f] transition-colors cursor-pointer">Instagram</span>
        <span className="hover:text-[#a03a0f] transition-colors cursor-pointer">Twitter</span>
        <span className="hover:text-[#a03a0f] transition-colors cursor-pointer">Pinterest</span>
      </div>
      <p>&copy; {new Date().getFullYear()} The Editorial. All rights reserved.</p>
    </footer>
  );
}
