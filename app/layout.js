import "./globals.css";

export const metadata = {
  title: "Burger Pack Paws Project",
  description:
    "Supporting Arizona rescue dogs and the organizations who save them through quarterly partnerships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
