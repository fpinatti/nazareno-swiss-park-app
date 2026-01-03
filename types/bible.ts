export interface BibleVersion {
  id: string;
  name: string;
  label: string;
}

export interface BibleBook {
  name: string;
  abbrev: string;
  chapters: number;
}

export interface BibleVerse {
  number: number;
  text: string;
}

// Note: The thiagobodruk API returns an array of books,
// where each book has an array of chapters,
// and each chapter is an array of verse strings.
export interface BibleData {
  abbrev: string;
  chapters: string[][];
}
