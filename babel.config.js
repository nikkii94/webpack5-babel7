module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "debug": true,
        "useBuiltIns": "usage",
        "corejs": "3.8",
        "targets": {
          "browsers": [
            "last 5 versions",
            "ie >= 11"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}