module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 提交commit message时必须带上以下的头信息
        'type-enum': [2, 'always', [
            'feat', // 新功能
            'mod', // 修改
            'fix', // 修复
            'config', // 配置
            'docs', // 文档
            'test', // 测试
            'revert', // 回滚
            'refactor', // 重构
            'style', // 格式
            'add', // 添加文件
            'delete', // 删除文件
        ]],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'subject-empty': [0],
        'subject-case': [0, 'never'],
    },
}
