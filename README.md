This repo is a minimal reproduction of some timeout wonkiness with the nodejs Spanner client.

To reproduce, you will have to fill in the fields in `index.js`:

```
const PROJECT_ID_HERE = "";
const SPANNER_INSTANCE_ID_HERE = "";
const SPANNER_DATABASE_HERE = "";
const TABLE_NAME_HERE = "";
```

Then run from the command line:

```
node index.js
```

As documented in `index.js`, when you provide a timeout to the Spanner client the timeout does execute, but the total time spent is vastly larger than the timeout.