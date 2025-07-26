// import { test } from "@playwright/test";
// import { promises as fs } from "fs";
// import { join } from "path";

// const screenshotsDir = join(process.cwd(), "screenshots");

// async function createDirIfNotExists(dirPath: string) {
//   try {
//     await fs.access(dirPath);
//   } catch {
//     await fs.mkdir(dirPath, { recursive: true });
//   }
// }

// test.beforeAll(async () => {
//   await createDirIfNotExists(screenshotsDir);
// });

// test.afterEach(async ({ page }, testInfo) => {
//   if (testInfo.status === "failed") {
//     const sanitizedTitle = testInfo.title.replace(/[/\\?%*:|"<>]/g, "_");
//     const filePath = join(screenshotsDir, `${sanitizedTitle}.png`);
//     await page.screenshot({ path: filePath });
//   }
// });
