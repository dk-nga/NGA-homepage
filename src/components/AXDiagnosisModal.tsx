"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AXDiagnosisModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AXDiagnosisModal({
  open,
  onOpenChange,
}: AXDiagnosisModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-sky-100 sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>AX 무료 진단</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm leading-7 text-slate-600">
          <p>도입 목적, 대상 부서, 기대 성과를 기준으로 1차 진단 구조를 정리합니다.</p>
          <ul className="space-y-2">
            <li>현재 업무 병목과 반복 업무 파악</li>
            <li>도입 우선순위와 12주 실행 범위 정의</li>
            <li>교육·구축·운영 전환 구조 초안 제안</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
