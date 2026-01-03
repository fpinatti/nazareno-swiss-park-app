import { BIBLE_BOOKS } from '../constants/bible';

// Pre-mapping local Bible versions for bundling
const BIBLE_VERSIONS_DATA: Record<string, any> = {
  nvi: require('../data/bible/pt_nvi.json'),
  acf: require('../data/bible/pt_acf.json'),
  aa: require('../data/bible/pt_aa.json'),
};

export async function getBibleChapter(
  versionId: string,
  bookAbbrev: string,
  chapter: number,
) {
  const bible = BIBLE_VERSIONS_DATA[versionId];
  if (!bible) throw new Error('Bible version not found in bundle');

  const book = bible.find((b: any) => b.abbrev === bookAbbrev);
  if (!book) throw new Error('Book not found');

  const chapterData = book.chapters[chapter - 1];
  if (!chapterData) throw new Error('Chapter not found');

  return chapterData;
}

export function getBookName(abbrev: string) {
  return BIBLE_BOOKS.find((b) => b.abbrev === abbrev)?.name || abbrev;
}

export function getBookChapters(abbrev: string) {
  return BIBLE_BOOKS.find((b) => b.abbrev === abbrev)?.chapters || 0;
}
