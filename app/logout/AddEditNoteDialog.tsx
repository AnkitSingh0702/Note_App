import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import { PulseLoader } from "react-spinners";
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

// Define the Note type
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface DialogDemoProps {
  onNoteAdded: (newNote: Note) => void;
}

export function DialogDemo({ onNoteAdded }: DialogDemoProps) {
  const { toast } = useToast(); // Access the toast function
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (title && content) {
      setIsLoading(true);
      try {
        const docRef = await addDoc(collection(db, "notes"), {
          title,
          content,
          createdAt: new Date(),
        });

        const newNote: Note = {
          id: docRef.id,
          title,
          content,
          createdAt: new Date(),
        };

        onNoteAdded(newNote);

       
        toast({
          variant: "default",
          title: "Note added successfully!",
          description: "Your note has been added to the database.",
        });

        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error adding note: ", error);

        // Trigger error toast
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem adding your note.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Trigger warning toast
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please provide both title and content.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-[1.25rem] flex hover:brightness-90 active:scale-95 text-lg font-semibold">
          <IoAddOutline size={30} />
          <p>Add Note</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Note Title</Label>
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Note Content</Label>
            <Textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <PulseLoader size={10} color="#fff" />
            ) : (
              "Save Notes.."
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
