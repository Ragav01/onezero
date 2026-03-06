"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

interface Post {
  title: string;
  description?: string;
  slug: string;
  content: any[];
}

// Helper: convert PortableText content to plain text
function extractText(blocks: any[]) {
  if (!blocks) return "";
  return blocks
    .map((block) => block.children?.map((c: any) => c.text).join("") ?? "")
    .join(" ");
}

export default function SearchModal() {
  const router = useRouter();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [query, setQuery] = React.useState("");

  // Fetch posts from API
  React.useEffect(() => {
    fetch("/api/search")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  // Filter posts by title, description, or content
  const filteredPosts = posts.filter((post) => {
    const contentText = extractText(post.content).toLowerCase();
    return (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description?.toLowerCase().includes(query.toLowerCase()) ||
      contentText.includes(query.toLowerCase())
    );
  });

  const [open, setOpen] = React.useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setQuery("");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      {/* Search Button */}
      <DialogTrigger className="h-10 w-64 px-3 flex items-center gap-3 text-foreground-muted hover:text-foreground rounded-md border border-border">
        <Search size={18} />
        <p className="text-sm">Search articles...</p>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="p-0 overflow-hidden max-w-xl mx-auto border-5 border-border shadow-2xl">
        <DialogHeader className="p-3 pb-0">
          <DialogTitle>Search articles</DialogTitle>
        </DialogHeader>
        <Command shouldFilter={false} >
          <div className="flex h-10 items-center gap-2 bg-secondary rounded-sm border border-border px-3 m-2">
            <Search size={16} />
            <input
              type="text"
              spellCheck
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent articles">
              {filteredPosts.slice(0, 3).map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => router.push(`/articles/${post.slug}`)}
                  className="py-2 text-foreground-muted hover:text-foreground hover:bg-gray-200 cursor-pointer"
                >
                  {post.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}