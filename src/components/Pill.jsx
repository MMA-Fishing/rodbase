export default function Pill({ children, active = false }) {
  return (
    <span className={active ? "pill pillActive" : "pill"}>
      {children}
    </span>
  );
}
