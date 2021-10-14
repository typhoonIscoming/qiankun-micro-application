const path = require("path");

module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        ecmaFeatures: {
            legacyDecorators: true,
        },
        sourceType: 'module',
    },
    env: {
        browser: true
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ["plugin:vue/essential", "airbnb-base"],
    // required to lint *.vue files
    plugins: ["vue"],
    // check if imports actually resolve
    settings: {
        "import/resolver": {
            node:{
                paths: ['src']
            },
            webpack: {
                // config: 'node_modules/@vue/cli-service/webpack.config.js'
                resolve: {
                    alias: {
                        "@": path.resolve(__dirname, "./src")
                    },
                    extensions: [".js", ".vue", ".json", '.ts']
                }
            },
        },
        "import/extensions": [".js", ".jsx", ".ts", ".vue"],
    },
    // add your custom rules here
    rules: {
        "consistent-return": 0,
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "no-else-return": 0,
        "object-property-newline": 0,
        "padded-blocks": 0,
        "prefer-destructuring": 0,
        "no-unused-vars": 0,
        "no-trailing-spaces": 0,
        "no-multiple-empty-lines": 0,
        "class-methods-use-this": 0,
        "object-curly-newline": 0,
        "lines-between-class-members": 0,
        "no-underscore-dangle": 0,
        "comma-dangle": [
            0,
            {
                arrays: "never",
                imports: "never",
                exports: "never",
                functions: "never"
            }
        ],
        "prefer-rest-params": 0,
        "import/prefer-default-export": 0,
        "linebreak-style": ["off", "windows"],
        "max-len": [1, 4000],
        "no-console": 0,
        "no-sequences": 0,
        semi: 0,
        indent: [1, 4],
        "no-sparse-arrays": 2,//禁止使用稀疏数组
        "no-var": 2,//禁用var，用let和const代替
        "camelcase": [2, {
            "properties": "always",
            "allow": ['$_veeValidate', 'for_id', 'is_agree', 'is_collect']
        }] ,//强制驼峰法命名
        "curly": [2, "all"],//必须使用 if(){} 中的{}
        "max-params": [1, 3],//函数最多只能有3个参数
        "radix": 2,//parseInt必须指定第二个参数
        // "space-after-keywords": [2, "always"],//关键字后面是否要空一格
        "arrow-parens": 0,//箭头函数用小括号括起来
        "arrow-spacing": 2,//=>的前/后括号
        "vue/script-indent": ["warn", 4, { baseIndent: 0 }],
        "vue/html-indent": ["warn", 4],
        // don't require .vue extension when importing
        "import/extensions": [
            "warn",
            "never",
            {
                "js": "never",
                "vue": "never"
            }
        ],
        "import/no-unresolved": "off",
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        "no-param-reassign": [
            "off",
            {
                props: true,
                ignorePropertyModificationsFor: [
                    "state", // for vuex state
                    "acc", // for reduce accumulators
                    "e" // for e.returnvalue
                ]
            }
        ],
        // allow optionalDependencies
        "import/no-extraneous-dependencies": 0,
        // 'import/no-extraneous-dependencies': ['error', {
        //     optionalDependencies: ['test/unit/index.js'],
        //     "devDependencies": true
        // }],
        // allow debugger during development
        "no-debugger": (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") ? "error" : "off",
        "no-mixed-operators": [
            "error",
            {
                "groups": [
                    // ["+", "-", "*", "/", "%", "**"],
                    ["&", "|", "^", "~", "<<", ">>", ">>>"],
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    // ["&&", "||"],
                    ["in", "instanceof"]
                ],
                "allowSamePrecedence": true
            }
        ],
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    }
};
