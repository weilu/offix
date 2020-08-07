/**
 * @jest-environment jsdom
 */

import "isomorphic-unfetch";
import "fake-indexeddb/auto";
import { readFileSync } from "fs";

import { DataStore } from "../src/DataStore";
import { Model } from "../src/Model";
import { CRUDEvents } from "../src/storage";
import { IndexedDBStorageAdapter } from "../src/storage/adapters/indexedDB/IndexedDBStorageAdapter";
import { ModelSchema } from "../src";

const DB_NAME = "offix-datastore";
const schema = JSON.parse(readFileSync(`${__dirname}/schema.json`).toString());

function getIndexedDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
      };
      resolve(db);
    };
  });
}

interface Note {
  id?: string;
  title: string;
  description: string;
}

interface Comment {
  id?: string;
  title: string;
  noteId: string;
}

let NoteModel: Model<Note>;

beforeEach(() => {
  const dataStore = new DataStore({
    dbName: DB_NAME
  });
  NoteModel = dataStore.setupModel<Note>({
    name: "Note",
    type: "object",
    properties: schema.Note
  });
  dataStore.setupModel<Comment>({
    name: "Comment",
    type: "object",
    properties: schema.Comment
  });
  dataStore.init();
});

afterEach(async () => {
  await new Promise((resolve, reject) => {
    const del = indexedDB.deleteDatabase(DB_NAME);
    del.onsuccess = event => resolve();
    del.onblocked = event => resolve();
  });
});

test("Setup client db with provided models", async () => {
  const db = await getIndexedDB();
  expect(db.objectStoreNames).toContain("user_Note");
  expect(db.objectStoreNames).toContain("user_Comment");
  db.close();
});

test.skip("Store Schema update", async () => {
  const idbStorage = new IndexedDBStorageAdapter(DB_NAME, 2);
  const model = new ModelSchema<any>(schema.Test);
  idbStorage.addStore(model);
  idbStorage.createStores();
  const db = (await idbStorage.getIndexedDBInstance() as IDBDatabase);
  expect(db.objectStoreNames).toContain("user_Test");
  expect(db.objectStoreNames).not.toContain("user_Note");
  expect(db.objectStoreNames).not.toContain("user_Comment");
});

test("Save Note to local store", async () => {
  const note = { title: "test", description: "description" };
  const savedNote = await NoteModel.save(note);
  expect(savedNote.id).toBeDefined();
  expect(savedNote.title).toBe(note.title);
});

test("Query from local store", async () => {
  const note = { title: "test", description: "description" };
  const savedNote = await NoteModel.save(note);
  const results = (await NoteModel.query({ title: note.title }));
  expect(results[0]).toHaveProperty("id", savedNote.id);
});

test("Update single entity in local store", async () => {
  const note = { title: "test", description: "description" };
  const savedNote = await NoteModel.save(note);
  const newTitle = "updated note";

  await NoteModel.update({
    ...savedNote,
    title: newTitle
  }, { id: savedNote.id });

  const updatedNote = (await NoteModel.query({ id: savedNote.id }))[0];

  expect(updatedNote.title).toEqual(newTitle);
});

test("Remove single entity from local store", async () => {
  const note = { title: "test", description: "description" };
  const savedNote = await NoteModel.save(note);
  await NoteModel.remove();
  const results = (await NoteModel.query({ id: savedNote.id }));
  expect(results.length).toEqual(0);
});

test("Remove all entities matching predicate from local store", async () => {
  const note = { title: "test", description: "description" };
  const savedNote = await NoteModel.save(note);
  await NoteModel.remove({ id: savedNote.id });
  const results = (await NoteModel.query({ id: savedNote.id }));
  expect(results.length).toEqual(0);
});

test("Observe local store events", async () => {
  const note = { title: "test", description: "description" };
  expect.assertions(3);

  NoteModel.subscribe(CRUDEvents.ADD, (event) => {
    expect(event.eventType).toEqual(CRUDEvents.ADD);
    expect(event.data.title).toEqual(note.title);
  });
  NoteModel.subscribe(CRUDEvents.UPDATE, (event) => {
    expect(event.eventType).toEqual(CRUDEvents.UPDATE);
  });

  await NoteModel.save(note);
  await NoteModel.update({ title: "changed" }, { title: "test" });
});


const typeDefs = `
  type Note {
    id: ID
    title: String
    description: String
  }

  input CreateNoteInput {
    id: ID
    title: String
    description: String
  }

  type Query {
    dummy: String
  }

  type Mutation {
    createNote(input: CreateNoteInput!): Note
  }
`;
