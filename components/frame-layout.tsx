import { FrameBody } from "@/components/frame-body";
import { FrameHeader } from "@/components/frame-header";

export const FrameLayout = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  return (
    <div tw="flex flex-col h-full w-full overflow-hidden">
      <FrameHeader title={title} />
      <FrameBody>{children}</FrameBody>
    </div>
  );
};
