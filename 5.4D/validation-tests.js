const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  await res.text();
  return { status: res.status };
}

async function test({ id, name, method, path, expected, body, tags }) {
  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  const safeTags = Array.isArray(tags) ? tags : [];
  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}
function makeValidBook(id) {
  return {
    id,
    title: "Clean Code Book",
    author: "Robert Martin",
    year: 2020,
    genre: "Technology",
    summary: "This is a valid summary for a properly validated book record.",
    price: "29.99"
  };
}
function makeValidUpdate() {
  return {
    title: "Updated Clean Code Book",
    author: "Updated Author",
    year: 2021,
    genre: "Software",
    summary: "This is a valid updated summary for the existing book record.",
    price: "35.50"
  };
}
async function run() {
  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);
  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });
  await test({
    id: "T06",
    name: "Missing title on create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 2}`), title: "" },
    tags: ["CREATE_FAIL", "REQUIRED"]
  });
  await test({
    id: "T07",
    name: "Missing author on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), author: "" },
    tags: ["UPDATE_FAIL", "REQUIRED"]
  });
  await test({
    id: "T08",
    name: "Invalid year type create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 3}`), year: "abc" },
    tags: ["CREATE_FAIL", "TYPE"]
  });
  await test({
    id: "T09",
    name: "Invalid price type update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), price: "not-a-number" },
    tags: ["UPDATE_FAIL", "TYPE"]
  });
  await test({
    id: "T10",
    name: "Year below minimum",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 4}`), year: 1400 },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });
  await test({
    id: "T11",
    name: "Negative price update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), price: "-5" },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });
  await test({
    id: "T12",
    name: "Short title create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 5}`), title: "Hi" },
    tags: ["CREATE_FAIL", "LENGTH"]
  });
  await test({
    id: "T13",
    name: "Long summary update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), summary: "a".repeat(501) },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });
  await test({
    id: "T14",
    name: "Future year create",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 6}`), year: new Date().getFullYear() + 1 },
    tags: ["CREATE_FAIL", "TEMPORAL"]
  });
  await test({
    id: "T15",
    name: "Future year update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), year: new Date().getFullYear() + 2 },
    tags: ["UPDATE_FAIL", "TEMPORAL"]
  });
  await test({
    id: "T16",
    name: "Valid update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 200,
    body: makeValidUpdate(),
    tags: []
  });
  await test({
    id: "T17",
    name: "Update non-existing record",
    method: "PUT",
    path: updatePath("b_not_found"),
    expected: 404,
    body: makeValidUpdate(),
    tags: []
  });
await test({
  id: "T18",
  name: "ID exceeds max length create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook("B" + "x".repeat(30)), },  
  tags: ["CREATE_FAIL", "LENGTH"]
});

await test({
  id: "T19",
  name: "Title exceeds max length create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 7}`), title: "T".repeat(101) },
  tags: ["CREATE_FAIL", "LENGTH"]
});
await test({
  id: "T20",
  name: "Author too short create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 8}`), author: "AB" },
  tags: ["CREATE_FAIL", "LENGTH"]
});
await test({
  id: "T21",
  name: "Author exceeds max length create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 9}`), author: "A".repeat(61) },
  tags: ["CREATE_FAIL", "LENGTH"]
});
await test({
  id: "T22",
  name: "Missing genre create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 10}`), genre: "" },
  tags: ["CREATE_FAIL", "REQUIRED"]
});
await test({
  id: "T23",
  name: "Genre too short create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 11}`), genre: "SF" },
  tags: ["CREATE_FAIL", "LENGTH"]
});

await test({
  id: "T24",
  name: "Genre exceeds max length create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 12}`), genre: "G".repeat(41) },
  tags: ["CREATE_FAIL", "LENGTH"]
});

await test({
  id: "T25",
  name: "Missing summary create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 13}`), summary: "" },
  tags: ["CREATE_FAIL", "REQUIRED"]
});
await test({
  id: "T26",
  name: "Summary too short create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 14}`), summary: "Too short" },  // 9 chars
  tags: ["CREATE_FAIL", "LENGTH"]
});
await test({
  id: "T27",
  name: "Price above maximum create",
  method: "POST",
  path: createPath,
  expected: 400,
  body: { ...makeValidBook(`b${Date.now() + 15}`), price: "1001" },
  tags: ["CREATE_FAIL", "BOUNDARY"]
});

await test({
  id: "T28",
  name: "Attempt to update immutable _id field",
  method: "PUT",
  path: updatePath(uniqueId),
  expected: 400,
  body: { ...makeValidUpdate(), _id: "fakeMongoId" },
  tags: ["UPDATE_FAIL", "IMMUTABLE"]
});

await test({
  id: "T29",
  name: "Attempt to update immutable created At field",
  method: "PUT",
  path: updatePath(uniqueId),
  expected: 400,
  body: { ...makeValidUpdate(), createdAt: "2020-01-01T00:00:00Z" },
  tags: ["UPDATE_FAIL", "IMMUTABLE"]
});

const pass = logSummary();
  logCoverage();

  process.exitCode = pass ? 0 : 1;
}

run().catch(err => {
  console.error("ERROR", err);
  process.exitCode = 2;
});