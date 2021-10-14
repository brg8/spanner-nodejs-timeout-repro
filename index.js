const PROJECT_ID_HERE = "";
const SPANNER_INSTANCE_ID_HERE = "";
const SPANNER_DATABASE_HERE = "";
const TABLE_NAME_HERE = "";

const { Spanner } = require("@google-cloud/spanner");

let client = null;
client = new Spanner({
	projectId: PROJECT_ID_HERE,
});
const instance = client.instance(SPANNER_INSTANCE_ID_HERE);
const database = instance.database(SPANNER_DATABASE_HERE);

async function runQuery(additionalOptions = {}) {
  const t1 = new Date();
  try {
    console.log("Launching query...");
    await database.run({
      sql: `SELECT * FROM ${TABLE_NAME_HERE} LIMIT 1000;`,
      ...additionalOptions,
    });
    console.log("Everything finished.");
  } catch (err) {
    console.log(err);
    console.log("Timed out after", new Date() - t1);
  }
};

// Query finishes, no timeout (as expected)
runQuery();
/*
Launching query...
Everything finished.
*/

// Query times out (as expected)
// However, it only times out after 7-8 seconds
runQuery({
  gaxOptions: {
    timeout: 1,
  },
});
/*
Launching query...
Error: 4 DEADLINE_EXCEEDED: Deadline exceeded
    at Object.callErrorFromStatus (/Users/benjamingodlove/Developer/spanner-node-repro/node_modules/@grpc/grpc-js/build/src/call.js:31:26)
    at Object.onReceiveStatus (/Users/benjamingodlove/Developer/spanner-node-repro/node_modules/@grpc/grpc-js/build/src/client.js:330:49)
    at /Users/benjamingodlove/Developer/spanner-node-repro/node_modules/@grpc/grpc-js/build/src/call-stream.js:80:35
    at Object.onReceiveStatus (/Users/benjamingodlove/Developer/spanner-node-repro/node_modules/grpc-gcp/build/src/index.js:73:29)
    at InterceptingListenerImpl.onReceiveStatus (/Users/benjamingodlove/Developer/spanner-node-repro/node_modules/@grpc/grpc-js/build/src/call-stream.js:75:23)
    at Object.onReceiveStatus (/Users/benjamingodlove/Developer/spanner-node-repro/node_modules/@grpc/grpc-js/build/src/client-interceptors.js:299:181)
    at /Users/benjamingodlove/Developer/spanner-node-repro/node_modules/@grpc/grpc-js/build/src/call-stream.js:145:78
    at processTicksAndRejections (node:internal/process/task_queues:76:11) {
  code: 4,
  details: 'Deadline exceeded',
  metadata: Metadata { internalRepr: Map(0) {}, options: {} }
}
Timed out after 7238
*/
