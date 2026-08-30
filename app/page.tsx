import { Hero } from '@/components/sections/Hero';
import { Proof } from '@/components/sections/Proof';
import { Work } from '@/components/sections/Work';
import { Showcase } from '@/components/sections/Showcase';
import { Capabilities } from '@/components/sections/Capabilities';
import { StackDepth } from '@/components/sections/StackDepth';
import { Flow } from '@/components/sections/Flow';
import { Experience } from '@/components/sections/Experience';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Flow />
      <Showcase />
      <Capabilities />
      <StackDepth />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
