import type {StructureResolver} from 'sanity/structure'

// This will automatically list all document types you define in schemaTypes/index.ts
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())