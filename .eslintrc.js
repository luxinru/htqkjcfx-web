module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    // "@vue/prettier"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "indent": ["error", 2],
    "vue/script-indent": ["error", 2, {  // script标签缩进设置
      "baseIndent": 1,
      "switchCase": 0,
      "ignores": []
    }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  overrides: [{'files': ['*.vue'], 'rules': {'indent': 'off'}}]
};
