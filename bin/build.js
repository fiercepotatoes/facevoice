// Based on Automattic’s create-react-app config override
// https://github.com/Automattic/wp-api-console/commit/6838226240143595146c91d96e6f654bb14b6192#diff-78d6e474ae315d0bea76cd46368acfed

// Load the git-revision package
const gitRevision = require('git-revision');

// Add the git commit hash as an env variable
const shortHash = gitRevision('short');
process.env.REACT_APP_REVISION = shortHash;

// Run the build.
require( 'react-scripts/scripts/build' );