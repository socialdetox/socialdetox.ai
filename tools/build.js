/**
 * Build & Publish actions
 *
 * @architect Mark Jivko <mark@socialdetox.ai>
 * @copyright © 2024 SocialDetox.ai https://socialdetox.ai
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const spawn = require("cross-spawn");
const path = require("path");

// Synchronous tasks
const tasks = {
    lint: ["Linting", "npm", ["run", "lint"]],
    tag: ["Git tag", "npm", ["run", "tag"]],
    build: ["Build & Publish app", "electron-builder"]
};

// Append extra arguments to build
const pubArgs = process.argv.slice(2);
if (pubArgs.length) {
    if (Array.isArray(tasks.build[2])) {
        tasks.build[2].push(...pubArgs);
    } else {
        tasks.build[2] = pubArgs;
    }
}

// Span processes
const taskKeys = Object.keys(tasks);
for (const taskIndex in taskKeys) {
    if (!Object.hasOwn(taskKeys, taskIndex)) {
        continue;
    }

    // Extract the arguments
    const [tName, tCommand, tArgs] = tasks[taskKeys[taskIndex]];
    console.log("\x1b[36m%s\x1b[0m", `${parseInt(taskIndex) + 1}/${taskKeys.length}. ${tName}\n`);

    // Spawn the new process
    const { status } = spawn.sync(tCommand, Array.isArray(tArgs) ? tArgs : [], {
        cwd: path.dirname(__dirname),
        stdio: "inherit"
    });

    // Build failed
    if (0 !== status) {
        console.error("\x1b[31m%s\x1b[0m", "Build failed");
        process.exit(1);
    }
}
