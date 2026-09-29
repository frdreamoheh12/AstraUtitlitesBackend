export const safeArchivePath = name => typeof name==='string' && name.length<300 && !name.includes('\\') && !name.startsWith('/') && !name.split('/').includes('..') && !name.includes('\0');
