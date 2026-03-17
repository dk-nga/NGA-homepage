const features = [
  "업무 구조 분석 기반 AX 로드맵 설계",
  "교육과 구축을 함께 진행하는 실행 방식",
  "도입 이후 운영과 확장까지 고려한 구조화",
];

export function FeaturesSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature}
          className="rounded-[1.5rem] border border-sky-100 bg-sky-50/70 p-6"
        >
          <p className="text-base font-medium text-slate-900">{feature}</p>
        </div>
      ))}
    </div>
  );
}
