/**
 * @type {import('semantic-release').GlobalConfig}
 */
const config = {
  branches: [
    "main",
    {
      "name": "dev",
      "prerelease": "beta"
    }
  ],

  plugins: [
    "@semantic-release/commit-analyzer",

    "@semantic-release/release-notes-generator",

    ["@semantic-release/exec", {
      "prepareCmd": "bash release-build.sh ${nextRelease.version} ${nextRelease.channel ? '--prerelease' : ''}",
      "successCmd": "echo 'Semantic Release Successful!'"
    }],

    ["@semantic-release/git", {
      "assets": [
        "package.json",
        "CHANGELOG.md", 
      ],
      "message": "chore(release): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    
    ["@semantic-release/github", {
      prerelease: '${nextRelease.channel}'
    }], 
    
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md",
    }],
  ],
};

export default config;
