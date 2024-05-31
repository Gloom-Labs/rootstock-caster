export const FrameHeader = ({ title }: { title?: string }) => {
  return (
    <div tw="flex flex-col w-full items-center justify-center bg-amber-500 text-black p-20">
      <p tw="text-7xl font-bold my-0">{title ?? "Rootstock x FC"}</p>
    </div>
  );
};
