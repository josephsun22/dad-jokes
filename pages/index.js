import { GoogleFonts } from "next-google-fonts";
import Hero from "../components/Hero";

export default function JokesPage() {
  return (
    <div>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&family=Cute+Font&display=swap" rel="stylesheet"> </GoogleFonts>
      <Hero />
    </div>
  );
}
