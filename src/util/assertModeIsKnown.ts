export default function assertModeIsKnown(mode: never): never {
  const exhaustive: never = mode;
  throw new Error(`Cannot handle unknown mode: ${exhaustive}`);
}
