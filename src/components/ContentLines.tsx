/**
 * Full-height vertical lines aligned with the main container (max-w 1280px).
 * Acts as a visual grid / anchor overlay; pointer-events-none so it doesn’t block interaction.
 */
export default function ContentLines() {
  return (
    <div
      className="content-lines pointer-events-none fixed inset-0 z-[100] flex justify-between"
      aria-hidden
    >
      <div className="content-lines-inner mx-auto h-full w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-full w-full justify-between">
          <div className="content-line h-full w-0 border-r border-border/50" />
          <div className="content-line h-full w-0 border-r border-border/50" />
          <div className="content-line h-full w-0 border-r border-border/50" />
          <div className="content-line h-full w-0 border-r border-border/50" />
        </div>
      </div>
    </div>
  );
}
