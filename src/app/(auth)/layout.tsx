export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 w-full min-h-screen flex items-center justify-center overflow-hidden p-4"
      style={{
        backgroundImage: "url(/Login-bgCover.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
