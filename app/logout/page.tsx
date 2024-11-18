"use client";
import Image from "next/image";
import { Drop } from "./drop";
import { DialogDemo } from "./AddEditNoteDialog";
import { NotesList } from "./notelist";
import { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";
import { ModeToggle } from "@/components/toggle";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Logout = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesData: Note[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt.toDate(), // Make sure this exists
        };
      });
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleNoteAdded = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNotesUpdated = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center mb-4 md:mb-0">
            <Image src="/logo.png" alt="NoteNest Logo" width={90} height={90} />
            <p className="text-lg text-white md:text-lg font-extrabold text-center mb-[19px] md:ml-4">
              NoteNest
            </p>
          </div>
          <nav className="md:ml-auto flex flex-wrap items-center text-base gap-4 justify-center">
            <Drop />
            <DialogDemo onNoteAdded={handleNoteAdded} />
            <div className="mb-3">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Notes List Section */}
      <div className="container mx-auto px-4">
        <NotesList notes={notes} onNotesUpdated={handleNotesUpdated} />
      </div>
    </div>
  );
};

export default Logout;
