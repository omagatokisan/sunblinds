import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";

const hashPath = path.join(process.cwd(), "data", "cms", ".admin-hash");
const attemptsPath = path.join(process.cwd(), "data", "cms", "login-attempts.json");

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

type Attempts = Record<string, { count: number; lockedUntil?: number }>;

async function readAttempts(): Promise<Attempts> {
  try {
    return JSON.parse(await readFile(attemptsPath, "utf8")) as Attempts;
  } catch {
    return {};
  }
}

async function writeAttempts(data: Attempts) {
  await mkdir(path.dirname(attemptsPath), { recursive: true });
  await writeFile(attemptsPath, JSON.stringify(data), "utf8");
}

export async function isLoginLocked(ip: string) {
  const data = await readAttempts();
  const row = data[ip];
  if (!row?.lockedUntil) return false;
  if (Date.now() < row.lockedUntil) return true;
  delete data[ip];
  await writeAttempts(data);
  return false;
}

export async function recordFailedLogin(ip: string) {
  const data = await readAttempts();
  const row = data[ip] ?? { count: 0 };
  row.count += 1;
  if (row.count >= MAX_ATTEMPTS) {
    row.lockedUntil = Date.now() + LOCK_MS;
    row.count = 0;
  }
  data[ip] = row;
  await writeAttempts(data);
}

export async function clearLoginAttempts(ip: string) {
  const data = await readAttempts();
  delete data[ip];
  await writeAttempts(data);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  let hash: string;
  try {
    hash = await readFile(hashPath, "utf8");
  } catch {
    return false;
  }
  return bcrypt.compare(password, hash.trim());
}
