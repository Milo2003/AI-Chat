import { Menu } from 'lucide-react';
import { Button } from './ui';
import Image from 'next/image';
import Icon from '../app/icon.svg';
import Link from 'next/link';
export const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header
      className={`shadow-md p-4 flex justify-between items-center bg-white`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className={`text-2xl font-bold text-black`}>AI-Chat</h1>
      <Link target="_blank" href="https://nore.website">
        <Image src={Icon} width={36} height={36} alt="Icon"></Image>
      </Link>
    </header>
  );
};
