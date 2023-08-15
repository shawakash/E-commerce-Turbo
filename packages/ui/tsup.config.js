import { defineConfig } from "tsup";
export default defineConfig((options) => (Object.assign({ banner: {
        js: "'use client'",
    } }, options)));
