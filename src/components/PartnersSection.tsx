const partners = ["Enterprise Ops", "Customer Support", "Knowledge Work", "Learning Teams"];

export function PartnersSection() {
  return (
    <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
        AX Partners
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {partners.map((partner) => (
          <div
            key={partner}
            className="rounded-[1rem] border border-sky-100 px-4 py-4 text-sm text-slate-700"
          >
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}
