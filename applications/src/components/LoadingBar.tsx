import * as Progress from "@radix-ui/react-progress";

export default function LoadingBar({ value }: { value: number }) {
  return (
    <Progress.Root className="relative h-2 w-80 overflow-hidden rounded-full bg-white/10 backdrop-blur-md">
      <Progress.Indicator
        className="h-full bg-primary transition-transform duration-300 shadow-[0_0_12px_rgba(88,101,242,0.6)]"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </Progress.Root>
  );
}
