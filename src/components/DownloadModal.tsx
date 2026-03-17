"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DownloadModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
  fileName?: string;
};

export function DownloadModal({
  open,
  onOpenChange,
  isOpen,
  onClose,
}: DownloadModalProps) {
  const resolvedOpen = open ?? isOpen ?? false;
  const resolvedOnOpenChange =
    onOpenChange ??
    ((nextOpen: boolean) => {
      if (!nextOpen) {
        onClose?.();
      }
    });

  return (
    <Dialog open={resolvedOpen} onOpenChange={resolvedOnOpenChange}>
      <DialogContent className="border-sky-100 sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>AI 사례집 다운로드</DialogTitle>
        </DialogHeader>
        <p className="text-sm leading-7 text-slate-600">
          다운로드 폼과 자산 연결은 다음 단계에서 붙입니다. 현재는 기존 Vite의
          다운로드 전환 지점을 Next.js 컴포넌트로 분리해 두었습니다.
        </p>
      </DialogContent>
    </Dialog>
  );
}
