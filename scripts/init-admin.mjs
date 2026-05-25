import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env.local");
const hashPath = path.join(root, "data", "cms", ".admin-hash");

function loadEnvLocal() {
  if (!existsSync(envPath)) return {};
  const lines = readFileSync(envPath, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

const password = process.env.ADMIN_PASSWORD || loadEnvLocal().ADMIN_PASSWORD;
if (!password || password.length < 10) {
  console.error(
    "Set ADMIN_PASSWORD in .env.local (min. 10 characters), then run: npm run admin:init"
  );
  process.exit(1);
}

mkdirSync(path.dirname(hashPath), { recursive: true });
const hash = await bcrypt.hash(password, 12);
writeFileSync(hashPath, hash, "utf8");
console.log("Admin password hash written to data/cms/.admin-hash");
console.log("Plain password is NOT stored. Remove ADMIN_PASSWORD from .env.local after init if you prefer.");
