"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  return (
    // <div className="flex flex-col gap-4">
    //   <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
    //     Search articles...
    //   </Button>
    //   <CommandDialog open={open} onOpenChange={setOpen} showCloseButton={false}>
    //     <Command >
    //       <CommandInput 
    //         placeholder="Search articles..."
    //         value={query}
    //         onValueChange={setQuery}
    //       />
    //       <CommandList>
    //         <CommandEmpty>No results found.</CommandEmpty>
    //         <CommandGroup>
    //           <CommandGroup heading={"Recent Articles"}>
    //            {filteredPosts.slice(0, 3).map((post) => (
    //             <CommandItem
    //               key={post.slug}
    //               onSelect={() => router.push(`/articles/${post.slug}`)}
    //               className="text-foreground-muted hover:text-foreground hover:bg-gray-200 cursor-pointer"
    //             >
    //               {post.title}
    //             </CommandItem>
    //           ))}
    //         </CommandGroup>
    //         </CommandGroup>
    //       </CommandList>
    //     </Command>
    //   </CommandDialog>
    // </div>
    <Dialog>
      {/* Search Button */}
      <DialogTrigger  className="h-10 w-64 px-3 flex items-center gap-3 text-foreground-muted hover:text-foreground rounded-md border border-border">
          <Search size={18}/>
          <p className="text-sm">Search articles...</p>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent showCloseButton={false} className="p-0 overflow-hidden max-w-xl mx-auto border-5 border-border shadow-2xl">
        <Command shouldFilter={false} >
          <CommandInput
            placeholder="Search articles..."
            value={query}
            onValueChange={setQuery}
          />

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