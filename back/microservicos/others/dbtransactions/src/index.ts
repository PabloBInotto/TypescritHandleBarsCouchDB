import Nano, { MaybeDocument } from "nano";
import './envConfig'

// ### Environment variables
const production = process.env.NODE_ENV === 'production';
const {
    DB_HOST_AUTH
} = process.env as { [varName: string]: string };
// Interfaces
interface User extends MaybeDocument {
    name: string;
    email: string;
    age: number;
    nice: boolean;
}
interface Update extends MaybeDocument {
    updated: boolean;
    id: string;
    rev: string;
    data: User;
}

const dbtransactions = {
    connection: async () => {

        const dbName = "livros";
        const nano = Nano(DB_HOST_AUTH);
        const dbList = await nano.db.list();
        try {
            if (!dbList.includes(dbName)) {
                await nano.db.create(dbName);
                const db = nano.use(dbName);
                console.log("database created successfully");
                return db;
            } else {
                const db = nano.use(dbName);
                console.log("connected to database successfully");
                return db;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    },
    typeDefs: `
    type Doc {
    name: String!
    email: String!
    age: Int!
    nice: Boolean!
    updated: Boolean
    }
    type Mutation {
    createRecord(name: String!, email: String!, age: Int!, nice:   Boolean!): Boolean!
    delete(id: String, rev: String): Boolean!
    update(id: String, rev: String, updated: Boolean): Boolean!
    }
    type Query {
    findAll: [Doc!]
    findSingle(id: String!): Doc!}`,
    resolvers: {
        Mutation: {
            createRecord: async (_parent: any, args: User) => {
                try {
                    const couch = dbtransactions.connection()
                    const record = await (await couch).insert(args);
                    console.log(record);
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }
            },
            delete: async (_: any, { id, rev }: { id: string; rev: string }) => {
                const couch = dbtransactions.connection();
                const record = await (await couch).destroy(id, rev);
                console.log(record);
                return true;
            },
            update: async (_: any, { id, rev, data, ...args }: Update) => {
                const couch = dbtransactions.connection();
                if (data) {
                    args._id = id
                    args._rev = rev
                    const file = await (await couch).insert({
                        ...data,
                        ...args,
                    });
                    console.log(file);
                    return true;
                }
                return false;
            },
        },
        Query: {
            findAll: async () => {
                const couch = dbtransactions.connection();
                const files = await (await couch).find({
                    selector: {},
                    fields: ["_id", "_rev", "name", "email", "age", "nice", "updated"],
                });
                console.log(files.docs);
                return files.docs;
            },
            findSingle: async (_: any, { id }: { id: string }) => {
                const couch = dbtransactions.connection();
                const file = await (await couch).get(id);
                console.log(file);
                return file;
            },
        },
    },
    listDb: async () => {
        const couch = dbtransactions.connection();
        const listDatabases = await (await couch).list().then((dblist: any) => dblist)
        return listDatabases;
    }
}

export default dbtransactions;

