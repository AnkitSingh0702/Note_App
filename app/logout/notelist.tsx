import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, doc, updateDoc, deleteDoc } from "../firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PulseLoader } from "react-spinners";
import { useToast } from "@/components/hooks/use-toast";


interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface NotesListProps {
  notes: Note[];
  onNotesUpdated: (notes: Note[]) => void;
}

export function NotesList({ notes, onNotesUpdated }: NotesListProps) {
  const { toast } = useToast(); // Access toast hook
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (selectedNote) {
      setIsLoading(true);
      try {
        const noteDoc = doc(db, "notes", selectedNote.id);
        await updateDoc(noteDoc, {
          title: selectedNote.title,
          content: selectedNote.content,
          createdAt: selectedNote.createdAt,
        });
        onNotesUpdated([...notes]);
        setSelectedNote(null);

        
        toast({
          variant: "default",
          title: "Note Updated",
          description: "The note has been updated successfully.",
          style: { backgroundColor: "#facc15", color: "#000" }, 
        });
      } catch (error) {
        console.error("Error updating note: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "notes", id));
      const updatedNotes = notes.filter((note) => note.id !== id);
      onNotesUpdated(updatedNotes);

      // Trigger Red Toast for Delete
      toast({
        variant: "destructive",
        title: "Note Deleted",
        description: "The note has been removed successfully.",
        style: { backgroundColor: "#ef4444", color: "#fff" }, // Red background
      });
    } catch (error) {
      console.error("Error deleting note: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-5 justify-center">
      {notes.map((note) => (
        <Card
          key={note.id}
          onClick={() => setSelectedNote(note)}
          className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 hover:active:scale-95 transition duration-300 ease-in-out"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
            <p className="text-sm text-gray-500">
              {note.createdAt.toDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <p>{note.content.slice(0, 100)}...</p>
          </CardContent>
        </Card>
      ))}

      {selectedNote && (
        <Dialog open={true} onOpenChange={() => setSelectedNote(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Note Title</label>
                <Input
                  value={selectedNote.title}
                  onChange={(e) =>
                    setSelectedNote({ ...selectedNote, title: e.target.value })
                  }
                  placeholder="Note title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Note Content</label>
                <Textarea
                  value={selectedNote.content}
                  onChange={(e) =>
                    setSelectedNote({
                      ...selectedNote,
                      content: e.target.value,
                    })
                  }
                  placeholder="Note content"
                />
              </div>
            </div>
            <DialogFooter className="space-x-2">
              <Button
                variant="destructive"
                onClick={() => handleDelete(selectedNote.id)}
                className="w-full sm:w-auto"
              >
                {isLoading ? <PulseLoader size={10} color="#fff" /> : "Delete"}
              </Button>
              <Button onClick={handleEdit} className="w-full sm:w-auto">
                {isLoading ? <PulseLoader size={10} color="#fff" /> : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
