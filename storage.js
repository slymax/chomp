import { DB } from "https://deno.land/x/sqlite/mod.ts";

export class KV {
    constructor(path) {
        const db = new DB(path);
        db.query("CREATE TABLE IF NOT EXISTS data (key TEXT PRIMARY KEY, value TEXT)");
        this.get = key => {
            return [...db.query("SELECT value FROM data WHERE key = ?", [key])].flat()[0];
        };
        this.set = (key, value) => {
            db.query("REPLACE INTO data VALUES (?, ?)", [key, value]);
        };
        this.delete = key => {
            db.query("DELETE FROM data WHERE key = ?", [key]);
        };
        this.list = () => {
            return [...db.query("SELECT key FROM data")].flat();
        };
        this.clear = () => {
            db.query("DELETE FROM data");
        };
        this.put = this.set;
        this.setItem = this.set;
        this.putItem = this.set;
        this.removeItem = this.delete;
        this.deleteItem = this.delete;
        this.remove = this.delete;
        this.getItem = this.get;
    };
};

export { DB };
